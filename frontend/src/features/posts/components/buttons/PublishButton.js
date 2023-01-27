import { useDispatch, useSelector } from "react-redux"
import { useAddNewPostMutation } from "../../postsApiSlice"
import { selectCurrentPost, setError } from "../../postSlice"
import { useGetUsersQuery } from "../../../users/usersApiSlice"
import { useUploadMutation } from "../../../uploads/uploadApiSlice"
import { stringToTags, parseImgFromHTML, dataURLtoFile } from "../../../../utils/postFormUtils"
import { getPathStrFromStr } from "../../../../utils/utils"
import useAuth from "../../../../hooks/useAuth"
import { IMGPATH } from "../../../../constants/constants"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const PublishButton = () => {
    const post = useSelector(selectCurrentPost)

    const { username } = useAuth()

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const {
        data: users,
        isSuccess: usersSuccess,
    } = useGetUsersQuery('usersList')

    const [upload, {
        isLoading: uploadLoading,
        isError: uploadIsError,
    }] = useUploadMutation()
    

    const [addNewPost, {
        isLoading: addPostLoading,
        isSuccess: addPostSuccess,
        isError: addPostIsError,
        error: addPostError
    }] = useAddNewPostMutation()

    useEffect(() => {
        if (addPostSuccess && !uploadLoading && !uploadIsError) {
            navigate('/')
        }
    }, [navigate, addPostSuccess, uploadIsError, uploadLoading])

    useEffect(() => {
        if (addPostIsError) dispatch(setError({ errMsg: addPostError.data?.message }))
    }, [addPostLoading, addPostError, dispatch, addPostIsError])

    const canSave = [post.title, post.subHeading, post.content].every(Boolean) && usersSuccess

    const handlePublish = async (e) => {
        e.preventDefault()

        if (canSave) {
            const { ids, entities } = users
            const userId = ids.find(id => entities[id]?.username === username)
    
            if (userId) {
                const { title, subHeading, content, tags, cover } = post
                const name = getPathStrFromStr(title)
                const { str, imageList, imageNames } = parseImgFromHTML(content, name)
    
                const tagsList = stringToTags(tags)
    
                let coverUrl = ''
    
                if (imageList?.length || cover) {
                    const data = new FormData()
        
                    data.append('name', name)
            
                    if (imageList) {
                        for (const idx in imageList) {
                            const file = dataURLtoFile(imageList[idx], imageNames[idx])
                            data.append('posts', file)
                        }
                    }
            
                    if (cover) {
                        const coverName = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.jpg'
                        const newFile = dataURLtoFile(cover, coverName)
                        data.append('posts', newFile)
                        coverUrl = IMGPATH.Images + 'posts/' + name + '/' + coverName
                    }

                    addNewPost({
                        user: userId,
                        title,
                        subHeading,
                        content: str,
                        tags: tagsList,
                        cover: coverUrl
                    }).then((res) => {
                        if (!res.error) upload(data)
                    }).catch((error) => {
                        console.log(error)
                    })
                } else {
                    addNewPost({
                        user: userId,
                        title,
                        subHeading,
                        content: str,
                        tags: tagsList,
                        cover: coverUrl
                    })
                }
            }        
        } else {
            dispatch(setError({ errMsg: '' }))
        }
    }

    return (
        <button className="login__button" onClick={handlePublish}>Publish</button>
    )
}

export default PublishButton