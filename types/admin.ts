
/*
 * =========================
 * NAVIGATION
 * =========================
 */

export type NavLinkType = {
  name: string;
  link: string;
  icon: any;
};
export type FooterLinkType = {
  name: string;
  url: string;
};


/*
 * =========================
 * DASHBOARD PAGE
 * =========================
 */

type DashboardButton = {
  name: string;
  link: string;
  icon: any;
};
export type DashboardPropsType = {
  prefix: string;
  icon: any;
  title: string;
  text: string[];
  links: DashboardButton[];
};

export interface IOlympicData {
  athlete: string,
  age: number,
  country: string,
  year: number,
  date: string,
  sport: string,
  gold: number,
  silver: number,
  bronze: number,
  total: number
}