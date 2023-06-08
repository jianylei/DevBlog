import { useEffect, useRef, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useGetPostsQuery } from "../postsApiSlice"
import {
    setPost,
    resetError,
    reset,
    selectCurrentPostErr,
} from "../postSlice"
import NoMatch from "../../../components/NoMatch"
import { ROLES, TABS } from "../../../constants/constants"
import Title from "./form/Title"
import Subhead from "./form/Subhead"
import Tags from "./form/Tags"
import Cover from "./form/Cover"
import Textarea from "./form/Textarea"
import { getIdFromPathStr, getPathStrFromStr } from "../../../utils/utils"
import useAuth from "../../../hooks/useAuth";

const EditPost = () => {
    const [title, setTitle] = useState('')
    const [errTitle, setErrTitle] = useState(false)
    const [subhead, setSubhead] = useState('')
    const [errSub, setErrSub] = useState(false)
    const [content, setContent] = useState('')
    const [errContent, setErrContent] = useState(false)
    const [tags, setTags] = useState('')
    const [cover , setCover] = useState('')
    const initContentVal = useRef('')

    const { title: paramsTitle  } = useParams()
    const id = getIdFromPathStr(paramsTitle)

    const { pathname } = useLocation()

    const [isError, errMsg] = useSelector(selectCurrentPostErr)

    const dispatch = useDispatch()

    const auth = useAuth()

    const navigate = useNavigate()

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
            if ((auth.id !== post.user) && !ROLES.AUTH.includes(auth.role)) {
                navigate('/', { replace: true })
            }

            const tagsStr = post.tags?.join() || ''
            setTitle(post.title)
            setSubhead(post.subHeading)
            setTags(tagsStr)
            setContent(post.content)
            initContentVal.current = post.content
            setCover(post.cover)

            dispatch(setPost({
                id,
                title: post.title,
                subHeading: post.subHeading,
                tags: tagsStr,
                cover: post.cover,
                content: post.content
            }))
        }
        // eslint-disable-next-line
    }, [isSuccess, id, post, dispatch, navigate])

    useEffect(() => {
        if (isError) {
          if (!title) setErrTitle(true)
          if (!subhead) setErrSub(true)
          if (!content) setErrContent(true)
        }
    }, [isError, errMsg]) // eslint-disable-line react-hooks/exhaustive-deps
  
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
        pageContent = <NoMatch tab={ TABS.POST }/>
    } 

    if (isSuccess && post) {
        pageContent = (
            <div className="form__container">
                { isError && errMsg
                    ? <div className="errmsg">{errMsg}</div>
                    : undefined
                }
                
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
                        initVal={initContentVal.current}
                    />
                </form>
            </div>
        )
    }
    
    return pageContent
}

export default EditPost