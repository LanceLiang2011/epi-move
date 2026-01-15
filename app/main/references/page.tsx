import React from "react";

type Citation = {
  number: number;
  text: string;
  link: string;
};

const citations: Citation[] = [
  {
    number: 1,
    text: "Takagi S. Sports and epilepsy: A comprehensive review in the Japanese context. Sports Psychiatry: Journal of Sports and Exercise Psychiatry. Published online November 20, 2023. doi:10.1024/2674-0052/a000065",
    link: "",
  },
  {
    number: 2,
    text: "Cavalcante BRR, Improta-Caria AC, Melo VH de, Sousa RALD. Exercise-linked consequences on epilepsy. Epilepsy Behav. 2021;121. doi:10.1016/j.yebeh.2021.108079",
    link: "",
  },
  {
    number: 3,
    text: "de Lima C, de Lira CAB, Arida RM, et al. Association between leisure time, physical activity, and mood disorder levels in individuals with epilepsy. Epilepsy & Behavior. 2013;28(1):47-51. doi:10.1016/j.yebeh.2013.03.016",
    link: "",
  },
  {
    number: 4,
    text: "Green R, Abe C, Denney DA, et al. Physical activity status and quality of life in patients with epilepsy - Survey from level four epilepsy monitoring units. Epilepsy Research. 2021;173(Complete). doi:10.1016/j.eplepsyres.2021.106639",
    link: "",
  },
  {
    number: 5,
    text: "Do J, Webster RJ, Longmuir PE, et al. Physically active children with epilepsy have good objective sleep duration and efficiency despite subjective reports of fatigue and sleep problems. Epilepsy Behav. 2020;104(Pt A):106853. doi:10.1016/j.yebeh.2019.106853",
    link: "",
  },
  {
    number: 6,
    text: "Epilepsy Foundation. How to Start Exercising With Epilepsy. Epilepsy Foundation. Accessed April 15, 2024.",
    link: "https://www.epilepsy.com/lifestyle/diet-exercise/fitness/start-exerising",
  },
  {
    number: 7,
    text: "Capovilla G, Kaufman KR, Perucca E, Moshé SL, Arida RM. Epilepsy, seizures, physical exercise, and sports: A report from the ILAE Task Force on Sports and Epilepsy. Epilepsia. 2016;57(1):6-12. doi:10.1111/epi.13261",
    link: "",
  },
  {
    number: 8,
    text: "Clinic To Community. Physical Activity and Epilepsy. Accessed April 3, 2024.",
    link: "https://clinictocommunity.ca/physical-activity-and-epilepsy/",
  },
  {
    number: 9,
    text: "Northeast Regional Epilepsy Group. Epilepsy Information. Accessed April 3, 2024.",
    link: "https://www.epilepsygroup.com/epilepsy-information-sub2-detail5-59-19-98-108/epilepsy-seizure-sport-activity-precaution-quality-baseball-football-soccer.htm",
  },
  {
    number: 10,
    text: "Epilepsy Scotland. Staying safe. Epilepsy Scotland. Accessed April 3, 2024.",
    link: "https://www.epilepsyscotland.org.uk/about-epilepsy/staying-safe/",
  },
  {
    number: 11,
    text: "Epsy Health. Basketball and epilepsy - shoot hoops safely with seizures | Epilepsy blog. Accessed April 3, 2024.",
    link: "https://www.epsyhealth.com/seizure-epilepsy-blog/basketball-and-epilepsy-shoot-hoops-safely-with-seizures",
  },
  {
    number: 12,
    text: "National Epilepsy Training. Cycling and epilepsy. National Epilepsy Training. Published August 28, 2019. Accessed April 3, 2024.",
    link: "http://www.nationalepilepsytraining.co.uk/cycling-and-epilepsy/",
  },
  {
    number: 13,
    text: "Epsy Health. Soccer and epilepsy - everything you need to know. Accessed April 3, 2024.",
    link: "https://www.epsyhealth.com/seizure-epilepsy-blog/soccer-and-epilepsy-everything-you-need-to-know",
  },
  {
    number: 14,
    text: "BC Epilepsy Society. Epilepsy in the Wild - Tips on Hiking and Epilepsy - BC Epilepsy Society. Published February 3, 2022. Accessed April 3, 2024.",
    link: "https://bcepilepsy.com/blog/epilepsy-in-the-wild-tips-on-hiking-and-epilepsy/",
  },
  {
    number: 15,
    text: "Muniandy N. Overcoming My Fears and Hiking With Epilepsy. EpilepsyDisease.com. Published 2023. Accessed April 3, 2024.",
    link: "https://epilepsydisease.com/living/overcoming-seizure-fears",
  },
  {
    number: 16,
    text: "Matt L. Living with epilepsy doesn't slow down Temple University lacrosse star Maddie Gebert. Published April 13, 2019. Accessed April 11, 2024.",
    link: "https://www.audacy.com/kywnewsradio/articles/news/living-epilepsy-doesnt-slow-down-temple-university-lacrosse-star-maddie-gebert",
  },
  {
    number: 17,
    text: "Anzilotti A. Safety Tips: Lacrosse (for Teens). Nemours Children's Health. Accessed April 11, 2024.",
    link: "https://kidshealth.org/en/teens/safety-lacrosse.html",
  },
  {
    number: 18,
    text: "Epilepsy Ontario. Safety Products. Accessed April 11, 2024.",
    link: "https://epilepsyontario.org/living-with-epilepsy/safety-products/",
  },
  {
    number: 19,
    text: "Ertürk Çetin Ö, Uyanik O. Participation in Sports Activities in People with Epilepsy. Archives of Epilepsy. Published online 2023.",
    link: "",
  },
  {
    number: 20,
    text: "Conant KD, Morgan AK, Muzykewicz D, Clark DC, Thiele EA. A karate program for improving self-concept and quality of life in childhood epilepsy: Results of a pilot study. Epilepsy and Behavior. 2008;12(1):61-65. doi:10.1016/j.yebeh.2007.08.011",
    link: "",
  },
  {
    number: 21,
    text: "Boston Children's Hospital, Orthopedics and Sports Medicine. Injury Prevention Series: Martial Arts. Accessed April 14, 2024.",
    link: "https://www.childrenshospital.org/sites/default/files/2022-03/injury-prevention-martial-arts.pdf",
  },
  {
    number: 22,
    text: "American Academy of Orthopaedic Surgeons. Martial Arts Injury Prevention - OrthoInfo - AAOS. Accessed April 14, 2024.",
    link: "https://www.orthoinfo.org/en/staying-healthy/martial-arts-injury-prevention/",
  },
  {
    number: 23,
    text: "British Mountaineering Council. Epilepsy and Mountaineering. Accessed April 14, 2024.",
    link: "https://www.thebmc.co.uk/epilepsy-and-mountaineering",
  },
  {
    number: 24,
    text: "U.S. National Park Service. Staying Safe - Climbing. Accessed April 14, 2024.",
    link: "https://www.nps.gov/subjects/climbing/staying-safe.htm",
  },
  {
    number: 25,
    text: "Epilepsy Waikato Charitable Trust. Epilepsy and Sport. EWCT. Published September 22, 2016. Accessed April 14, 2024.",
    link: "https://ewct.org.nz/epilepsy-and-sport/",
  },
  {
    number: 26,
    text: "Children's Hospital of Pittsburgh. Scooters, Skates & Boards. Children's Hospital of Pittsburgh. Accessed April 14, 2024.",
    link: "https://www.chp.edu/injury-prevention/safety/wheels/scooters-skates-boards",
  },
  {
    number: 27,
    text: "British Rowing Medical Panel. Rowing and Epilepsy. British Rowing. Accessed April 14, 2024.",
    link: "https://www.britishrowing.org/athlete-health/rowing-and-epilepsy/",
  },
  {
    number: 29,
    text: "Connecticut's Official State Website. Exercise Tips for People Who Have Seizures. CT.gov - Connecticut's Official State Website. Accessed April 14, 2024.",
    link: "https://portal.ct.gov/advocatescorner/life-tips/exercise-and-healthy-choices/exercise-tips-for-people-who-have-seizures",
  },
  {
    number: 30,
    text: "SickKids. Epilepsy and sports. Accessed April 15, 2024.",
    link: "https://www.aboutkidshealth.ca:443/article?contentid=2118&language=english",
  },
  {
    number: 31,
    text: "University of California San Francisco. Ski and Snowboard Safety Tips. ucsfhealth.org. Accessed April 15, 2024.",
    link: "https://www.ucsfhealth.org/education/ski-and-snowboard-safety-tips",
  },
  {
    number: 32,
    text: "Canadian Epilepsy Alliance. Sports and Recreation. Canadian Epilepsy Alliance. Accessed April 15, 2024.",
    link: "https://www.canadianepilepsyalliance.org/about-epilepsy/epilepsy-safety/sports-recreation/",
  },
  {
    number: 33,
    text: "Epilepsy Alliance America. Seizure Safety: Swimming and Water Sports. Epilepsy Alliance America. Accessed April 14, 2024.",
    link: "https://www.epilepsyallianceamerica.org/seizure-safety/seizure-safety-swimming-and-water-sports/",
  },
  {
    number: 34,
    text: "Epilepsy Foundation. Traveling Tips | Traveling with Epilepsy. Epilepsy Foundation. Accessed April 15, 2024.",
    link: "https://www.epilepsy.com/lifestyle/travel/tips",
  },
  {
    number: 35,
    text: "Epilepsy Society. Travel and holidays for people with epilepsy. Published February 23, 2020. Accessed April 15, 2024.",
    link: "https://epilepsysociety.org.uk/living-epilepsy/travel-and-holidays",
  },
  {
    number: 36,
    text: "Anzilotti A. Safety Tips: Volleyball (for Teens). Nemours Children's Health. Accessed April 15, 2024.",
    link: "https://kidshealth.org/en/teens/safety-volleyball.html",
  },
  {
    number: 37,
    text: "Dayton Children's Hospital. Safety Tips: Wrestling. Dayton Children's Hospital. Accessed April 15, 2024.",
    link: "https://www.childrensdayton.org/kidshealth/a/safety-wrestling",
  },
];

export default function References() {
  return (
    <div>
      <h1 className="text-center text-primary font-bold text-2xl mt-4">
        References
      </h1>
      <CitationPage citations={citations} />
    </div>
  );
}

interface CitationProps {
  citations: Citation[];
}

const CitationPage: React.FC<CitationProps> = ({ citations }) => {
  return (
    <div className="p-4 space-y-4">
      <ul className="list-decimal pl-5">
        {citations.map((citation) => (
          <li key={citation.number} className="text-gray-800">
            <a href={citation.link} className="text-blue-500 hover:underline">
              {citation.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
