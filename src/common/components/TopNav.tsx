//  ======================================== IMPORTS
import React from 'react';
import { Navbar } from 'react-bootstrap';
import Logo from 'common/components/Logo';
import Filters from 'features/main/Filters';
import SliderNav from './SliderNav';
import { useMediaQuery } from 'react-responsive';

//  ======================================== COMPONENT
const TopNav = ({ withMenu }: { withMenu?: boolean }) => {
	//  ======================================== HOOKS
	//  ======================================== STATE
	const [open, setOpen] = React.useState(false);
	//  ======================================== HANDLERS
	const handleToggleClick = () => setOpen((prev) => !prev);
	const isMd = useMediaQuery({ query: '(min-width: 720px)' });

	//  ======================================== EFFECTS
	//  ======================================== JSX
	return withMenu ? (
		<>
			<Navbar
				expand='md'
				className='justify-content-between justify-content-md-center border-bottom bg-light'
				fixed='top'
				variant='light'>
				<Navbar.Toggle onClick={handleToggleClick} />
				<Logo />
			</Navbar>
			{!isMd && (
				<SliderNav onClose={handleToggleClick} isOpen={open}>
					<Filters />
				</SliderNav>
			)}
		</>
	) : (
		<Navbar
			expand='md'
			className='justify-content-center border-bottom bg-light'
			fixed='top'
			variant='light'>
			<Logo />
		</Navbar>
	);
};

//  ======================================== EXPORTS
export default TopNav;
//  ========================================
