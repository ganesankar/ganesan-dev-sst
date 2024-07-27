/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import moment from "moment";
import { ResumeItem2PropsType } from "@/types/index";
function Title({ item }: ResumeItem2PropsType) {
  return (
    <div className="flex items-center space-x-4">
      <div className="min-w-0 flex-1 text-left">
        <p
          className="truncate text-sm font-medium   bg-transparent
       text-blue-600 dark:text-blue-500 hover:underline"
        >
          {item.title}
        </p>
        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
          {item.company} {item.subtitle}
        </p>
      </div>
      <div className="items-right text-right text-base text-gray-900 dark:text-white">
        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
          {item.startDate !== "current"
            ? moment(item.startDate, "DD-MM-YYYY").format("MMM, YYYY")
            : item.startDate}
          {item.endDate ? " - " : ""}
          {item.endDate && item.endDate !== "P"
            ? moment(item.endDate, "DD-MM-YYYY").format("MMM, YYYY")
            : ""}
          {item.endDate && item.endDate === "P" ? "Present" : ""}{" "}
        </p>
        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
          {item.place}
        </p>
      </div>
    </div>
  );
}

export default Title;
