import { Avatar } from "./Avatar";

interface RowProps {
  actor: string;
  action: string;
  date: Date;
}

export const Row: React.FC<RowProps> = ({ action, actor, date }: RowProps) => {
  return (
    <tr className="bg-white hover:bg-gray-50">
      <th
        scope="row"
        className="flex items-center py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
      >
        <Avatar initials={actor.substring(0, 2)} />
        <div className="pl-3">
          <div className="text-base font-semibold">{actor}</div>
        </div>
      </th>
      <td className="py-4 px-6">{action}</td>
      <td className="py-4 px-6">
        <div className="flex items-center">{date.toLocaleDateString()}</div>
      </td>
      <td>
        <svg
          className="w-10 h-10 text-gray-200"
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
      </td>
    </tr>
  );
};
