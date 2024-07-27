
import { useEffect } from "react";
import TimeLineAccordian from "@/app/components/resume/TimeLineAccordian";
import { ResumeItemsPropsType } from "@/types/index";
interface titleStringType {
  title: string;
}
type Props = ResumeItemsPropsType & titleStringType;
function Experience({ content, title }: Props) {
  useEffect(() => {}, []);
  return <TimeLineAccordian content={content} title={title} />;
}

export default Experience;
