import { useNavigate } from "react-router-dom"
import { TABS } from "../config/constants"

const NoMatch = ({ tab }) => {
    const navigate = useNavigate()

    let str = !tab ? TABS.Page.toLowerCase()
        : tab === TABS.Review || tab === TABS.Pending
        ? TABS.Post.toLowerCase()
        : tab.toLowerCase()

    let path
    if (tab === TABS.Author) {
        path = '/authors'
    } else if (tab === TABS.Pending) {
        path = '/pending'
    } else if (tab === TABS.Review) {
        path = '/review'
    } else {
        path = '/'
    }

    const clickHandler = () => navigate(path)

    return (
        <div className={ str === TABS.Page.toLowerCase() 
            ? 'no-match-page' 
            : 'no-match' }
        >
            <h3>
                This {str} is not available
            </h3>
            <p>The link may be broken, or the {str} may have been removed. 
                Check to see if the link you're trying to open is correct.</p>
            <button onClick={clickHandler}>back</button>
        </div>
    )
}

export default NoMatch