import { EventDto } from "../api/events";

type DetailedRowContentProps = {
  row: EventDto;
};

export const DetailedRowContent: React.FC<DetailedRowContentProps> = ({
  row,
}) => {
  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      <div className="basis-1/4">
        <div className="font-semibold text-md uppercase text-gray-600">
          Actor
        </div>
        <table className="mt-2">
          <tbody>
            <tr>
              <td className="uppercase text-gray-600 pr-8">Name</td>
              <td>{row.createdBy.name}</td>
            </tr>
            <tr>
              <td className="uppercase text-gray-600 pr-8">Email</td>
              <td>{row.createdBy.email}</td>
            </tr>
            <tr>
              <td className="uppercase text-gray-600 pr-8">Id</td>
              <td>{row.createdBy.id}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="basis-1/4">
        <div className="font-semibold text-md uppercase text-gray-600">
          Action
        </div>
        <table className="mt-2">
          <tbody>
            <tr>
              <td className="uppercase text-gray-600 pr-8">Name</td>
              <td>{row.name}</td>
            </tr>
            <tr>
              <td className="uppercase text-gray-600 pr-8">Description</td>
              <td>{row.description}</td>
            </tr>
            <tr>
              <td className="uppercase text-gray-600 pr-8">Id</td>
              <td>{row.id}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="basis-1/4">
        <div className="font-semibold text-md uppercase text-gray-600">
          Date
        </div>
        <table className="mt-2">
          <tbody>
            <tr>
              <td className="uppercase text-gray-600 pr-8">Readable</td>
              <td>
                {new Date(row.createdAt).toLocaleString(undefined, {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="basis-1/4">
        <div className="font-semibold text-md uppercase text-gray-600">
          Metadata
        </div>
        <table className="mt-2">
          <tbody>
            <tr>
              <td className="uppercase text-gray-600 pr-8">Location</td>
              <td>
                {row.location}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="basis-1/4">
        <div className="font-semibold text-md uppercase text-gray-600">
          Target
        </div>
      </div>
    </div>
  );
};
