import React from 'react';

/**
 * 
 * @param currentPage the page currently displayed
 * @param pages the number of pages available server side
 * @param maxPages the max number of boxes to display in the center section of the pagination
 */
const usePagination = (
	currentPage: number,
	pages: number,
	maxPages: number
) => {
	const [pageIndexes, setPageIndexes] = React.useState<number[]>([]);
	const [showFirst, setShowFirst] = React.useState(false);
	const [showLast, setShowLast] = React.useState(false);
	const [showStartEllipsis, setShowStartEllipsis] = React.useState(false);
	const [showEndEllipsis, setShowEndEllipsis] = React.useState(false);

	React.useEffect(() => {
		const maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
		const maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
		const minPage = Math.max(1, currentPage - maxPagesBeforeCurrentPage);
		const maxPage = Math.min(pages, currentPage + maxPagesAfterCurrentPage);

		setShowFirst(currentPage - maxPagesBeforeCurrentPage > 1);
		setShowLast(currentPage + maxPagesAfterCurrentPage < pages);
		setShowStartEllipsis(currentPage - maxPagesBeforeCurrentPage > 2);
		setShowEndEllipsis(currentPage + maxPagesAfterCurrentPage < pages - 1);
		const indexes: number[] = [];
		for (let i = minPage; i <= maxPage; i++) {
			indexes.push(i);
		}
		setPageIndexes(indexes);
	}, [currentPage, pages, maxPages]);


	return {
		pageIndexes,
		showFirst,
		showLast,
		showStartEllipsis,
		showEndEllipsis
	};
};

export default usePagination