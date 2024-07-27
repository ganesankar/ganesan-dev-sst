// app/page.tsx

"use client";

import Hero from "@/app/components/home/hero";
import About from "@/app/components/home/about";
import Work from "@/app/components/home/work";
import Projects from "@/app/components/home/projects";
import Blog from "@/app/components/home/blog";
import {
  heroContent,
  aboutContent,
  workContent,
  projectContent,
  blogContent,
} from "@/app/util/content";

export default function Home() {
  return (
    <div>
      <Hero key="hero" {...heroContent} />
      <About key="about" {...aboutContent} />
      <Work key="work" {...workContent} />
      <Projects key="project" {...projectContent} />
      <Blog key="blog" {...blogContent} /> 
    </div>
  );
}
