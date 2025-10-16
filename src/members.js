import antonio from "./assets/antonio.jpg";
import andrea from "./assets/andrea.jpg";
import samuele from "./assets/samuele.jpg";
import mihai from "./assets/mihai_antonio.jpg";
import matteo from "./assets/matteo.jpg";
import eva from "./assets/eva_luna.jpg";
import lorenzo from "./assets/lorenzo.jpg";

const members = [
  {
    name: "Antonio Facciuti",
    role: "Public Relations & Web Developer",
    image: antonio.src || antonio,
    links: {
      linkedin: "https://www.linkedin.com/in/antonio-facciuti/",
      github: "https://github.com/toxin95",
    },
  },
  {
    name: "Andrea Carbone",
    role: "Game Artist",
    image: andrea.src || andrea,
    links: {
      artstation: "https://artstation.com/andreacarbone",
      linkedin: "https://www.linkedin.com/in/andrea-carbone-1a3047317",
      instagram: "https://www.instagram.com/andreacarbone88",
    },
  },
  {
    name: "Samuele Angeletti",
    role: "Lead Programmer",
    image: samuele.src || samuele,
    links: {
      website: "https://samudev.ezyro.com",
      itch: "https://samu-dev-20.itch.io/",
      linkedin: "https://www.linkedin.com/in/samuele-angeletti-988339151/",
      github: "https://github.com/Samuele-Angeletti",
    },
  },
  {
    name: "Mihai Antonio Alexandrescu",
    role: "Game Designer /QA",
    image: mihai.src || mihai,
    links: {
      linkedin: "https://www.linkedin.com/in/mihai-antonio-alexandrescu-5822a7358/",
      instagram: "https://www.instagram.com/anthonik22/",
    },
  },
  {
    name: "Matteo Giovannini",
    role: "Game Programmer",
    image: matteo.src || matteo,
    links: {
      linkedin: "https://www.linkedin.com/in/matteo-giovannini-36439617b/",
    },
  },
  {
    name: "Eva Luna Calzavara",
    role: "Game Designer",
    image: eva.src || eva,
    links: {
      linkedin: "https://www.linkedin.com/in/eva-luna-calzavara-embla-of-midgard",
    },
  },
  {
    name: "Lorenzo Altamore",
    role: "Sound Designer",
    image: lorenzo.src || lorenzo,
    links: {
      instagram: "https://www.instagram.com/frequency_jammer",
    },
  },
];

export default members;
