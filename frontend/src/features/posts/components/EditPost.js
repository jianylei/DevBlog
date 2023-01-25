import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { reset, resetError, selectCurrentPostErr } from "../postSlice"
import { useGetPostsQuery } from "../postsApiSlice"
import NoMatch from "../../../components/NoMatch"
import { TABS } from "../../../constants/constants"
import { getIdFromPathStr, getPathStrFromStr } from "../../../utils/utils"
import Title from "./form/Title"
import Subhead from "./form/Subhead"
import Tags from "./form/Tags"
import Cover from "./form/Cover"
import Textarea from "./form/Textarea"
import EditTextarea from "./form/EditTextare";

const EditPost = () => {
    const [title, setTitle] = useState('')
    const [errTitle, setErrTitle] = useState(false)
    const [subhead, setSubhead] = useState('')
    const [errSub, setErrSub] = useState(false)
    const [content, setContent] = useState('')
    const [errContent, setErrContent] = useState(false)
    const [tags, setTags] = useState('')
    const [cover , setCover] = useState('')

    const [initVal, setInitVal] = useState('')

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
    }, [])

    // TODO: check back end to see how unchanged cover saves
    useEffect(() => {
        if (isSuccess) {
            setTitle(post.title)
            setSubhead(post.subHeading)
            setTags(post.tags)
            setCover(post.cover)
            setContent(post.content)
        }
    }, [isSuccess])

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

    if (isSuccess) {
        pageContent = (
            <div className="form__container">
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
                    <EditTextarea
                        state={[content, setContent]}
                        err={errContent}
                        resetInputErr={resetInputErr}
                    />
                </form>
            </div>
        )
    }
    
    
    /*
    else {
        pageContent = (
            <div className="form__container">
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
                    setState={setContent}
                    err={errContent}
                    resetInputErr={resetInputErr}
                    />
                </form>
            </div>
        )
    }*/

    return pageContent
}

export default EditPost