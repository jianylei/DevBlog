import { useEffect, useState } from "react"
import { Editor } from "@tinymce/tinymce-react"

const NewPost = () => {
    const [title, setTitle] = useState('')
    const [subhead, setSubhead] = useState('')
    const [content, setContent] = useState('')
    const [tags, setTags] = useState('')


    return (
        <div className="form__container">
            <form className="form" onSubmit={e => e.preventDefault()}>
                <input
                    className="form__input"
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Title"
                    autoComplete="off"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    className="form__input"
                    id="subheading"
                    name="subheading"
                    type="text"
                    placeholder="Subheading"
                    autoComplete="off"
                    value={subhead}
                    onChange={(e) => setSubhead(e.target.value)}
                />
                <div className="form-tags__container">
                  <input
                      className="form__input"
                      id="tags"
                      name="tags"
                      type="text"
                      placeholder="Tags"
                      autoComplete="off"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                  />
                  <p className="form-tags-note">*Tags are space (and) or comma seperated</p>
                </div>
                <div className="form__textarea">
                    <Editor apiKey='fo5qm0cg8ib5w52ryt8bkwt18xm5lwwjj90gxlu7q1zh9ir6'
                        init={{
                          plugins: 'link image',
                          toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | h1 h2 h3',
                          placeholder: 'Tell your story...',
                          statusbar: false,
                          height:"100%",
                          menubar: true
                        }}
                        onChange={(e) => setContent(e.target.getContent())}
                    />
                </div>
            </form>
        </div>
    )
}

export default NewPost