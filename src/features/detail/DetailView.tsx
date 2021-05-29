//  ======================================== IMPORTS
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getCharacterDetail,
	selectCharacter,
	selectAsyncStatus,
	selectEpisodes,
	selectAsyncError
} from './detailSlice';
import { Link, useParams } from 'react-router-dom';
import { Alert, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import TopNav from 'common/components/TopNav';
import FullSectionSpinner from 'common/components/FullSectionSpinner';

//  ======================================== COMPONENT
const DetailView = () => {
	//  ======================================== HOOKS
	const dispatch = useDispatch();
	const { id } = useParams() as { id: string };

	//  ======================================== STATE
	const asyncError = useSelector(selectAsyncError);
	const asyncStatus = useSelector(selectAsyncStatus);
	const character = useSelector(selectCharacter);
	const episodes = useSelector(selectEpisodes);

	//  ======================================== HANDLERS
	//  ======================================== EFFECTS
	React.useEffect(() => {
		id && dispatch(getCharacterDetail(id));
	}, [id]);
	//  ======================================== JSX
	return (
		<>
			<TopNav />
			<Container style={{ marginTop: '4rem' }}>
				{asyncError ? (
					<div className='pt-4'>
						<Alert className='w-100' variant='danger'>
							{asyncError}
						</Alert>
					</div>
				) : character &&
				  character.id === parseInt(id) &&
				  asyncStatus === 'fulfilled' ? (
					<>
						<Row className='py-4'>
							{/* LEFT COLUMN */}
							<Col md={3} className='flex-column'>
								<Link to='/'>
									<h6 className='mb-2'>&lsaquo; Back</h6>
								</Link>
								<div>
									<img
										className='h-100 w-100 mb-4 mb-md-0'
										src={character.image}
										alt='Character detail'
										style={{
											maxHeight: '16em',
											objectFit: 'contain'
										}}
									/>
								</div>
							</Col>
							{/* RIGHT COLUMN */}
							<Col md={9}>
								<h5 className='mb-3'>Character info</h5>
								<p>Id: {character.id}</p>
								<p>Name: {character.name}</p>
								<p>Status: {character.status}</p>
								<p>Specie: {character.species}</p>
								<p>Type: {character.type}</p>
								<p>Gender: {character.gender}</p>
								<p>Origin: {character.origin.name}</p>
								<p>Created: {character.created}</p>
							</Col>
						</Row>
						{/* BOTTOM SECTION */}
						<h5 className='mb-4'>Episodes info</h5>
						<Tabs className='mb-4'>
							{episodes?.map(
								({ id, name, air_date, episode }) => (
									<Tab
										eventKey={id}
										className='mb-4'
										title={`Ep. ${id}`}
										key={`episode-${id}`}>
										<div>
											<p>Id: {id}</p>
											<p>Name: {name}</p>
											<p>Air Date: {air_date}</p>
											<p>Episode: {episode}</p>
										</div>
									</Tab>
								)
							)}
						</Tabs>
					</>
				) : (
					<FullSectionSpinner />
				)}
			</Container>
		</>
	);
};

//  ======================================== EXPORTS
export default DetailView;
//  ========================================
