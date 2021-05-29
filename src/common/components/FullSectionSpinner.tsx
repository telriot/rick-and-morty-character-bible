//  ======================================== IMPORTS
import { Spinner } from 'react-bootstrap';
import { Variant } from 'react-bootstrap/esm/types';
//  ======================================== COMPONENT
interface FullSectionSpinnerProps {
    size?:string
    variant?: Variant
}
const FullSectionSpinner = ({size = '12vh', variant = 'primary'}:FullSectionSpinnerProps) => {
	//  ======================================== HOOKS
	//  ======================================== STATE
	//  ======================================== HANDLERS
	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<div
			className='d-flex align-items-center justify-content-center'
			style={{ height: '75vh' }}>
			<Spinner
				animation='border'
				variant={variant}
				style={{ height: size, width: size }}
			/>
		</div>
	);
};

//  ======================================== EXPORTS
export default FullSectionSpinner;
//  ========================================
