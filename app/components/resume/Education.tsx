
import { useEffect } from "react";
import TimeLineItem from "@/app/components/resume/TimeLineItem";
import { ResumeItemsPropsType } from "@/types/index";
function Education({ content }: ResumeItemsPropsType) {
  useEffect(() => {}, []);
  return <TimeLineItem content={content} />;
}

export default Education;
