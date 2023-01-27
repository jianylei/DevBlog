import { useDispatch, useSelector } from "react-redux"
import { useUpdatePostMutation } from "../../postsApiSlice"
import { selectCurrentPost, setError } from "../../postSlice"
import { useUploadMutation } from "../../../uploads/uploadApiSlice"
import { stringToTags, dataURLtoFile, asyncParseImgFromHTML } from "../../../../utils/postFormUtils"
import { getPathStrFromStr, delay } from "../../../../utils/utils"
import { IMGPATH } from "../../../../constants/constants"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const UpdateButton = () => {
    const post = useSelector(selectCurrentPost)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [upload, {
        isLoading: uploadLoading,
        isError: uploadIsError,
    }] = useUploadMutation()

    const [updatePost, {
        isSuccess: updatePostSuccess,
        isError: updatePostIsError,
        error: updatePostError
    }] = useUpdatePostMutation()

    useEffect(() => {
        if (updatePostSuccess && !uploadLoading && !uploadIsError) {
            navigate('/')
        }
    }, [navigate, updatePostSuccess, uploadIsError, uploadLoading])

    useEffect(() => {
        if (updatePostIsError) dispatch(setError({ errMsg: updatePostError.data?.message }))
    }, [dispatch, updatePostError, updatePostIsError])

    const canSave = [post.title, post.subHeading, post.content].every(Boolean)

    const handlePublish = async (e) => {
        e.preventDefault()

        if (canSave) {
            const { id, title, subHeading, content, tags, cover } = post
            const name = getPathStrFromStr(title)
            const tagsList = stringToTags(tags)
            let coverUrl = ''

            await asyncParseImgFromHTML(content, name, async(obj) => {
                const { str, imageList, imageNames } = obj

                await delay(300)

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

                    updatePost({
                        id,
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
                    updatePost({
                        id,
                        title,
                        subHeading,
                        content: str,
                        tags: tagsList,
                        cover: coverUrl
                    })
                }
            })
        } else {
            dispatch(setError({ errMsg: '' }))
        }
    }

    return (
        <button className="login__button" onClick={handlePublish}>Update</button>
    )
}

export default UpdateButton