import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"
import { useDeletePostMutation } from '../../postsApiSlice'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const DeleteButton = ({ id }) => {
    const navigate = useNavigate()

    const [deletePost, {
        isSuccess,
        isError,
        error
    }] = useDeletePostMutation()

    useEffect(() => {
        if (isSuccess) navigate('/', { replace: true })
    }, [isSuccess])

    if (isError) {
        console.log(error)
    }

    const clickHandle = () => {
        deletePost({ id })
    }

    return (
        <FontAwesomeIcon
        className='post-edit__button'
        icon={faTrashCan}
        onClick={clickHandle}
    />
    )
}

export default DeleteButton