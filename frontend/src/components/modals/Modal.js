import { useEffect, useRef, useState } from 'react'
import { MODAL } from '../../constants/constants';
import useOutsideAlerter from '../../hooks/useOutsideAlerter'
import SignIn from './SignIn'
import SignUp from './SignUp';

const Modal = ({ modalState, type }) => {
    const wrapperRef = useRef(null);
    const [openModal, setOpenModal] = modalState
    const [modalType, setModalType] = useState(type)
    console.log(modalType)

    const handleClick = () => setOpenModal(false)

    useOutsideAlerter(wrapperRef, handleClick);

    useEffect(() => {

        if (openModal) {
            document.body.style.overflow = 'hidden'
        } else {
            setModalType(type)
        }
        return () => document.body.style.overflow = 'unset'
    }, [openModal])


    let content
    if (modalType === MODAL.TYPE.SignIn) {
        content = <SignIn modalState={[openModal, setOpenModal]} setType={setModalType} />
    }
    else if (modalType === MODAL.TYPE.SignUp) {
        content = <SignUp modalState={[openModal, setOpenModal]} setType={setModalType} />
    }
        

    return (
        <div className={`modal__container ${openModal?'modal-open':''}`}>
            <section  ref={wrapperRef} className="modal">
                <button className='modal-close' onClick={() => setOpenModal(false)}>
                    x
                </button>
                {content}
            </section>
        </div>
    )
}

export default Modal