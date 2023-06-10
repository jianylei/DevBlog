import { useNavigate } from 'react-router-dom';
import './nomatch.css';

const NoMatch = () => {
    const navigate = useNavigate();

    return (
        <div className="no-match__container">
            <h3>This page is not available</h3>
            <p>
                The link may be broken, or the post / user may have been removed. Check to see if
                the link you&apos;re trying to open is correct.
            </p>
            <div className="no-match-button__container">
                <button onClick={() => navigate(-1)}>back</button>
                <button onClick={() => navigate('/')}>home</button>
            </div>
        </div>
    );
};

export default NoMatch;
