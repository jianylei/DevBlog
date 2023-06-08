import { Editor } from "@tinymce/tinymce-react"
import { useDispatch } from "react-redux"
import { setContent as setPostContent } from "../../postSlice"

const Textarea = ({ state, err, resetInputErr, initVal }) => {
    const [content, setContent] = state
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setContent(e.target.getContent())
        dispatch(setPostContent({ content: e.target.getContent() }))
        resetInputErr()
    }

    return (
        <div className={`form__textarea ${err ? 'errborder' : ''}`}>
            <Editor
                apiKey={process.env.REACT_APP_TINYMCE_KEY}
                onChange={handleChange}
                initialValue={initVal || ''}
                init={{
                plugins: 'link image lists codesample',
                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | numlist bullist | h1 h2 h3 | codesample',
                statusbar: false,
                height:"100%",
                content_style: "@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Toto" + 
                    "&display=swap'); body { font-family: 'Noto Serif Toto', sans-serif; }",
                placeholder: 'Tell your story...',
                }}
            />
        </div>
    )
}

export default Textarea