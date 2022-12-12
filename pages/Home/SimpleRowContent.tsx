import { Avatar } from "./Avatar";

export type SimpleRowContentProps = {
  actor: string;
  action: string;
  date: Date;
  onShowDetails: () => void;
};

export const SimpleRowContent: React.FC<SimpleRowContentProps> = ({
  action,
  actor,
  date,
  onShowDetails,
}) => {
  return (
    <div className="bg-white flex flex-row hover:bg-gray-50 w-3/2 p-4">
      <div className="flex flex-row items-center basis-5/12">
        <Avatar initials={actor.substring(0, 2)} />
        <div className="pl-3">
          <div className="text-base font-semibold">{actor}</div>
        </div>
      </div>
      <div className="py-4 px-6 basis-3/12">{action}</div>
      <div className="py-4 px-6 basis-3/12">
        {new Date(date).toLocaleString(undefined, {
          day: "2-digit",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
      <div className="flex basis-1/12 items-center justify-end mr-8" onClick={onShowDetails}>
        <svg
          className="w-5 h-5 text-gray-200"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 12 12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M.822 9.574a.75.75 0 0 1-.529-1.281l3.468-3.469L.293 1.355A.75.75 0 1 1 1.354.293l4 4a.751.751 0 0 1 0 1.062l-4 4a.753.753 0 0 1-.532.219z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
    </div>
  );
};
