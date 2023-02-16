import { useEffect, useRef, useState } from 'react'
import useOutsideAlerter from '../../hooks/useOutsideAlerter'
import { delay } from '../../utils/utils'

const FooterSide = () => {
    const [show, setShow] = useState(false)

    const wrapperRef = useRef(null)

    const links = [
        'Help',
        'Status',
        'Writers',
        'Blogs',
        'Careers',
        'Privacy',
        'Term',
        'About',
        'Text to Speech'
    ]

    const outsidedAlerterHanlder = () => setShow(false)

    useOutsideAlerter(wrapperRef, outsidedAlerterHanlder)

    useEffect(() => {
        if (show) {
            const timeOut = async () => {
                await delay(3500)
                setShow(false)
            }
            timeOut()
        }
    }, [show])

    const linksComponents = links.map((link, idx) => <button 
        href='#'
        className='side__footer-link'
        key={idx}
    >{link}</button>
    )

    return (
        <div className='blog-side__footer'>
            <div
                className={`side__footer-note ${show && 'show'}`}
                ref={wrapperRef}
            >
                This section is under development
            </div>
            <div
                className='side__footer-links'
                onClick={() => setShow(true)}
            >
                {linksComponents}
            </div>
        </div>
    )
}

export default FooterSide