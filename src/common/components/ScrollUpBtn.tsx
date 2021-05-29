//  ======================================== IMPORTS
import { Button, Fade } from 'react-bootstrap';
import { ReactComponent as ChevronUp } from 'assets/chevron-up.svg';
import { Variant } from 'react-bootstrap/esm/types';

//  ======================================== COMPONENT
interface ScrollUpBtnProps {
    isVisible: boolean
    onClick: () => void
    variant?: Variant
}
const ScrollUpBtn = ({isVisible, onClick, variant='primary'} : ScrollUpBtnProps) => {
    //  ======================================== HOOKS
    //  ======================================== STATE
    //  ======================================== HANDLERS
    //  ======================================== EFFECTS
    //  ======================================== JSX
    return (
        <div
        className='position-fixed'
        style={{ bottom: '6rem', right: '2rem' }}>
        <Fade in={isVisible}>
            <Button
                onClick={onClick}
                variant={variant}
                aria-label='Back to top'>
                <ChevronUp height='3rem' width='3rem' fill='#fff' />
            </Button>
        </Fade>
    </div>
    )
}
 
//  ======================================== EXPORTS
export default ScrollUpBtn
//  ========================================