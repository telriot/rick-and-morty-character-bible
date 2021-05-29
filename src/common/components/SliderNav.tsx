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
				background: `${isOpen ? 'rgba(0,0,0,.3)' : 'transparent'}`,
				//@ts-ignore
				pointerEvents: `${isOpen ? 'auto' : 'none'}`,
				transition: 'background .3s',
				zIndex: 1000
			}}>
			<div
				className='h-100 px-2 py-3 bg-dark flex-grow-1'
				style={{
					transform: `translateX(${isOpen ? '0%' : '-100%'})`,
					transition: 'transform .3s'
				}}>
				{children}
			</div>
			<div
				className='h-100 px-2 py-3'
				style={{
					width: '4rem',
					height: '4rem',
					opacity: `${isOpen ? 1 : 0}`,
					transform: `translateX(${isOpen ? '0%' : '100%'})`,
					transition: 'transform .3s, opacity .3s'
				}}>
				<CloseIcon
					height='3rem'
					width='3rem'
					fill='#111'
					onClick={onClose}
				/>
			</div>
		</div>
	);
};

//  ======================================== EXPORTS
export default SliderNav;
//  ========================================
