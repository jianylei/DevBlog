import { useNavigate } from 'react-router-dom'

const WriteButton = () => {
    const navigate = useNavigate()

    return (
        <button
            className="login__button"
            onClick={() => navigate('/write')}
        >
            Write
        </button>
    )
}

export default WriteButton