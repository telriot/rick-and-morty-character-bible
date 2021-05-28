//  ======================================== IMPORTS
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    currentPageSet,
	getCharacters,
    selectAsyncStatus,
	selectCharacters,
	selectCurrentPage,
    selectFilters,
    selectPages
} from './mainSlice';
import CharacterCard from 'features/main/CharacterCard'
import Pagination from 'common/components/Pagination'
import FilterSection from 'features/main/FilterSection'
//  ======================================== COMPONENT
const MainView = () => {
	//  ======================================== HOOKS
	const dispatch = useDispatch();

	//  ======================================== STATE
    const asyncStatus = useSelector(selectAsyncStatus)
    const currentPage = useSelector(selectCurrentPage);
	const characters = useSelector(selectCharacters);
    const pages = useSelector(selectPages);
    const {name, gender, status} = useSelector(selectFilters)
	//  ======================================== HANDLERS
    const handleSetPage = (page:number) => dispatch(currentPageSet(page))
	//  ======================================== EFFECTS
	React.useEffect(() => {
        console.log('ran')
		dispatch(getCharacters());
	}, [currentPage, name, gender, status]);
	//  ======================================== JSX
	return (
		<Container>
            <Row>
                <Col xs={12} md={4}>
                    <FilterSection/>
                </Col>
                <Col xs={12} md={8}>
                <Row>
				{characters.map(character => 
					<Col key={character.id} xs={12} sm={6} lg={3} className='p-2'>
						<CharacterCard character={character}/>
					</Col>
				)}
			</Row>
            <div className='d-flex justify-content-end'>

            <Pagination currentPage={currentPage} pages={pages} setCurrent={handleSetPage} disabled={asyncStatus === 'pending'}/>
            </div>
                </Col>
            </Row>

		</Container>
	);
};

//  ======================================== EXPORTS
export default MainView;
//  ========================================
