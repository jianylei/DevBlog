import { useLocation } from "react-router-dom"

const NoMatch = () => {
    const location = useLocation()

    return (
        <div>
            <h3>
                404 Not found
            </h3>
            <p> No match for {location.pathname}</p>
        </div>
    )
}

export default NoMatch