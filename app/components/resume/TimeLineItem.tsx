/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { Timeline } from "flowbite-react";
import moment from "moment";
import { ResumeItemsPropsType } from "@/types/index";
function TimeLineItem({ content }: ResumeItemsPropsType) {
  return (
    <Timeline>
      {content.length &&
        content.map((item, indx) => (
          <Timeline.Item key={`summary-${indx}`}>
            <Timeline.Point />
            <Timeline.Content>
              <Timeline.Time>
                {item.startDate !== "current"
                  ? moment(item.startDate).format("MMM, YYYY")
                  : item.startDate}
                {item.endDate ? " - " : ""}
                {item.endDate && item.endDate !== "P"
                  ? moment(item.endDate).format("MMM, YYYY")
                  : ""}
                {item.endDate && item.endDate === "P" ? "Present" : ""}{" "}
              </Timeline.Time>

              <Timeline.Title> {item.title}</Timeline.Title>
              <Timeline.Body>
                {item.company} {item.subtitle}, {item.place}.
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
        ))}
    </Timeline>
  );
}

export default TimeLineItem;
