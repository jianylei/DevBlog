import { useEffect, useState } from "react"
import { Editor } from "@tinymce/tinymce-react"
import {
    stringToTags,
    parseImgFromHTML,
    dataURLtoFile
} from "../../utils/postFormUtils"
import { useUploadMutation } from "../uploads/uploadApiSlice"

const NewPost = () => {
    const [title, setTitle] = useState('')
    const [subhead, setSubhead] = useState('')
    const [content, setContent] = useState('')
    const [tags, setTags] = useState('')
    const [cover , setCover] = useState('')

    const [upload, {
      isError,
      error
    }] = useUploadMutation()

    const handleSubmit = async (e) => {
      e.preventDefault()

      const tagsList = stringToTags(tags)
      const { str, imageList, imageNames } = parseImgFromHTML(content)
      const data = new FormData()
      data.append('test', 'tesetset')
      data.append('name', 'jianyonglei')

      for (const idx in imageList) {
        const file = dataURLtoFile(imageList[idx], imageNames[idx])
        console.log(file)
        data.append('posts', file)
      }        data.append('users', 'file')

      await upload(data)
    }

    const onImageChange = (e) => {
      if (e.target.files && e.target.files[0]) {
        setCover(URL.createObjectURL(e.target.files[0]))
      }
    }

    const coverImg = cover
      ? `url(${cover})`
      : 'var(--NO-IMAGE)'

    return (
        <div className="form__container">
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-input__container">
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
                   <span className="title-span"></span>
              </div>
                <div className="form-input__container">
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
                  <span className="sub-span"></span>
                </div>
                <div className="form-input__container">
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
                  <span className="tags-span"></span>
                  <p className="form-tags-note">*Tags are space and/or comma seperated</p>
                </div>
                <label className="form-cover__container" htmlFor="cover">
                    <input id='cover' type='file' accept="image/*" onChange={onImageChange} hidden/>
                    <div
                        className={`image post-card-cover ${cover ? 'img-overlay' : ''}`}
                        style={{backgroundImage: coverImg}}
                    />
                </label>
                <div className="form__textarea">
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
                        onChange={(e) => setContent(e.target.getContent())}
                    />
                </div><button type="submit">asdasd</button>
            </form>
        </div>
    )
}

export default NewPost