
  
  export interface PostItem {
    slug: string;
    title: string;
    img: string;
    content: string;
    createdOn?: string;
    updatedOn?: string;
    publishedOn: any;
    isPublished: number;
    tags?: string[];
  };

  export interface UploadItem {
    name: string;
    modified: string; 
    url: string; 
    fileType: string; 
  };

  
  export interface ProjectItem {
    slug: string;
    title: string;
    content: string;
    createdOn?: string;
    updatedOn?: string;
    isPublished: number;
    github: string;
    demo: string;
  };

  export interface ResumeItem {
    id: string;
    title: string;
    subtitle: string;
    category: string;
    description?: string;
    isPublished: number;
    startDate: string;
    endDate: string;
    listing?: string[];
    place?: string;
    createdOn?: string;
    updatedOn?: string;
  };