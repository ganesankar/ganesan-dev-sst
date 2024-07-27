
import { ResumeItemsPropsType } from "@/types/index";
// eslint-disable-next-line react/prop-types
function Summary({ content }: ResumeItemsPropsType) {

  return (
    <ul className="mb-3 list-disc  pl-5 font-normal text-gray-700 dark:text-gray-400">
      {content.length &&
        content.map((ite, indx) => (
          <li key={`summary-${indx}`} className="pb-2">
            {ite.description}
          </li>
        ))}
    </ul>
  );
}

export default Summary;
