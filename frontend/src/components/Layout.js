import { Outlet, Link } from 'react-router-dom'
import { useEffect, useState } from "react"
import Modal from './modals/Modal'
import { MODAL } from '../constants/constants'

const Layout = () => {
    const [show, setShow] = useState(false)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [openModal, setOpenModal] = useState(false)
  
    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== 'undefined') { 
              if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
                setShow(false)
              } else { // if scroll up show the navbar
                if (window.scrollY > 104) {
                  setShow(true)
                }
              }
              setLastScrollY(window.scrollY)
            }
          }
  
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar)

            return () => {
                window.removeEventListener('scroll', controlNavbar)
            }
        }
    }, [lastScrollY])

    return (
        <>
            <Modal modalState={[openModal, setOpenModal]} type={MODAL.TYPE.SignIn}/>
            <header className={`main-header__container ${show 
                    && 'main-header-scroll'}`}>
                <Link to='/'>
                    <h1 className="main-header__title">KeeBlog</h1>
                </Link>
                <nav className="main-header__nav">
                    <button className="login__button" onClick={() => setOpenModal(true)}>Sign In</button>
                    <button className="signup__button">Sign Up</button>
                </nav>
            </header>
            <div className='main__container'>
                <Outlet context={[show, setShow]} />
            </div>
        </>
    )
}

export default Layout