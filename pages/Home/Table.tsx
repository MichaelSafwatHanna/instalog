import { useEffect } from "react";
import useSWRInfinite from "swr/infinite";
import axios from "axios";
import { useRouter } from "next/router";

import { Row } from "./Row";
import { PageKeyConverter } from "./Utils";
import { Page, EventDto } from "../api/events";
import { RowSkeleton } from "./RowSkeleton";
import { useDebouncedState } from "../../lib/hooks";

export const Table: React.FC = () => {
  const PAGE_SIZE = 5;
  const router = useRouter();
  const { tenant } = router.query;

  const [query, setQuery] = useDebouncedState("", 500);

  useEffect(() => {
    setSize(1);
  }, [query]);

  const converter = new PageKeyConverter(
    `events?tenant=${tenant}&query=${query}&page=`
  );

  const { data, size, isLoading, setSize } = useSWRInfinite(
    (pageIndex: number, previousPage: Page<EventDto>) => {
      if (previousPage && pageIndex * PAGE_SIZE >= previousPage.total) {
        return null;
      }

      return converter.toKey(pageIndex + 1);
    },
    async (key) => {
      const pageIndex = converter.toIndex(key);
      const response = await axios.get<Page<EventDto>>("api/events", {
        params: {
          page: pageIndex - 1,
          size: PAGE_SIZE,
          query: query === "" ? undefined : query,
          tenant,
        },
      });

      return response.data;
    },
    { revalidateFirstPage: false }
  );

  const events = data?.reduce<EventDto[]>(
    (acc, page) => acc.concat(page.items),
    []
  );

  const hasMoreData = data && events && data[0].total > events.length;

  return (
    <div className="shadow-xl rounded-xl w-3/4 bg-gray-100">
      <div className="flex justify-between items-center py-3 px-3">
        <label className="sr-only">Search</label>
        <div className="relative w-full">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
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
            className="w-full p-2 pl-10 text-sm text-gray-700 bg-gray-100 rounded-lg border border-gray-300"
            placeholder="Search for users"
            onChange={(e) => {
              if (e.target.value !== query) {
                setQuery(e.target.value);
              }
            }}
          />
        </div>
      </div>
      <div className="w-full text-sm text-left text-gray-500 flex flex-row font-bold text-md bg-gray-100 uppercase text-gray-600">
        <div className="py-4 px-6 basis-5/12">Actor</div>
        <div className="py-4 px-6 basis-3/12">Action</div>
        <div className="py-4 px-6 basis-3/12">Date</div>
      </div>
      {isLoading &&
        Array.from({ length: 3 }, (_, i) => <RowSkeleton key={i} />)}
      {events && events.map((e, i) => <Row key={`event-${i}`} row={e} />)}
      <div className={`flex flex-row bg-gray-100 justify-center w-full py-3 font-bold ${hasMoreData? 'text-gray-600' : 'text-gray-300'}`}>
        <button onClick={() => setSize(size + 1)} disabled={!hasMoreData}>Load More</button>
      </div>
    </div>
  );
};
