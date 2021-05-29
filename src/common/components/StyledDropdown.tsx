//  ======================================== IMPORTS
import { Dropdown } from 'react-bootstrap';
import capitalize from 'common/utils/capitalize'

//  ======================================== COMPONENT
interface StyledDropdownProps {
	children: React.ReactNode;
	title: string;
	id: string;
}

const StyledDropdown = ({ children, title, id }: StyledDropdownProps) => {
	return (
		<Dropdown className='mb-3'>
			<Dropdown.Toggle
				variant='light'
				className='d-flex justify-content-between align-items-center'
				block
				id={id}>
				{capitalize(title)}
			</Dropdown.Toggle>
			<Dropdown.Menu className='w-100'>{children}</Dropdown.Menu>
		</Dropdown>
	);
};
 
//  ======================================== EXPORTS
export default StyledDropdown
//  ========================================