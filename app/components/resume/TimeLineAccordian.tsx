import { Timeline, Badge } from "flowbite-react";
import { Disclosure, DisclosureButton } from "@headlessui/react";

import { ResumeItemsPropsType } from "@/types/index";
interface titleStringType {
  title: string;
}
type Props = ResumeItemsPropsType & titleStringType;
import moment from "moment";
import Title from "./Title";
function TimeLineAccordian({ content, title }: Props) {
  return (
    <Timeline>
      {content.length &&
        content.map((item, indx) => (
          <Timeline.Item key={`summary-${indx}`}>
            <Timeline.Point />
            <Timeline.Content>
              <Timeline.Body>
                <Disclosure>
                  <DisclosureButton className="w-full py-2 text-left">
                    <Timeline.Time>
                      {item.startDate !== "current"
                        ? moment(item.startDate, "DD-MM-YYYY").format(
                            "MMM, YYYY"
                          )
                        : item.startDate}
                      {item.endDate ? " - " : ""}
                      {item.endDate && item.endDate !== "P"
                        ? moment(item.endDate, "DD-MM-YYYY").format("MMM, YYYY")
                        : ""}
                      {item.endDate && item.endDate === "P" ? "Present" : ""}{" "}
                    </Timeline.Time>
                    <Timeline.Title> {item.title}</Timeline.Title>
                    {item.company} {item.subtitle} {item.place}.
                  </DisclosureButton>
                  <Disclosure.Panel className="text-gray-500 text-gray-700 dark:text-gray-400">
                    <p className="pt-3 text-sm ">{item.description}</p>
                    {title === "experience" && (
                      <ul className="list-disc py-5 pl-5  text-sm ">
                        {item?.listing?.length &&
                          item.listing.map((ite, iy) => (
                            <li key={`Experience-item-${iy}`}>{ite} </li>
                          ))}
                      </ul>
                    )}
                    <p className="flex flex-wrap pt-2">
                      {title === "projects" &&
                        item?.listing?.length &&
                        item.listing.map((ite, iy) => (
                          <span
                            key={`${title}-item-${iy}`}
                            className="pb-2 pr-2"
                          >
                            <Badge color="gray"> {ite} </Badge>
                          </span>
                        ))}
                    </p>
                  </Disclosure.Panel>
                </Disclosure>
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
        ))}
    </Timeline>
  );
}

export default TimeLineAccordian;
