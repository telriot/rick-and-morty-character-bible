//  ======================================== IMPORTS
import { Pagination as BSPagination } from 'react-bootstrap';
import usePagination from 'common/hooks/usePagination';

//  ======================================== COMPONENT
interface PaginationProps {
	currentPage: number;
	disabled?: boolean;
	maxPages?: number;
	pages: number;
	size?: 'sm' | 'lg'
	setCurrent: (page: number) => void;
}
const Pagination = ({
	currentPage,
	disabled = false,
	maxPages = 5,
	pages,
	setCurrent,
	size
}: PaginationProps) => {
	//  ======================================== HOOKS
	//  ======================================== STATE

	const {
		pageIndexes,
		showFirst,
		showLast,
		showStartEllipsis,
		showEndEllipsis
	} = usePagination(currentPage, pages, maxPages);

	//  ======================================== HANDLERS
	const handlePageClick = (page: number) => {
		setCurrent(page);
	};
	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<BSPagination size={size}>
			{currentPage !== 1 && (
				<BSPagination.Prev
					disabled={disabled}
					onClick={() =>
						handlePageClick(Math.max(1, currentPage - 1))
					}
				/>
			)}
			{showFirst && (
				<BSPagination.Item
					disabled={disabled}
					onClick={() => handlePageClick(1)}>
					{1}
				</BSPagination.Item>
			)}
			{showStartEllipsis && <BSPagination.Ellipsis />}

			{pageIndexes.map((page) => (
				<BSPagination.Item
					key={`pagination-${page}`}
					disabled={disabled && page !==currentPage}
					onClick={() => handlePageClick(page)}
					active={page === currentPage}>
					{page}
				</BSPagination.Item>
			))}

			{showEndEllipsis && <BSPagination.Ellipsis />}
			{showLast && (
				<BSPagination.Item
					disabled={disabled}
					onClick={() => handlePageClick(pages)}>
					{pages}
				</BSPagination.Item>
			)}
			{currentPage !== pages && (
				<BSPagination.Next
					onClick={() =>
						handlePageClick(Math.min(pages, currentPage + 1))
					}
				/>
			)}
		</BSPagination>
	);
};

//  ======================================== EXPORTS
export default Pagination;
//  ========================================
