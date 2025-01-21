import { Pagination } from "@/components";
import { useGetPropertyPublicViewSelector, useScrollToTop } from "@/hooks";
import { useState } from "react";
import { CardSection } from "../Home/sections/CardSection/CardSection";
import { AllFilters } from "./AllFilters";
const Search = () => {
  useScrollToTop();
  const { loading, data } = useGetPropertyPublicViewSelector();

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const handlePageChange = (page) => setCurrentPage(page);

  const paginatedData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="flex justify-center items-center">
      <div className="space-y-5 w-full max-w-[1440px] px-2 md:px-6">
        <AllFilters />
        <CardSection loading={loading} data={paginatedData} />
        {data.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalItems={data.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};
export default Search;
