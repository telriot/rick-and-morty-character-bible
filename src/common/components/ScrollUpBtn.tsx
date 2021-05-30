//  ======================================== IMPORTS
import { Button } from 'react-bootstrap';
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
        className={`position-fixed ${isVisible?'d-block':'d-none'}`}
        style={{ bottom: '6rem', right: '2rem', opacity:.85 }}>
            <Button
                onClick={onClick}
                variant={variant}
                aria-label='Back to top'
                size='sm'>
                <ChevronUp height='3rem' width='3rem' fill='#fff' />
            </Button>
    </div>
    )
}
 
//  ======================================== EXPORTS
export default ScrollUpBtn
//  ========================================