import React from "react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="w-full">
      {/* Top Image Section */}
      <div className="sticky top-0 z-0 w-full">
        <Image
          className="object-fit w-full"
          height={1280}
          width={1920}
          alt="Medication Warning"
          src="/images/medication-warning.jpg"
        />
      </div>

      {/* Main Content */}
      <div className="relative -top-6 z-10 rounded-3xl bg-white px-6 pt-8">
        <h1 className="py-6 text-3xl capitalize text-background">
          Medication Warning
        </h1>
        <div className="article prose text-teal-950 lg:prose-xl">
          <p>
            Certain anti-seizure medications, such as topiramate and zonisamide,
            have been associated with decreased sweating (<em>oligohydrosis</em>
            ), which can increase the risk of <strong>hyperthermia</strong> in
            children and teens. Warm or humid conditions, as well as vigorous
            physical activity, can further heighten this risk. It is crucial for
            anyone taking these medications (especially younger individuals) to
            stay adequately hydrated and watch for signs of overheating, such as
            dizziness, nausea, or fatigue.
          </p>

          <p>
            To minimize the likelihood of heat-related complications, here are a
            few key recommendations:
          </p>
          <ul>
            <li>
              Ensure consistent fluid intake throughout the day, particularly
              during hot weather or exercise.
            </li>
            <li>
              Watch for symptoms of heat stress, including decreased sweating,
              excessive thirst, muscle cramps, or confusion.
            </li>
            <li>
              In extremely hot or humid conditions, find air-conditioned or
              shaded areas to cool down if you notice any signs of overheating.
            </li>
            <li>
              Consult with a healthcare professional to ensure medication doses
              are appropriate and to discuss any concerns about activity levels
              or fluid intake.
            </li>
          </ul>
          <p>
            By staying informed and taking these precautions, families can help
            minimize the risk of hyperthermia and support the well-being of
            children and teenagers managing epilepsy.
          </p>
        </div>

        {/* References Section */}
        <div className="my-8 flex flex-col justify-center gap-8 text-black">
          <h2 className="text-2xl text-background">References & Resources</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <a
                href="https://www.accessdata.fda.gov/drugsatfda_docs/label/2012/020844s041lbl.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Topiramate [U.S. FDA Label, 2012]
              </a>
            </li>
            <li>
              <a
                href="https://www.accessdata.fda.gov/drugsatfda_docs/label/2020/020789s036lbl.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Zonisamide [U.S. FDA Label, 2020]
              </a>
            </li>
            <li>
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/12760427/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Oligohydrosis and Hyperthermia in Pediatric Patients (PubMed
                12760427)
              </a>
            </li>
            <li>
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/15519129/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Oligohydrosis and Hyperthermia (PubMed 15519129)
              </a>
            </li>
            <li>
              <a
                href="https://clinicalguidelines.scot.nhs.uk/ggc-paediatric-guidelines/ggc-paediatric-guidelines/neonatology/seizures-in-the-neonate/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Neonatal Seizures Guidelines (NHS Scotland)
              </a>
            </li>
            <li>
              <a
                href="https://www.uptodate.com/contents/treatment-of-seizures-in-children-beyond-the-basics/print"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hydration Guidelines for Children on Anti-Seizure Medications
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
