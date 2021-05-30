//  ======================================== IMPORTS
import { ReactComponent as CloseIcon } from 'assets/close-icon.svg';

//  ======================================== COMPONENT
interface SliderNavProps {
	children: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
}
const SliderNav = ({ children, isOpen, onClose }: SliderNavProps) => {
	//  ======================================== HOOKS
	//  ======================================== STATE
	//  ======================================== HANDLERS
	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<div
			className='position-fixed d-flex d-md-none h-100 w-100'
			style={{
				top: '4rem',
				left: 0,
				background: `${isOpen ? 'rgba(0,0,0,.2)' : 'transparent'}`,
				//@ts-ignore
				pointerEvents: `${isOpen ? 'auto' : 'none'}`,
				transition: 'background .3s',
				zIndex: 1000
			}}>
			<div
				className='h-100 px-2 py-3 bg-light flex-grow-1'
				style={{
					transform: `translateX(${isOpen ? '0%' : '-100%'})`,
					transition: 'transform .3s'
				}}>
				{children}
			</div>
			<div
				className='h-100 px-2 py-3'
				style={{
					width: '4.5rem',
					opacity: `${isOpen ? 1 : 0}`,
					transform: `translateX(${isOpen ? '0%' : '100%'})`,
					transition: 'transform .3s, opacity .3s'
				}}>
					<div className='bg-light p-1 rounded d-flex align-items-center justify-content-center'>
					<CloseIcon
					height='3rem'
					width='3rem'
					fill='#555'
					onClick={onClose}
				/>
					</div>

			</div>
		</div>
	);
};

//  ======================================== EXPORTS
export default SliderNav;
//  ========================================
