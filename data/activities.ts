import { url } from "inspector";

interface ActivitySum {
  slug: string;
  name: string;
  url: string;
}

interface Activity extends ActivitySum {
  content: string;
  videos?: string[];
}

type ActivityMap = Record<string, Activity>;

export const activitiesWithSlugs: ActivitySum[] = [
  {
    name: "Online activities",
    slug: "online-activities",
    url: "/images/biking.jpeg",
  },
  { name: "Baseball", slug: "baseball", url: "/images/baseball.jpeg" },
];

const contentsMap: Record<string, string> = {
  "online-activities": `<h3 class=" font-bold">Safety Tips</h3>
  
  <ul>
      <li>
          <p>Before beginning any exercise program, make sure to talk to your doctor, medical team, and support system or caregivers. Start exercising only when you get an okay from your medical team.</p>
      </li>
      <li>
          <p>Check your space before starting an online physical activity.</p>
      </li>
      <li>
          <p>Ensure those around you are aware of how to respond if you have a seizure. Share your seizure response plan and first aid tips so they're prepared to act accordingly.</p>
      </li>
      <li>
          <p>Start small activities and prioritize safety first.</p>
      </li>
      <li>
          <p>If you're feeling unsure about where to begin or what activities are best for you, start making small changes to your daily routine.</p>
          <p>For example, try a 5-minute exercise after waking up. These small adjustments will help you build habits that boost your daily activity levels. Remember, it doesn't have to be complicated or time-consuming – in fact, it shouldn't be.</p>
      </li>
      <li>
          <p>Pay attention to your body and keep track of your progress. Every day is different – some days you'll feel more energetic, while others you might feel less so. Be kind to your body.</p>
      </li>
  </ul>
  `,
  baseball: `<h3>Collective Sports on the Ground</h3>
  <p>Collective sports on the ground such as baseball are considered low-risk to people with epilepsy and bystanders should a seizure happen while playing.</p>
  
  <h3>Safety Tips</h3>
  <ul>
      <li>
          <p>Make sure to tell your friends, teammates, or coaches about your epilepsy and what to do in case of a seizure.</p>
      </li>
      <li>
          <p>Consider wearing a medic alert bracelet or keeping a card handy that lets people know about your epilepsy and first aid steps.</p>
      </li>
      <li>
          <p>Wear safety gear: elbow or knee pads, a helmet, and if needed, protective eyeglasses or goggles.</p>
      </li>
      <li>
          <p>You typically only need to wear medical protective helmets if you have frequent seizures that raise the chances of a head injury.</p>
      </li>
  </ul>`,
};

export const activities: ActivityMap = {
  "online-activities": {
    name: "Online activities",
    slug: "online-activities",
    url: "/images/biking.jpeg",
    content: contentsMap["online-activities"],
    videos: [
      '<iframe width="380" height="300" src="https://www.youtube.com/embed/tzV0fIW6qzE?si=JQ0GBxanCqlO5ijQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    ],
  },
  baseball: {
    name: "Baseball",
    slug: "baseball",
    content: contentsMap["baseball"],
    url: "/images/baseball.jpeg",
  },
};
