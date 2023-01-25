import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { reset, resetError, selectCurrentPostErr } from "../postSlice"
import Title from "./form/Title"
import Subhead from "./form/Subhead"
import Tags from "./form/Tags"
import Cover from "./form/Cover"
import Textarea from "./form/Textarea"
import EditTextarea from "./form/Textarea"

const NewPost = () => {
    const [title, setTitle] = useState('')
    const [errTitle, setErrTitle] = useState(false)
    const [subhead, setSubhead] = useState('')
    const [errSub, setErrSub] = useState(false)
    const [content, setContent] = useState('')
    const [errContent, setErrContent] = useState(false)
    const [tags, setTags] = useState('')
    const [cover , setCover] = useState('')

    const [isError, errMsg] = useSelector(selectCurrentPostErr)

    const dispatch = useDispatch()

    useEffect(() => {
      window.scrollTo(0, 0)
      return () => {
        setTitle('')
        setErrContent(false)
        setSubhead('')
        setErrSub(false)
        setContent('')
        setErrContent(false)
        setTags('')
        setCover('')
        dispatch(reset())
      }
    }, [dispatch])

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

    return (
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
                  state={[content, setContent]}
                  err={errContent}
                  resetInputErr={resetInputErr}
                />
            </form>
        </div>
    )
}

export default NewPost