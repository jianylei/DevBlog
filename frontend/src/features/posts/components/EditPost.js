import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useGetPostsQuery } from "../postsApiSlice"
import {
    setPost,
    resetError,
    reset,
    selectCurrentPostErr,
} from "../postSlice"
import NoMatch from "../../../components/NoMatch"
import { TABS } from "../../../constants/constants"
import { getIdFromPathStr, getPathStrFromStr } from "../../../utils/utils"
import Title from "./form/Title"
import Subhead from "./form/Subhead"
import Tags from "./form/Tags"
import Cover from "./form/Cover"
import Textarea from "./form/Textarea"
import { imgFileToBase64, parseImgFromHTML, fetchImageBlob, parseAndSetImgFromHTML } from "../../../utils/postFormUtils"

const EditPost = () => {
    const [title, setTitle] = useState('')
    const [errTitle, setErrTitle] = useState(false)
    const [subhead, setSubhead] = useState('')
    const [errSub, setErrSub] = useState(false)
    const [content, setContent] = useState('')
    const [errContent, setErrContent] = useState(false)
    const [tags, setTags] = useState('')
    const [cover , setCover] = useState('')

    const { title: paramsTitle  } = useParams()
    const id = getIdFromPathStr(paramsTitle)

    const { pathname } = useLocation()

    const [isError, errMsg] = useSelector(selectCurrentPostErr)

    const dispatch = useDispatch()

    const { post, isLoading, isSuccess } = useGetPostsQuery('postsList', {
        selectFromResult: ({ data, isLoading, isSuccess }) => ({
            post: data?.entities[id],
            isLoading,
            isSuccess
        })
    })

    useEffect(() => {
        window.scrollTo(0, 0)
        return () => {
            dispatch(reset())
          }
    }, [dispatch])

    useEffect(() => {
        if (isSuccess && post) {
            const tagsStr = post.tags?.join() || ''
            setTitle(post.title)
            setSubhead(post.subHeading)
            setTags(tagsStr)
            setContent(post.content)
            setCover(post.cover)

/*
            parseAndSetImgFromHTML(post.content, (obj) => {
                console.log(obj.imageList)
                //setContent(obj.str)
            })*/
            //const { str, imageList, imageNames } = parseAndSetImgFromHTML(post.content, name)
            
            //console.log(imageList)

//test()
            if (post.cover) {
                fetchImageBlob(post.cover, (blob) => {
                    imgFileToBase64(blob, (_cover) => {
                        dispatch(setPost({
                            id,
                            title: post.title,
                            subHeading: post.subHeading,
                            tags: tagsStr,
                            cover: _cover,
                            content: post.content
                        }))
                    })
                })
            }
            else {
                dispatch(setPost({
                    id,
                    title: post.title,
                    subHeading: post.subHeading,
                    tags: tagsStr,
                    cover: post.cover,
                    content: post.content
                }))
            }
        }
    }, [isSuccess, id, post, dispatch])

    const resetInputErr = () => {
        if (isError) {
          setErrTitle(false)
          setErrSub(false)
          setErrContent(false)
          dispatch(resetError())
        }
    }

    let pageContent
    if (!isLoading && (!post || ('/write/'
        + getPathStrFromStr(post.title, post.id) !== pathname))) {
        pageContent = <NoMatch tab={ TABS.Post }/>
    } 

    if (isSuccess && post) {
        pageContent = (
            <div className="form__container">
                <button onClick={(e) => {
                    e.preventDefault()
                    console.log(cover)
                }}>asdasdasd</button>
                <form className="form">
                    <Title
                        state={[title, setTitle]}
                        err={errTitle}
                        resetInputErr={resetInputErr}
                    />
                    <Subhead
                        state={[subhead, setSubhead]}
                        err={errSub}
                        resetInputErr={resetInputErr}
                    />
                    <Tags state={[tags, setTags]} />
                    <Cover state={[cover, setCover]} />
                    <Textarea
                        state={[content, setContent]}
                        err={errContent}
                        resetInputErr={resetInputErr}
                    />
                </form>
            </div>
        )
    }
    
    return pageContent
}

export default EditPost