import React from "react";
import { useSearchParams } from "react-router-dom";

type PaginationPageProps = {
  totalPages: number;
  pageNumber: number;
};

const Pagination = ({ totalPages, pageNumber }: PaginationPageProps) => {
  const [, setSearchParams] = useSearchParams();

  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show before and after current page
    const pages = [];

    // Always add page 1
    pages.push(1);

    // Calculate range around current page
    let rangeStart = Math.max(2, pageNumber - delta);
    let rangeEnd = Math.min(totalPages - 1, pageNumber + delta);

    // Add ellipsis after page 1 if needed
    if (rangeStart > 2) {
      pages.push("ellipsis1");
    }

    // Add pages around current page
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (rangeEnd < totalPages - 1) {
      pages.push("ellipsis2");
    }

    // Always add last page if not already included
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  const visiblePages = getVisiblePages();

  return (
    <>
      <div className="my-4 flex items-center justify-center space-x-2">
        {pageNumber > 1 && (
          <button
            onClick={() => handlePageChange(pageNumber - 1)}
            className="rounded border px-3 py-1 hover:bg-gray-100"
          >
            Previous
          </button>
        )}

        <div className="flex space-x-1">
          {visiblePages.map((page, index) => (
            <React.Fragment key={index}>
              {page === "ellipsis1" || page === "ellipsis2" ? (
                <span className="px-2 py-1">...</span>
              ) : (
                <button
                  onClick={() => handlePageChange(Number(page))}
                  className={`px-3 py-1 border rounded ${
                    page === pageNumber
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        {pageNumber < totalPages && (
          <button
            onClick={() => handlePageChange(pageNumber + 1)}
            className="rounded border px-3 py-1 hover:bg-gray-100"
          >
            Next
          </button>
        )}
      </div>
    </>
  );
};

export default Pagination;
