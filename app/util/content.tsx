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
    "Ganesan Karuppaiya is a Full Stack Lead Developer  who specializes in building (and occasionally designing) exceptional visual interfaces.",
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
    "I am not currently looking for freelance opportunities, but my inbox is always open to collaborate with ambitious people; just introduce yourself, will get in touch!.",
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
    " I'm a Chennai (India)-based software engineer specialized in building exceptional digital experiences; Occasionally designing and mostly developing web products right from intial idea from conception to complete solution.",
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
    "I´m a full-stack developer and IT professional with almost fifteen  years of experience in the industry, transforming the technical aspects of various firms.  I´m well known for my ability to think outside the box and be an extremely versatile developer who works on a variety of projects and adeptly adapts to unique circumstances of each project.",
    "In my current role as Full Stack Lead Developer, I´m leading  development team to provide solutions ranging from creating solutions and complete systems for international clients.",
    "My willingness to help others and solve issues has made me delve into projects and deliver beyond expectations in a detail-oriented approach that can be seen on the final product. If I find something that I don’t fully dominate, I always go the extra mile by researching, ensuring excellent results to my clients. I consider myself a team player and a great organizer, utilizing clear-cut communication to create open and productive relationships with fellow team members.",
  ],
};

export const workContent: HomeWorkPropsType = {
  icon: <FaBriefcase />,
  prefix: "At Work",
  title: "Here is what I do",
  text: [
    "I design and develop web applications, I understand the perfect user experience should look good and work even better.",
    "I develop full-stack, bespoke NodeJs and AWS solutions with modern tooling and processes, using ReactJS, Redux, NodeJS, NextJS, Vue, NuxtJS, AWS Lambda and other services, I will oversee complete project through discovery, development, go-live, and iterative improvement. .",
  ],
  services: [
    {
      icon: <LiaCodeSolid />,
      title: "Full Stack Development",
      points: [
        "Building Responsive SPA using ReactJS",
        "Building RESTful APIS in and using AWS",
        "Building Functional and Automation testing",
        "Building SSR  Websites using NextJs and NuxtJS",
        "Creating AWS resources as with Terraforms and Serverless",
      ],
    },
    {
      icon: <LiaPaintBrushSolid />,
      title: "UI/UX Designing",
      points: [
        "Designing user-friendly interfaces like wireframes and mockups with figma",
        "Creating design systems and style guides",
        "Providing user-friendly design solutions",
      ],
    },
  ],
};
export const projectContent: HomeProjectPropsType = {
  icon: <FaCode />,
  prefix: "At no time",
  title: "Worked on some projects",
  text: [
    "I have been lucky enough to work with some awesomely brilliant companies and people over the years, allowing me to work on some interesting, challenging, and fantastic projects.",
    " But listing here some personal projects, for details about projects i developed for my companies will be available in my resume",
  ],
};
export const blogContent: HomeBlogPropsType = {
  icon: <FaPenNib />,
  prefix: "Rarely",
  title: "I Write Some Times",
  text: [
    "i am not professional blogger and not poet too.. I frequently read  articles in all form of technology, science and literature,in very rare occasions with peace of mind, will write sometime and those are listed below.. ",
  ],
};

export const contactContent: ContactPagePropsType = {
  icon: <LiaEnvelopeSolid />,
  prefix: "If Interested",
  title: "Let Us Connect",
  text: [
    "To Get in touch, fill the form below and I will reply ASAP.",
    "BTW, I speak English and Tamil.",
    "Also available in Below Social Networks.",
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
      text: "Whatsapp",
      link: "https://api.whatsapp.com/send?phone=919943732416",
      icon: <SiWhatsapp />,
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
