import { FC } from 'react';
import Button from '../common/Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="outline"
        size="sm"
      >
        Previous
      </Button>

      <div className="flex space-x-2">
        {pages.map(page => (
          <Button
            key={page}
            onClick={() => onPageChange(page)}
            variant={currentPage === page ? 'primary' : 'outline'}
            size="sm"
          >
            {page}
          </Button>
        ))}
      </div>

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="outline"
        size="sm"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;

