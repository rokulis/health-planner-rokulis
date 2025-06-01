import React from 'react';

import cx from 'classnames';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/commons/components/ui/button';

interface DataTablePaginationProps {
  table: any;
}

export function DataTablePagination({ table }: DataTablePaginationProps) {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();

  // Generate page numbers to display
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="flex w-full items-center justify-center px-2 mt-12">
      <div className="flex gap-2">
        <Button
          variant="ghost"
          className="h-10 w-10 p-0 border border-black/50 rounded-md text-black/40"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeft className="h-2 w-2" />
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1 mx-6">
          {getPageNumbers().map((pageNumber, index) => (
            <React.Fragment key={index}>
              {pageNumber === '...' ? (
                <span className="flex h-10 w-10 items-center justify-center text-sm">
                  ...
                </span>
              ) : (
                <Button
                  variant="ghost"
                  className={cx('h-10 w-10 p-0 hover:bg-primary/20', {
                    'bg-primary/20': currentPage === pageNumber,
                  })}
                  onClick={() => table.setPageIndex(Number(pageNumber) - 1)}
                >
                  {pageNumber}
                </Button>
              )}
            </React.Fragment>
          ))}
        </div>

        <Button
          variant="ghost"
          className="h-10 w-10 p-0 border border-black/50 rounded-md text-black/40"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRight className="h-2 w-2" />
        </Button>
      </div>
    </div>
  );
}
