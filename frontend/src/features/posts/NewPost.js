import { useEffect, useState } from "react"
import { Editor } from "@tinymce/tinymce-react"
import { imgFileToBase64 } from "../../utils/postFormUtils"
import { useDispatch, useSelector } from "react-redux"
import {
  setContent as setPostContent,
  setCover as setPostCover,
  setTags as setPostTags,
  reset,
  resetError,
  selectCurrentPostErr
} from "./postSlice"
import Title from "./form/Title"
import Subhead from "./form/Subhead"
import Tags from "./form/Tags"

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
    }, [])

    useEffect(() => {
      console.log('err: '+isError)
      if (isError) {
        if (!title) setErrTitle(true)
        if (!subhead) setErrSub(true)
        if (!content) setErrContent(true)
      }
    }, [isError, errMsg])

    const resetInputErr = () => {
      if (isError) {
        setErrTitle(false)
        setErrSub(false)
        setErrContent(false)
        dispatch(resetError())
      }
    }




    const handleContentChange = (e) => {
      setContent(e.target.getContent())
      dispatch(setPostContent({ content: e.target.getContent() }))
      resetInputErr()
    }



    const onImageChange = (e) => {
      if (e.target.files && e.target.files[0]) {
        setCover(URL.createObjectURL(e.target.files[0]))
        const base64t = imgFileToBase64(e.target.files[0], (cover) => {
          dispatch(setPostCover({ cover }))
        })
      }
    }

    const handleCoverRemove = () => {
      setCover('')
    }

    const coverImg = cover
      ? `url(${cover})`
      : 'var(--NO-IMAGE)'

    return (
        <div className="form__container">
            <form className="form">
                <Title titleState={[title, setTitle]} err={errTitle} resetInputErr={resetInputErr} />
                <Subhead subState={[subhead, setSubhead]} err={errSub} resetInputErr={resetInputErr} />
                <Tags tagsState={[tags, setTags]} />
                <label className="form-cover__container" htmlFor="cover">
                    <input 
                      id='cover'
                      type='file'
                      accept="image/*"
                      onChange={onImageChange}
                      hidden
                    />
                    <div
                        className={`image post-card-cover ${cover ? 'img-overlay' : ''}`}
                        style={{backgroundImage: coverImg}}
                    >
                      <button
                        className={`form-input-unselect ${cover ? 'show' : undefined}`}
                        onClick={handleCoverRemove}
                      >
                          remove
                      </button>
                    </div>
                </label>
                <div className={`form__textarea ${errContent ? 'errborder' : ''}`}>
                    <Editor apiKey='fo5qm0cg8ib5w52ryt8bkwt18xm5lwwjj90gxlu7q1zh9ir6'
                        init={{
                          plugins: 'link image lists',
                          toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | numlist bullist | h1 h2 h3',
                          statusbar: false,
                          height:"100%",
                          content_style: "@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Toto" + 
                            "&display=swap'); body { font-family: 'Noto Serif Toto', sans-serif; }",
                          placeholder: 'Tell your story...',
                        }}
                        onChange={handleContentChange}
                    />
                </div>
            </form>
        </div>
    )
}

export default NewPost