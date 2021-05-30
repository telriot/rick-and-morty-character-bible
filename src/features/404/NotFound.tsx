//  ======================================== IMPORTS
import { Alert, Container } from 'react-bootstrap';
import BackLink from 'common/components/BackLink';
import TopNav from 'common/components/TopNav';
//  ======================================== COMPONENT
const NotFound = () => {
	//  ======================================== HOOKS
	//  ======================================== STATE
	//  ======================================== HANDLERS
	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<>
			<TopNav />
			<Container as='main' style={{ marginTop: '4rem' }}>
				<div className='py-4'>
					<Alert className='w-100' variant='danger'>
						Sorry, the requested page could not be found.
					</Alert>
					<BackLink />
				</div>
			</Container>
		</>
	);
};

//  ======================================== EXPORTS
export default NotFound;
//  ========================================
