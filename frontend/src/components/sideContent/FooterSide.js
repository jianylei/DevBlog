import { useEffect, useState } from 'react';
import { delay } from '../../utils/utils';

const FooterSide = () => {
    const [show, setShow] = useState(false);

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
    ];

    useEffect(() => {
        if (show) {
            const timeOut = async () => {
                await delay(4000);
                setShow(false);
            };
            timeOut();
        }
    }, [show]);

    const linksComponents = links.map((link, idx) => (
        <button href="#" className="side__footer-link" key={idx}>
            {link}
        </button>
    ));

    return (
        <div className="blog-side__footer">
            <div className={`side__footer-note ${show && 'show'}`}>
                This section is under development
            </div>
            <div className="side__footer-links" onClick={!show ? () => setShow(true) : undefined}>
                {linksComponents}
            </div>
        </div>
    );
};

export default FooterSide;
