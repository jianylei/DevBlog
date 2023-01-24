import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setOpen, selectCurrentType, selectCurrentOpen } from '../modalSlice';
import { MODAL } from '../../../constants/constants';
import useOutsideAlerter from '../../../hooks/useOutsideAlerter'
import SignIn from '../../auth/components/signin/SignIn'
import SignUp from '../../users/components/SignUp';

const Modal = () => {
    const wrapperRef = useRef(null);

    const dispatch = useDispatch()

    const currType = useSelector(selectCurrentType)
    const currOpen = useSelector(selectCurrentOpen)

    useEffect(() => {
        if (currOpen) {
            document.body.style.overflow = 'hidden'
        } 
        return () => document.body.style.overflow = 'unset'
    }, [currOpen])

    const handleClick = () => dispatch(setOpen({ open: false }))

    useOutsideAlerter(wrapperRef, handleClick);

    let content
    
    if (currType === MODAL.TYPE.SignIn) {
        content = <SignIn />
    }
    else if (currType === MODAL.TYPE.SignUp) {
        content = <SignUp />
    }

    return (
        <div className={`modal__container ${currOpen?'modal-open':''}`}>
            <section  ref={wrapperRef} className="modal">
                <button className='modal-close' onClick={() => dispatch(setOpen({ open: false }))}>
                    x
                </button>
                {content}
            </section>
        </div>
    )
}

export default Modal