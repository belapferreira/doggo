import {
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretLeft,
  CaretRight,
} from '@phosphor-icons/react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  handlePageChange,
}: PaginationProps) => {
  return (
    <div className="ml-auto flex items-center gap-6">
      <span className="text-sm font-semibold text-neutral-700">
        {`Page ${currentPage + 1} of ${totalPages + 1}`}
      </span>

      <div className="flex items-center gap-2">
        <button
          onClick={() => handlePageChange(0)}
          disabled={currentPage === 0}
          className="rounded bg-neutral-500/80 p-2 text-white transition-colors duration-200 ease-in-out enabled:hover:bg-neutral-500/65 disabled:cursor-not-allowed disabled:bg-neutral-500/50"
        >
          <CaretDoubleLeft />
          <span className="sr-only">First page</span>
        </button>

        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="rounded bg-neutral-500/80 p-2 text-white transition-colors duration-200 ease-in-out enabled:hover:bg-neutral-500/65 disabled:cursor-not-allowed disabled:bg-neutral-500/50"
        >
          <CaretLeft />
          <span className="sr-only">Previous page</span>
        </button>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded bg-neutral-500/80 p-2 text-white transition-colors duration-200 ease-in-out enabled:hover:bg-neutral-500/65 disabled:cursor-not-allowed disabled:bg-neutral-500/50"
        >
          <CaretRight />
          <span className="sr-only">Next page</span>
        </button>

        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="rounded bg-neutral-500/80 p-2 text-white transition-colors duration-200 ease-in-out enabled:hover:bg-neutral-500/65 disabled:cursor-not-allowed disabled:bg-neutral-500/50"
        >
          <CaretDoubleRight />
          <span className="sr-only">Last page</span>
        </button>
      </div>
    </div>
  );
};
