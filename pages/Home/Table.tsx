import { useState } from "react";
import useSWRInfinite from "swr/infinite";
import axios from "axios";

import { Row } from "./Row";
import { PageKeyConverter } from "./Utils";
import { Page, EventDto } from "../api/events";

export const Table: React.FC = () => {
  const [query, setQuery] = useState("");
  const converter = new PageKeyConverter("events?page=");

  const { data, error, size, setSize } = useSWRInfinite(
    (pageIndex: number, previousPage: Page<EventDto>) => {
      // TODO: handle last page
      return converter.toKey(pageIndex + 1);
    },
    async (key) => {
      const pageIndex = converter.toIndex(key);
      const response = await axios.get<Page<EventDto>>("api/events", {
        params: {
          page: pageIndex - 1,
          size: 10,
          query: query,
        },
      });

      return response.data;
    }
  );

  const events = data?.reduce<EventDto[]>(
    (acc, page) => acc.concat(page.items),
    []
  );

  return (
    <div className="shadow-xl rounded-xl w-3/4">
      <div className="flex justify-between items-center pb-4 ">
        <label className="sr-only">Search</label>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search-users"
            className="block p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for users"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full text-sm text-left bg-grey-500 text-gray-500 flex flex-row font-bold text-md bg-gray-200 uppercase text-gray-600">
        <div className="py-4 px-6 basis-5/12">Actor</div>
        <div className="py-4 px-6 basis-3/12">Action</div>
        <div className="py-4 px-6 basis-3/12">Date</div>
      </div>
      {events && events.map((e, i) => <Row key={`event-${i}`} row={e} />)}
      <button onClick={() => setSize(size + 1)}>Load More</button>
    </div>
  );
};
