//  ======================================== IMPORTS
import React from 'react';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
	currentPageSet,
	getCharacters,
	selectAsyncError,
	selectAsyncStatus,
	selectCharacters,
	selectCurrentPage,
	selectFilters,
	selectPages
} from './mainSlice';
import CharacterCard from 'features/main/CharacterCard';
import LoadingOverlay from 'common/components/LoadingOverlay';
import Pagination from 'common/components/Pagination';
import TopNav from 'common/components/TopNav';
import ScrollUpBtn from 'common/components/ScrollUpBtn';
import Sidebar from 'common/components/Sidebar';
import { useDebounce } from 'use-debounce';
import { useMediaQuery } from 'react-responsive';
import useScrollPosition from '@react-hook/window-scroll';
//  ======================================== COMPONENT
const MainView = () => {
	//  ======================================== STATE
	const [showScrollUpBtn, setShowScrollUpBtn] = React.useState(false);
	const asyncError = useSelector(selectAsyncError);
	const asyncStatus = useSelector(selectAsyncStatus);
	const characters = useSelector(selectCharacters);
	const currentPage = useSelector(selectCurrentPage);
	const isLoading = asyncStatus === 'pending';
	const { name, gender, status } = useSelector(selectFilters);
	const pages = useSelector(selectPages);
	const [debouncedName] = useDebounce(name, 300);

	//  ======================================== HOOKS
	const isMd = useMediaQuery({ query: '(min-width: 720px)' });
	const dispatch = useDispatch();
	const scrollY = useScrollPosition();
	console.log(isMd);
	//  ======================================== HANDLERS
	const handleSetPage = (page: number) => {
		dispatch(currentPageSet(page));
		dispatch(getCharacters());
	};
	const handleScrollToTop = () =>
		window.scrollTo({ top: 0, behavior: 'smooth' });

	//  ======================================== EFFECTS
	React.useEffect(() => {
		dispatch(currentPageSet(1));
		dispatch(getCharacters());
	}, [debouncedName, dispatch, gender, status]);

	React.useEffect(() => {
		const isFarFromTop = scrollY > 700;
		if (isFarFromTop === showScrollUpBtn) return;
		if (isFarFromTop !== showScrollUpBtn) setShowScrollUpBtn(isFarFromTop);
	}, [scrollY, showScrollUpBtn]);

	//  ======================================== JSX
	return (
		<>
			<TopNav withMenu />
			<Container as='main' style={{ marginTop: '4rem' }}>
				<Row className='py-4'>
					{/* LEFT COLUMN */}
					{isMd && (
						<Col className='d-none d-md-flex' xs={12} md={3}>
							<Sidebar />
						</Col>
					)}
					{/* RIGHT COLUMN */}
					<Col xs={12} md={9}>
						<Row className='position-relative mb-2'>
							{asyncError ? (
								<Alert className='flex-grow-1' variant='danger'>
									{asyncError}
								</Alert>
							) : characters.length ? (
								characters.map((character) => (
									<Col
										key={character.id}
										xs={12}
										sm={6}
										lg={3}
										className='px-2 pb-2'>
										<CharacterCard character={character} />
									</Col>
								))
							) : (
								<div>No matching results</div>
							)}
							{isLoading && <LoadingOverlay />}
						</Row>
						<div className='d-flex justify-content-end'>
							{pages > 1 && (
								<Pagination
									currentPage={currentPage}
									pages={pages}
									setCurrent={handleSetPage}
									disabled={asyncStatus === 'pending'}
									maxPages={isMd ? 5 : 3}
									size={!isMd ? 'sm' : undefined}
								/>
							)}
						</div>
					</Col>
				</Row>
			</Container>
			<ScrollUpBtn
				variant='primary'
				isVisible={showScrollUpBtn}
				onClick={handleScrollToTop}
			/>
		</>
	);
};

//  ======================================== EXPORTS
export default MainView;
//  ========================================
