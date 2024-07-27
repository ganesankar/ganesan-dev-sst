import { NavLinkType, DashboardPropsType } from "../../types/admin";
import {
  LiaHomeSolid,
  LiaFileAlt,
  LiaFileContractSolid,
  LiaFileCode,
  LiaFileUploadSolid,
  LiaFolder,
} from "react-icons/lia";
/*
 * =========================
 * APP CONTENT
 * =========================
 */
export const imageFormats = [
  "apng",
  "png",
  "avif",
  "gif",
  "jpg",
  "jpeg",
  "jfif",
  "pjpeg",
  "pjp",
  "svg",
  "webp",
  "bmp",
  "tif",
  "tiff",
]

export const AdminNavLinks: NavLinkType[] = [
  {
    name: "Blog ",
    link: "/admin/blog",
    icon: LiaFileAlt,
  },
  {
    name: "Resume ",
    link: "/admin/resume",
    icon: LiaFileContractSolid,
  },
  {
    name: "Projects",
    link: "/admin/projects",
    icon: LiaFileCode,
  },
  {
    name: "Uploads",
    link: "/admin/uploads",
    icon: LiaFileUploadSolid,
  },
];

export const adminDashboardContent: DashboardPropsType = {
  icon: <LiaHomeSolid />,
  prefix: "Welcome Administrator",
  title: "Logged in as ",
  text: [
    "This admin panel helps users create, manage, store, and modify digital content like blog posts, resume list and files uploaded in AWS S3 Storage",
  ],
  links: [...AdminNavLinks],
};

export const resumeCategory = [
  "summary",
  "expertise",
  "experience",
  "education",
  "awards",
  "projects",
]