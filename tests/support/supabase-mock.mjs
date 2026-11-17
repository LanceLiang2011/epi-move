import http from "node:http";

const id = "11111111-1111-4111-8111-111111111111";
let user, tables;
const reset = () => {
  user = null;
  tables = {
    users: [],
    activities: [],
    notes: [],
    epilepsy_events: [],
    activity_logs: [],
    daily_health_logs: [],
  };
};
reset();
const session = () => {
  const payload = Buffer.from(
    JSON.stringify({
      sub: id,
      exp: Math.floor(Date.now() / 1000) + 3600,
      role: "authenticated",
    }),
  ).toString("base64url");
  return {
    access_token: `eyJhbGciOiJIUzI1NiJ9.${payload}.test`,
    refresh_token: "test-refresh",
    token_type: "bearer",
    expires_in: 3600,
    user,
  };
};
http
  .createServer(async (req, res) => {
    const url = new URL(req.url, "http://127.0.0.1:54329");
    res.setHeader("content-type", "application/json");
    const send = (status, data) => {
      res.writeHead(status);
      res.end(JSON.stringify(data));
    };
    let raw = "";
    for await (const chunk of req) raw += chunk;
    const body = raw ? JSON.parse(raw) : {};
    if (url.pathname === "/__reset") {
      reset();
      return send(200, {});
    }
    if (url.pathname === "/__state") return send(200, tables);
    if (url.pathname === "/auth/v1/signup") {
      if (body.email.startsWith("error"))
        return send(422, { msg: "Invalid signup", code: "validation_failed" });
      user = {
        id,
        email: body.email,
        aud: "authenticated",
        role: "authenticated",
        user_metadata: body.data || {},
        app_metadata: {},
        created_at: new Date().toISOString(),
      };
      return send(200, body.email.startsWith("confirm") ? { user } : session());
    }
    if (url.pathname === "/auth/v1/token") {
      if (url.searchParams.get("grant_type") === "pkce") {
        if (body.auth_code === "bad-code")
          return send(400, { msg: "Invalid code" });
        user ||= {
          id,
          email: "confirmed@example.test",
          user_metadata: { username: "Confirmed" },
          app_metadata: {},
          aud: "authenticated",
          created_at: new Date().toISOString(),
        };
      }
      return user ? send(200, session()) : send(400, { msg: "Invalid login" });
    }
    if (url.pathname === "/auth/v1/user")
      return user && req.headers.authorization?.includes(".test")
        ? send(200, user)
        : send(401, { msg: "Not authenticated" });
    if (url.pathname === "/auth/v1/logout") return send(200, {});
    if (url.pathname.startsWith("/rest/v1/")) {
      const table = url.pathname.split("/").at(-1);
      if (!tables[table]) return send(404, {});
      if (req.method === "POST") {
        for (const row of Array.isArray(body) ? body : [body]) {
          if (!tables[table].some((x) => row.id && x.id === row.id))
            tables[table].push({ id: crypto.randomUUID(), ...row });
        }
        return send(201, null);
      }
      if (req.method === "DELETE") {
        tables[table] = tables[table].filter(
          (row) =>
            ![...url.searchParams].every(
              ([key, val]) => row[key] === val.replace("eq.", ""),
            ),
        );
        return send(200, null);
      }
      if (req.method === "PATCH") return send(200, null);
      let rows = tables[table].filter((row) =>
        [...url.searchParams].every(
          ([key, val]) =>
            !val.startsWith("eq.") || String(row[key]) === val.slice(3),
        ),
      );
      if (req.headers.accept?.includes("application/vnd.pgrst.object+json"))
        return send(200, rows[0] || null);
      return send(200, rows);
    }
    send(200, {});
  })
  .listen(54329, "127.0.0.1");
