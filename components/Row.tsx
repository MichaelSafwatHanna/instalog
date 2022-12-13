import { useState } from "react";

import { DetailedRowContent } from "./DetailedRowContent";
import { SimpleRowContent } from "./SimpleRowContent";
import { useClickOutside } from "../lib/hooks";
import { EventDto } from "../pages/api/events";

export type RowProps = {
  row: EventDto;
};

export const Row: React.FC<RowProps> = ({ row }: RowProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const clickOutsideRef = useClickOutside(() => setShowDetails(false));

  return showDetails ? (
    <div
      ref={clickOutsideRef}
      className="bg-white rounded-lg hover:bg-gray-50 w-3/2 ring-offset-2 ring-2 scale-105 ease-out duration-500 shadow-xl"
    >
      <DetailedRowContent row={row} />
    </div>
  ) : (
    <div className="ease-in duration-500">
      <SimpleRowContent
        action={row.name}
        actor={row.createdBy.name}
        date={row.createdAt}
        onShowDetails={() => setShowDetails(true)}
      />
    </div>
  );
};

export default Row;