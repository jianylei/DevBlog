import { useState } from "react"
import { Outlet } from 'react-router-dom'
import Modal from '../features/modal/components/Modal'
import Header from "./header/Header"

const Layout = () => {
    const [show, setShow] = useState(false)
    
    return (
        <>
            <Modal />
            <Header showState={[show, setShow]} />
            <div className='main__container'>
                <Outlet context={[show, setShow]} />
            </div>
        </>
    )
}

export default Layout