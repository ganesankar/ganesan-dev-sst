/*
 * =========================
 * APP INFO
 * =========================
 */
export type SeoPropType = {
  title: string;
  author: string;
  description: string;
  image: string;
  url: string;
  keywords: string[];
};

/*
 * =========================
 * NAVIGATION
 * =========================
 */

export type NavLinkType = {
  name: string;
  url: string;
};
export type FooterLinkType = {
  name: string;
  url: string;
};
export type FooterInfoLinkType = {
  name: string;
  link: string;
  icon: any;
};
export type FooterContactPropsType = {
  prefix: string;
  icon: any;
  title: string;
  text: string[];
  links: FooterInfoLinkType[];
};

/*
 * =========================
 * HOME PAGE
 * =========================
 */

type HeroButton = {
  link: string;
  text: string;
  icon: any;
};

export type HomeHeroPropsType = {
  image: string;
  name: string;
  prefix: string;
  icon: any;
  title: string;
  subText: string;
  buttons: HeroButton[];
};

type HomeServicesT = {
  title: string;
  points: string[];
  icon: any;
};
export type HomeAboutPropsType = {
  prefix: string;
  icon: any;
  title: string;
  text: string[];
};

export type HomeWorkPropsType = {
  prefix: string;
  icon: any;
  title: string;
  text: string[];
  services: HomeServicesT[];
};

export type HomeProjectPropsType = {
  prefix: string;
  icon: any;
  title: string;
  text: string[];
};

export type HomeBlogPropsType = {
  prefix: string;
  icon: any;
  title: string;
  text: string[];
};

/*
 * =========================
 * BLOG PAGE
 * =========================
 */
interface BlogPostItemType {
  name: string;
  img: string;
  title: string;
  date: string;
  content: string;
}

export interface BlogPostListType {
  year: string;
  list: BlogPostItemType[];
}

export interface BlogPostErrorType {
  status: string | number;
  message: string;
}
/*
 * =========================
 * PROJECTS PAGE
 * =========================
 */
export interface ProjectItemType {
  name: string;
  img: string;
  title: string;
  date: string;
  content: string;
}

export interface ProjectItemErrorType {
  status: string | number;
  message: string;
}

/*
 * =========================
 * CONTACT PAGE
 * =========================
 */
type socialButton = {
  link: string;
  text: string;
  icon: any;
};
type contactButton = {
  link: string;
  prefix: string;
  text: string;
  icon: any;
};
export type ContactPagePropsType = {
  prefix: string;
  icon: any;
  title: string;
  text: string[];
  social: socialButton[];
  contact: contactButton[];
};

export type SocialLinkType = {
  icon: string;
  url: string;
};

export type CTAType = {
  title: string;
  url: string;
  sameTab?: boolean;
};

/*
 * =========================
 * RESUME PAGE
 * =========================
 */

export interface ResumeType {
  name: string;
  img: string;
  title: string;
  date: string;
  content: string;
}
export type ResumeItemPropsType = {
  title: string;
  subtitle: string;
  place: string;
  startDate: string;
  endDate: string;
  listing: string[];
  description?: string;
  company?: string;
};

export type ResumeItemsPropsType = {
  content: ResumeItemPropsType[];
};
export type ResumeItem2PropsType = {
  item: ResumeItemPropsType;
};
export interface ResumeSectionType {
  title: string;
  content: ResumeItemPropsType[];
}
/*
 * =========================
 * HOME PAGE
 * =========================
 */

type resumeButton = {
  link: string;
  text: string;
  icon: any;
};

export type ResumePropsType = {
  image: string;
  name: string;
  title: string;
  buttons: resumeButton[];
};

/*
 * =========================
 * PAGE NOT FOUND PAGE
 * =========================
 */

type pageNotFoundButton = {
  link: string;
  text: string;
  icon: any;
};

export type pageNotFoundPropsType = {
  prefix: string;
  icon: any;
  title: string;
  text: string[];
  buttons: pageNotFoundButton[];
};

// env
export type ExperienceType = {
  role: string;
  company: string;
  companyUrl: string;
  started: string;
  upto: string;
  tasks: string[];
};

export type ProjectType = {
  id: string;
  name: string;
  url: string;
  year: number;
  img: string;
  tags: string[];
  repo: string;
};

export type StringKeyValueType = {
  [link: string]: string;
};

export type Direction = "up" | "right" | "down" | "left";

export type SoftwareSkillType = { name: string; icon: string };

export type BreakpointType = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
