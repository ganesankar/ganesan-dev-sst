import {
  NavLinkType,
  FooterContactPropsType,
  SeoPropType,
  HomeHeroPropsType,
  HomeAboutPropsType,
  HomeWorkPropsType,
  HomeProjectPropsType,
  HomeBlogPropsType,
  ContactPagePropsType,
  ResumePropsType,
  pageNotFoundPropsType,
} from "@/types/index";
import {
  LiaCodeSolid,
  LiaPaintBrushSolid,
  LiaEnvelope,
  LiaEnvelopeSolid,
  LiaPhoneSolid,
  LiaDownloadSolid,
} from "react-icons/lia";
import { LuSearchX } from "react-icons/lu";
import { FaHand, FaEllo, FaBriefcase, FaCode, FaPenNib } from "react-icons/fa6";
import {
  SiX,
  SiLinkedin,
  SiGithub,
  SiFacebook,
  SiInstagram,
  SiSnapchat,
  SiWhatsapp,
  SiTelegram,
  SiGooglehome,
} from "react-icons/si";
/*
 * =========================
 * APP CONTENT
 * =========================
 */

export const author = {
  name: "Ganesan Karuppaiya",
  email: "ganesank@live.com",
};

export const seoData: SeoPropType = {
  title: "Ganesan Karuppaiya | Full Stack Lead Developer | UX Designer",
  description:
    "Ganesan Karuppaiya serves as a Full Stack Lead Developer, with a focus on creating outstanding visual interfaces, while also engaging in design activities on occasion.",
  author: author.name,
  image: "https://avatars.githubusercontent.com/u/56182707",
  url: "https://ganesan.dev/",
  keywords: [
    "Ganesan Karuppaiya",
    "@ganesankar",
    "Ganesan k",
    "Portfolio",
    "Ganesan Karuppaiya Portfolio",
  ],
};

export const FooterContactContent: FooterContactPropsType = {
  icon: <LiaEnvelope />,
  prefix: "What's Next",
  title: "Get In Touch",
  text: [
    "I am not actively seeking freelance opportunities at this time; however, I welcome the chance to collaborate with driven individuals. Please feel free to introduce yourself, and I will reach out to you.",
  ],
  links: [
    {
      name: "Contact Me",
      link: "/contact",
      icon: <LiaEnvelope />,
    },
  ],
};

/*
 * =========================
 * HOME PAGE CONTENT
 * =========================
 */

export const heroContent: HomeHeroPropsType = {
  icon: <FaHand />,
  prefix: " Hello, I am",
  name: "Ganesan Karuppaiya",
  title: "I build things for the web",
  subText:
    "I am a software engineer located in Chennai, India, with a specialization in creating outstanding digital experiences. My work primarily involves the development of web products, encompassing the entire process from the initial concept to the final solution, with occasional involvement in design.",
  image: "https://avatars.githubusercontent.com/u/56182707?v=4",
  buttons: [
    {
      text: "LinkedIn",
      link: "https://www.linkedin.com/in/ganesankar/",
      icon: <SiLinkedin />,
    },
    {
      text: "GitHub",
      link: "https://github.com/ganesankar",
      icon: <SiGithub />,
    },
    {
      text: "X",
      link: "https://X.com/ganesankar",
      icon: <SiX />,
    },
    {
      text: "Facebook",
      link: "https://www.facebook.com/ganesankars",
      icon: <SiFacebook />,
    },
    {
      text: "Instagram",
      link: "https://www.instagram.com/ganesankar",
      icon: <SiInstagram />,
    },
  ],
};
export const aboutContent: HomeAboutPropsType = {
  icon: <FaEllo />,
  prefix: "About Me",
  title: "I am passionate about new technologies",
  text: [
    "I am a full-stack developer and IT professional with nearly fifteen years of experience in the industry, specializing in enhancing the technical frameworks of various organizations. I am recognized for my innovative thinking and versatility, allowing me to engage in a diverse array of projects while effectively adapting to the specific requirements of each initiative.",
    "In my current position as Full Stack Lead Developer, I oversee a development team tasked with delivering solutions that encompass the creation of systems for international clients.",
    "My commitment to assisting others and resolving challenges has driven me to immerse myself in projects, consistently exceeding expectations through a meticulous approach that is evident in the final outcomes. When I encounter areas where my expertise is limited, I proactively invest time in research to ensure outstanding results for my clients. I pride myself on being a collaborative team member and an effective organizer, employing clear communication to foster open and productive relationships with my colleagues.",
  ],
};

export const workContent: HomeWorkPropsType = {
  icon: <FaBriefcase />,
  prefix: "At Work",
  title: "Here is what I do",
  text: [
    "I specialize in the design and development of web applications, recognizing that an optimal user experience must not only be visually appealing but also function seamlessly.",
    "I create customized full-stack solutions utilizing Node.js and AWS, employing contemporary tools and methodologies. My expertise includes React.js, Redux, Node.js, Next.js, Vue, Nuxt.js, AWS Lambda, and various other services. I will manage the entire project lifecycle, from initial discovery and development to deployment and ongoing enhancements.",
  ],
  services: [
    {
      icon: <LiaCodeSolid />,
      title: "Full Stack Development",
      points: [
        "Developing Responsive Single Page Applications (SPAs) with ReactJS.",
        "Creating RESTful APIs utilizing AWS.",
        "Implementing Functional and Automation Testing.",
        "Constructing Server-Side Rendered (SSR) Websites with Next.js and Nuxt.js.",
        "Provisioning AWS resources using  Cloudformation, Terraform & Serverless.",
      ],
    },
    {
      icon: <LiaPaintBrushSolid />,
      title: "UI/UX Designing",
      points: [
        "Developing intuitive interfaces such as wireframes and mockups utilizing Figma.",
        "Establishing design systems and style guidelines.",
        "Delivering design solutions that prioritize user-friendliness.",
      ],
    },
  ],
};
export const projectContent: HomeProjectPropsType = {
  icon: <FaCode />,
  prefix: "At no time",
  title: "Worked on some projects",
  text: [
    "I have had the privilege of collaborating with exceptionally talented companies and individuals throughout my career, which has enabled me to engage in a variety of intriguing, challenging, and remarkable projects.",
    "However, I will highlight a few personal projects here, while further details regarding the projects I developed for my employers can be found in my resume.",
  ],
};
export const blogContent: HomeBlogPropsType = {
  icon: <FaPenNib />,
  prefix: "Rarely",
  title: "I Write Some Times",
  text: [
    "I do not consider myself a professional blogger or a poet. However, I often engage with articles across various fields, including technology, science, and literature. On rare occasions, I find the tranquility to write, and the results of those efforts are listed below.",
  ],
};

export const contactContent: ContactPagePropsType = {
  icon: <LiaEnvelopeSolid />,
  prefix: "If Interested",
  title: "Let Us Connect",
  text: [
    "To make contact, please complete the form provided below, and I will respond as soon as possible.",
    "Additionally, I am proficient in English and Tamil.",
    "You can also connect with me on the following social networks.",
  ],
  social: [
    {
      text: "LinkedIn",
      link: "https://www.linkedin.com/in/ganesankar/",
      icon: <SiLinkedin />,
    },
    {
      text: "GitHub",
      link: "https://github.com/ganesankar",
      icon: <SiGithub />,
    },
    {
      text: "X",
      link: "https://X.com/ganesankar",
      icon: <SiX />,
    },
    {
      text: "Facebook",
      link: "https://www.facebook.com/ganesankars",
      icon: <SiFacebook />,
    },
    {
      text: "Instagram",
      link: "https://www.instagram.com/ganesankar",
      icon: <SiInstagram />,
    },
    {
      text: "SnapChat",
      link: "https://www.snapchat.com/add/ganesankar",
      icon: <SiSnapchat />,
    },
    {
      text: "Telegram",
      link: "https://t.me/ganesankar",
      icon: <SiTelegram />,
    },
  ],
  contact: [
    {
      text: "ganesank@live.com",
      prefix: "Mail",
      link: "mailto:ganesank@live.com",
      icon: <LiaEnvelopeSolid />,
    },
    {
      text: "+91 994 373 2416",
      prefix: "Call",
      link: "tel:+919943732416",
      icon: <LiaPhoneSolid />,
    },
  ],
};

/*
 * =========================
 * RESUME PAGE CONTENT
 * =========================
 */

export const resumeContent: ResumePropsType = {
  name: "Ganesan Karuppaiya",
  image: "https://avatars.githubusercontent.com/u/56182707",
  title: "Full Stack Lead Developer & User Interface Designer.",
  buttons: [
    {
      text: "Download",
      link: process.env.NEXT_PUBLIC_UPLOAD_ATTACHMENTS_URL + "GanesanKaruppaiyaResume.pdf",
      icon: <LiaDownloadSolid />,
    },
    {
      text: "Mail",
      link: "mailto:ganesank@live.com",
      icon: <LiaEnvelopeSolid />,
    },
  ],
};

/*
 * =========================
 * RESUME PAGE CONTENT
 * =========================
 */

export const PageNotFoundContent: pageNotFoundPropsType = {
  icon: <LuSearchX />,
  prefix: "Sadly",
  title: "404",
  text: [
    "It looks like you are lost...",
    "the page you are looking for doesn't exist",
  ],
  buttons: [
    {
      text: "Home",
      link: "/",
      icon: <SiGooglehome />,
    },
  ],
};
