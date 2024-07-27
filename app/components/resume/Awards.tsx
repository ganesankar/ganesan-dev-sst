
import TimeLineItem from "@/app/components/resume/TimeLineItem";
import { ResumeItemsPropsType } from "@/types/index";
function Awards({ content }: ResumeItemsPropsType) {
  return (
    <TimeLineItem content={content} />
  );
}

export default Awards;
