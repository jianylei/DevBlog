import { useNavigate } from "react-router-dom"
import { TABS } from "../constants/constants"

const NoMatch = ({ tab }) => {
    const navigate = useNavigate()

    return (
        <div>
            <h3>
                This page is not available
            </h3>
            <p>The link may be broken, or the post / user may have been removed. 
                Check to see if the link you're trying to open is correct.</p>
            <button onClick={() => navigate(-1)}>back</button>
            <button onClick={() => navigate('/')}>home</button>
        </div>
    )
}

export default NoMatch