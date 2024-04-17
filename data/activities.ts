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
    url: "/images/online.jpeg",
  },
  { name: "Baseball", slug: "baseball", url: "/images/baseball.jpeg" },
  { name: "Basketball", slug: "basketball", url: "/images/basketball.jpeg" },
  { name: "Cycling", slug: "cycling", url: "/images/biking.jpeg" },
  { name: "Football or Soccer", slug: "football", url: "/images/soccer.jpeg" },
  { name: "Hiking", slug: "hiking", url: "/images/hiking.jpeg" },
  { name: "Lacrosse", slug: "lacrosse", url: "/images/lacrosse.jpeg" },
  {
    name: "Martial arts",
    slug: "martial-arts",
    url: "/images/martial-arts.jpeg",
  },
  {
    name: "Rock climbing",
    slug: "rock-climbing",
    url: "/images/rock-climbing.jpeg",
  },
  {
    name: "Roller Skating",
    slug: "roller-skating",
    url: "/images/roller-skating.jpeg",
  },
  {
    name: "Rowing",
    slug: "rowing",
    url: "/images/rowing.jpeg",
  },
  {
    name: "Running",
    slug: "running",
    url: "/images/running.jpeg",
  },
  {
    name: "Skiing",
    slug: "skiing",
    url: "/images/skiing.jpeg",
  },
  {
    name: "Swimming",
    slug: "swimming",
    url: "/images/swimming.jpeg",
  },
  {
    name: "Travel",
    slug: "travel",
    url: "/images/travel.jpeg",
  },
  {
    name: "Volleyball",
    slug: "volleyball",
    url: "/images/volleyball.jpeg",
  },
  {
    name: "Wrestling",
    slug: "wrestling",
    url: "/images/wrestling.jpeg",
  },
];

const contentsMap: Record<string, string> = {
  "online-activities": `<h3 class="font-bold">Safety Tips</h3>
  
  <ul class="list-decimal list-inside">
      <li >
          Before beginning any exercise program, make sure to talk to your doctor, medical team, and support system or caregivers. Start exercising only when you get an okay from your medical team.
      </li>
      <li>
          Check your space before starting an online physical activity.
      </li>
      <li>
          Ensure those around you are aware of how to respond if you have a seizure. Share your seizure response plan and first aid tips so they're prepared to act accordingly.
      </li>
      <li>
          Start small activities and prioritize safety first.
      </li>
      <li>
          If you're feeling unsure about where to begin or what activities are best for you, start making small changes to your daily routine.
          For example, try a 5-minute exercise after waking up. These small adjustments will help you build habits that boost your daily activity levels. Remember, it doesn't have to be complicated or time-consuming – in fact, it shouldn't be.
      </li>
      <li>
          Pay attention to your body and keep track of your progress. Every day is different – some days you'll feel more energetic, while others you might feel less so. Be kind to your body.
      </li>
  </ul>
  <br />
  <h3 class="font-bold">Resources: </h3>
  `,
  baseball: `<h3 class="font-bold">Collective Sports on the Ground</h3>
  <p>Collective sports on the ground such as baseball are considered low-risk to people with epilepsy and bystanders should a seizure happen while playing.</p>
  
  <h3 class="font-bold">Safety Tips</h3>
  <ul class="list-inside list-decimal">
      <li>
          Make sure to tell your friends, teammates, or coaches about your epilepsy and what to do in case of a seizure.
      </li>
      <li>
          Consider wearing a medic alert bracelet or keeping a card handy that lets people know about your epilepsy and first aid steps.
      </li>
      <li>
          Wear safety gear: elbow or knee pads, a helmet, and if needed, protective eyeglasses or goggles.
      </li>
      <li>
          You typically only need to wear medical protective helmets if you have frequent seizures that raise the chances of a head injury.
      </li>
  </ul>`,
  basketball: `<h3 class="font-bold">Collective Sports on the Ground</h3>
  <p>Collective sports on the ground such as basketball are considered low-risk to people with epilepsy and bystanders should a seizure happen while playing.</p>
  
  <h3 class="font-bold">Safety Tips</h3>
  <ul class="list-inside list-decimal">
      <li>
          Make sure to tell your friends, teammates, or coaches about your epilepsy and what to do in case of a seizure.
      </li>
      <li>
          Consider wearing a medic alert bracelet or keeping a card handy that lets people know about your epilepsy and the steps for first aid.
      </li>
      <li>
          Wear safety gear: elbow or knee pads, a helmet, and if needed, protective eyeglasses or goggles.
      </li>
      <li>
          Stay hydrated by bringing a big bottle of water for each game. Dehydration can raise the chances of having a seizure.
      </li>
      <li>
          Remember to take short breaks to prevent overheating and stress.
      </li>
      <li>
          Consider the heat and how your seizures are affected by higher temperatures. It might be best to avoid playing basketball on especially warm days.
      </li>
  </ul>`,
  cycling: `<h3 class="font-bold">Cycling as an Alternative for Travel</h3>
  <p>Riding a bike is often considered a budget-friendly alternative for short-distance travel, particularly if you don’t drive.</p>
  
  <p>Having seizure concerns is understandable, but we encourage you to engage in activities you find interesting. Many individuals with epilepsy find cycling fun and it gives a practical way to go around.</p>
  
  <p>Cycling is considered moderate risk to people with epilepsy and bystanders should a seizure happen. It’s important to keep in mind some important factors to consider when cycling.</p>
  
  <ul class="list-inside list-decimal">
      <li>Wear protective gear: good-quality helmet, knee and elbow pads, and other equipment that will make you feel safe.</li>
      <li>Avoid busy streets and ride on bike paths.</li>
      <li>Whenever you can, it's good to have someone ride along with you who knows about your epilepsy and what to do if you have a seizure.</li>
      <li>Avoid remote areas. Cycling through the countryside can be an amazing experience.</li>
  </ul>
  `,
  football: `<h3 class="font-bold">Collective Sports on the Ground</h3>
  <p>Collective sports on the ground such as football are considered low-risk to people with epilepsy and bystanders should a seizure happen while playing.</p>
  
  <h3 class="font-bold">Safety Tips</h3>
  <ul class="list-inside list-decimal">
      <li>Make sure to tell your friends, teammates, or coaches about your epilepsy and what to do in case of a seizure.</li>
      <li>Consider wearing a medic alert bracelet or keeping a card handy that lets people know about your epilepsy and the steps for first aid.</li>
      <li>Wear protective clothing: elbow or knee pads, helmet, and protective eyeglasses or goggles.</li>
      <li>Stay hydrated, drink plenty of fluids.</li>
      <li>If heat tends to trigger your seizures, take breaks and avoid playing or training in extremely hot weather.</li>
      <li>Allow yourself adequate time to rest and recover between training sessions and matches.</li>
  </ul>
  `,
  hiking: `<p>Hiking is possible even if you have epilepsy. Take it from Chris Winwood, an avid hiker with epilepsy who trekked the Chilkoot Trail – that’s 53 km of varying terrain!</p>

  <h3 class="font-bold">Here are some tips on how you can enjoy hiking too:</h3>
  
  <ul class="list-inside list-decimal">
      <li>Preparation is key. Be in relatively good health during the month you plan to hike and don’t overexert yourself a few days before.</li>
      <li>Have a hiking partner who knows about your epilepsy and what to do if you have a seizure.</li>
      <li>Bring an extra supply of medication, enough food and water, a hiking stick for better support during the climb, emergency contact devices if available, and a first aid kit.</li>
      <li>Take a break if you need to: stretch, take a deep breath and give yourself time to recover.</li>
  </ul>
  
  <p>Start with shorter distances and smaller goals, these helped Nisshaa Muniandy. In her blog, she wrote “I didn't want my epilepsy to hold me back. Surprisingly, I managed to go on 2 hikes this year. I hope my story and my experience inspire others with epilepsy to try something they might be afraid of.”</p>
  `,
  lacrosse: `<p>It’s possible to enjoy lacrosse. Take it from Maddie Gebert, an athlete of Temple University women’s lacrosse team who has epilepsy.</p>

  <h3 class="font-bold">Safety Tips</h3>
  <ul class="list-inside list-decimal">
      <li>Make sure to tell your friends, teammates, or coaches about your epilepsy and what to do in case of a seizure.</li>
      <li>Wear proper gear like helmets, goggles, cleats, mouthguards, gloves and elbow and shoulder pads. You can find a list of manufacturers here that provide safety equipment.</li>
      <li>Before starting a practice or game, it's essential to inspect the field or goals at each end for any hazards like holes, debris, or broken glass.</li>
      <li>Make sure to store extra balls and equipment safely off to the sides of the field to prevent accidents during play.</li>
      <li>Before the game, take off any piercings or jewelry and make sure to warm up and stretch properly.</li>
      <li>Stay hydrated.</li>
  </ul>
  `,
  "martial-arts": `<p>Martial arts, overall, enhance self-esteem and social confidence, with various types carrying different risks.</p>

  <h3 class="font-bold">Safety Tips</h3>
  <ul class="list-inside list-decimal">
      <li>Talk to your doctor first and take a physical exam to make sure you are cleared to participate.</li>
      <li>Make sure to tell your friends, teammates, or coaches about your epilepsy and what to do in case of a seizure.</li>
      <li>Ask your coach or supervisor to watch and monitor you during all sessions, particularly when you are performing complex or challenging moves.</li>
      <li>Check if the environment is safe. Practice in a well-padded area if applicable and be aware of your surroundings while other participants are practicing to avoid collisions.</li>
      <li>Remember to warm up and cool down to reduce the risk of injuries. Try stretching your arms, back, neck, trunk, wrists and ankles for up to 15 minutes before participating in martial arts.</li>
  </ul>
  `,
  "rock-climbing": `<p>Generally, individuals with uncontrolled seizures should avoid rock or mountain climbing. But many young people with epilepsy have done it before, check out some of the stories <a href="URL-TO-STORIES" class="text-blue-500 hover:text-blue-700">here</a>. Be sure to ask your doctor first if you can participate in these activities.</p>

  <h3 class="font-bold">Safety Tips</h3>
  <ul class="list-inside list-decimal">
      <li>Make sure your companions understand basic first aid and how to administer emergency medication if needed.</li>
      <li>Always carry spare and emergency medication with you.</li>
      <li>Make sure you have a plan for injuries, weather changes, and unexpected delays. Set a turnaround time and inform someone else of your trip plans for added safety.</li>
      <li>Always wear a helmet and other protective gear when climbing.</li>
  </ul>
  `,
  "roller-skating": `<p>Skating has a moderate additional risk to people with epilepsy but no additional risks to bystanders should a seizure happen.</p>

  <h3 class="font-bold">Safety Tips</h3>
  <ul class="list-inside list-decimal">
      <li>Wear appropriate safety gear, such as helmet, knee pads, elbow pads and mouth guards.</li>
      <li>Make sure your skates fit properly and are free of debris. If the wheels are worn out from use, it's essential to replace them.</li>
      <li>If you are a beginner, consider learning in obstacle-free spaces or areas with grass beside so you’ll have a soft place to fall.</li>
      <li>Skate in less crowded and well-lit areas.</li>
  </ul>
  `,
  rowing: `<p>Water sports can be made safer for individuals with epilepsy by assessing risks and taking appropriate precautions. Understanding how your epilepsy may affect you during the activity is crucial to minimizing potential hazards.</p>

  <h3 class="font-bold">Safety Tips</h3>
  <ul class="list-inside list-decimal">
      <li>
          Assess your risks or do it with your doctor. British Rowing created a list of questions to ask yourself before participating in sports activities.
          <ul class="list-disc list-inside pl-5">
              <li>What are your seizures like?</li>
              <li>Do you have seizures where you become unconscious, confused or are only partly aware of what is happening?</li>
              <li>When was your last seizure?</li>
              <li>Are your seizures controlled (stopped) with medication?</li>
              <li>When do your seizures occur?</li>
              <li>Are your seizures triggered by stress or tiredness?</li>
              <li>Are there any signs or symptoms that warn you that a seizure is going to happen?</li>
              <li>Would you be able to alert others and be able to get to a safe or safer place if on the water?</li>
              <li>What would make rowing safer for you?</li>
          </ul>
      </li>
      <li>Row with a friend, coach or instructor who knows how to assist in case of a seizure.</li>
      <li>Wear a lifejacket and medic alert or bracelet.</li>
      <li>Make sure any emergency medication you may need is easily accessible while you're on the water. Store it in a waterproof bag secured in the boat or with a coach in a launch accompanying your crew.</li>
  </ul>
  
  <p>Meet Morgan. When she was told she couldn't join her school's rowing crew team because of her epilepsy diagnosis, she didn't give up. She found a solution with the support of her healthcare provider and her team.</p>
  `,
  running: `<h3 class="font-bold">Safety Tips</h3>
  <p>Running is considered to have moderate additional risk to people with epilepsy but no additional risks to bystanders should a seizure happen.</p>
  
  <ul class="list-inside list-decimal">
      <li>Avoid using a treadmill alone because falling can lead to major injuries. It's better to run, jog or walk outside or on a track.</li>
      <li>Avoid busy streets and dangerous trails.</li>
      <li>Use safety gear like helmet, elbow pads, and knee pads when appropriate.</li>
      <li>Take a break whenever you need to and stay hydrated.</li>
  </ul>
  `,
  skiing: `<h3 class="font-bold">Safety Tips</h3>
  <p>Nordic (cross-country) skiing has no significant additional risk to people with epilepsy or bystanders should a seizure happen during the activity. However, downhill skiing with a helmet is considered a moderate risk.</p>
  
  <ul class="list-inside list-decimal">
      <li>Warm up before hitting the slopes. Focus on areas like your calves, hamstrings, quadriceps, and shoulders to prepare your body for skiing or snowboarding.</li>
      <li>Dress warmly to stay comfortable in cold playing conditions and wear appropriate protective gear for safety, particularly helmets.</li>
      <li>Consider using a safety strap when riding the ski lift for added stability.</li>
      <li>Have a skiing or snowboarding buddy who knows about your epilepsy and what to do in case of emergencies.</li>
  </ul>
  `,
  swimming: `<h3 class="font-bold">Swimming Safety Tips</h3>
  <p>Swimming is considered to have moderate additional risk to people with epilepsy but no additional risks to bystanders should a seizure happen during the activity.</p>
  
  <ul class="list-inside list-decimal">
      <li>Never swim alone, and if possible, swim in areas with a lifeguard on duty. If a lifeguard is not available, make sure to have a watcher with you. Always swim with someone who is aware of your seizures and can assist you if necessary.</li>
      <li>When you are in a pool, swim closer to the outside lane to make it easier for people to help you when needed.</li>
      <li>Wear brightly coloured swim gear that will stand out from your surroundings, like a neon green cap when swimming in blue pool water.</li>
      <li>Ensure you maintain adequate energy levels by avoiding fatigue, staying hydrated, and monitoring blood sugar levels.</li>
      <li>Swimming in a swimming pool is generally safer than swimming in open water like lakes, oceans, or rivers.</li>
  </ul>
  `,
  travel: `<h3 class="font-bold">Before Travelling</h3>
  <ul class="list-inside list-decimal">
      <li>Make sure your travel companion knows how to help if you have a seizure.</li>
      <li>Choose travel options where you can access emergency support if needed.</li>
      <li>Find places to stay that meets your needs (dietary preferences, mobility aids, recovery space after a seizure).</li>
      <li>Pack enough food and water.</li>
  </ul>
  
  <h4>By Car</h4>
  <p>If you have epilepsy and want to travel by car, first check if you can drive legally and safely. If you can't drive, see if a friend or family member can drive you. When driving:</p>
  <ul class="list-inside list-disc">
      <li>Take breaks often and don't drive if you are too tired, missed a medicine, or might have a seizure.</li>
      <li>If flashing lights bother you, avoid driving at night, especially on highways where bright headlights from other cars can be a problem.</li>
  </ul>
  
  <h4>By Plane</h4>
  <ul class="list-inside list-disc">
      <li>Before flying, talk to your doctor first. You can also wear a medical bracelet, necklace, or other identification indicating your epilepsy.</li>
      <li>Different countries have their own rules about travelling with medication, even over-the-counter ones. Check these rules before you travel.</li>
      <li>Before travelling, find out what vaccinations you need and what paperwork is required. Do this well before your trip because some vaccinations need to be given weeks in advance.</li>
      <li>Think about how changing time zones, lack of sleep, and long delays might affect your seizures.</li>
      <li>Find a nearby pharmacy at your destination in case you run out of medication.</li>
      <li>Travel with a companion, especially if you have frequent or complex seizures.</li>
      <li>Carry a written letter from your doctor permitting you to travel and a completed Seizure Action Plan.</li>
      <li>Contact the airline ahead for special seating arrangements and request an empty seat nearby.</li>
      <li>Bring a supply of medication in labelled bottles for the flight.</li>
      <li>If you use rescue medicine for clusters of seizures, discuss management with your doctor.</li>
      <li>Prioritize your well-being by managing anxiety before your trip to help control seizures and enjoy your travels.</li>
      <li>If you have a vagus nerve stimulator (VNS), it's a good idea to inform airport staff as it may trigger the security scanner.</li>
  </ul>
  
  <h4>By Cruise Ship</h4>
  <p>Before your trip, understand the policies of the cruise line you're travelling with. Discuss these details well in advance of your travel date.</p>
  <ul class="list-inside list-disc">
      <li>Get any agreements with the cruise line in writing to ease boarding day.</li>
      <li>Think about the things you may need for your trip:
          <ul class="list-inside list-disc">
              <li>An accessible cabin</li>
              <li>Use of a service dog</li>
              <li>Dietary restrictions</li>
              <li>Use of medical marijuana or other prescribed medicines onboard</li>
          </ul>
      </li>
  </ul>
  
  <h4>By Train or Bus</h4>
  <ul class="list-inside list-disc">
      <li>Consider whether to travel alone or with a buddy, especially if you have seizures.</li>
      <li>If you are prone to wandering or falls during seizures, be cautious on train platforms.</li>
      <li>Have someone accompany you on and off trains and while waiting to prevent accidents.</li>
      <li>Ensure train or bus personnel are aware of your seizures and know how to respond if one occurs while you're travelling.</li>
  </ul>
  `,
  volleyball: `<h3 class="font-bold">Safety Tips</h3>
  <p>Most team sports taking place on a court such as volleyball have no significant additional risk to young people with epilepsy or bystanders.</p>
  
  <ul class="list-inside list-decimal">
      <li>Make sure to tell your friends, teammates, or coaches about your epilepsy and what to do in case of a seizure.</li>
      <li>Wear safe volleyball gear: knee pads, padded shorts, volleyball shoes, mouthguards, and prescription goggles if needed.</li>
      <li>Before starting any training program, it's important to get a sports physical. Make sure you're in good shape before hitting the volleyball court.</li>
      <li>Always remember to warm up and stretch before practices and matches.</li>
  </ul>
  `,
  wrestling: `<h3 class="font-bold">Safety Tips</h3>
  <p>Most collective contact sports such as wrestling have no significant additional risk to young people with epilepsy or bystanders.</p>
  
  <ul class="list-inside list-decimal">
      <li>Make sure to tell your friends, teammates, or coaches about your epilepsy and what to do in case of a seizure.</li>
      <li>Wear safe wrestling gear: headgear, kneepads, light and flexible wrestling shoes, mouthguards, and athletic support.</li>
      <li>Always warm up and stretch before practice and matches.</li>
      <li>If you get hurt or feel pain, stop training and get checked by a healthcare professional before returning.</li>
  </ul>
  
  <p>Meet <a href="https://wtov9.com/newsletter-daily/wrestling-with-epilepsy-brave-edison-high-athlete-balances-mat-and-seizures" target="_blank">Jaiden Jolly</a>, a senior wrestler at Edison High School in Ohio. Even after his diagnosis, he remained committed to pursuing his passion for wrestling.</p>
  `,
};

export const activities: ActivityMap = {
  "online-activities": {
    name: "Online activities",
    slug: "online-activities",
    url: "/images/online.jpeg",
    content: contentsMap["online-activities"],
    videos: [
      '<iframe width="380" height="300" src="https://www.youtube.com/embed/tzV0fIW6qzE?si=JQ0GBxanCqlO5ijQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
      '<iframe width="380" height="300" src="https://www.youtube.com/embed/NkLrzh0rBpc?si=sFcmetIsNavhAaUG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
      '<iframe width="380" height="300" src="https://www.youtube.com/embed/oKECKQJ-iVI?si=vYVSCghixc1qJUDF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    ],
  },
  baseball: {
    name: "Baseball",
    slug: "baseball",
    content: contentsMap["baseball"],
    url: "/images/baseball.jpeg",
  },
  basketball: {
    name: "Basketball",
    slug: "basketball",
    url: "/images/basketball.jpeg",
    content: contentsMap["basketball"],
  },
  cycling: {
    name: "Cycling",
    slug: "cycling",
    url: "/images/biking.jpeg",
    content: contentsMap["cycling"],
  },
  football: {
    name: "Football or Soccer",
    slug: "football",
    url: "/images/soccer.jpeg",
    content: contentsMap["football"],
  },
  hiking: {
    name: "Hiking",
    slug: "hiking",
    url: "/images/hiking.jpeg",
    content: contentsMap["hiking"],
  },
  lacrosse: {
    name: "Lacrosse",
    slug: "lacrosse",
    url: "/images/lacrosse.jpeg",
    content: contentsMap["lacrosse"],
  },
  "martial-arts": {
    name: "Martial arts",
    slug: "martial-arts",
    url: "/images/martial-arts.jpeg",
    content: contentsMap["martial-arts"],
  },
  "rock-climbing": {
    name: "Rock or mountain climbing",
    slug: "rock-climbing",
    url: "/images/rock-climbing.jpeg",
    content: contentsMap["rock-climbing"],
  },
  "roller-skating": {
    name: "Roller Skating",
    slug: "roller-skating",
    url: "/images/roller-skating.jpeg",
    content: contentsMap["roller-skating"],
  },
  rowing: {
    name: "Rowing",
    slug: "rowing",
    url: "/images/rowing.jpeg",
    content: contentsMap["rowing"],
    videos: [
      '<iframe width="380" height="300" src="https://www.youtube.com/embed/3qAz-RUs4NI?si=ZVmFKktPOXxgjVQ8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    ],
  },
  running: {
    name: "Running, jogging or walking",
    slug: "running",
    url: "/images/running.jpeg",
    content: contentsMap["running"],
  },
  skiing: {
    name: "Skiing or Snowboarding",
    slug: "skiing",
    url: "/images/skiing.jpeg",
    content: contentsMap["skiing"],
  },
  swimming: {
    name: "Swimming",
    slug: "swimming",
    url: "/images/swimming.jpeg",
    content: contentsMap["swimming"],
  },
  travel: {
    name: "Travel",
    slug: "travel",
    url: "/images/travel.jpeg",
    content: contentsMap["travel"],
  },
  volleyball: {
    name: "Volleyball",
    slug: "volleyball",
    url: "/images/volleyball.jpeg",
    content: contentsMap["volleyball"],
  },
  wrestling: {
    name: "Wrestling",
    slug: "wrestling",
    url: "/images/wrestling.jpeg",
    content: contentsMap["wrestling"],
  },
};
