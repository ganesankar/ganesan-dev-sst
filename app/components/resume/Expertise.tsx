
import { ResumeItemsPropsType } from "@/types/index";
function Expertise({ content }: ResumeItemsPropsType) {

  return (
    <ul className="mb-3 list-disc pl-5  font-normal text-gray-700 dark:text-gray-400">
      {content?.length &&
        content.map((ite, indx) => (
          <li key={`expertise-${indx}`} className="m-2 min-w-0">
            <strong className="font-medium"> {ite.title} : </strong>

            {ite?.listing?.length &&
              ite.listing.map((item, index) => (
                <span key={`expertise-${indx}-${index}`}>{item}; </span>
              ))}
          </li>
        ))}
    </ul>
  );
}

export default Expertise;
