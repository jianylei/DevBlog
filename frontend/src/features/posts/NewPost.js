import { useEffect, useState } from "react"
import { Editor } from "@tinymce/tinymce-react"
import {
    stringToTags,
    parseImgFromHTML,
    dataURLtoFile
} from "../../utils/postFormUtils"
import useAuth from '../../hooks/useAuth'
import { useGetUsersQuery } from "../users/usersApiSlice"
import { useAddNewPostMutation } from "./postsApiSlice"
import { useUploadMutation } from "../uploads/uploadApiSlice"
import { getPathStrFromStr, getBase64 } from "../../utils/utils"
import { IMGPATH } from "../../constants/constants"

const NewPost = () => {
    const [title, setTitle] = useState('')
    const [subhead, setSubhead] = useState('')
    const [content, setContent] = useState('')
    const [tags, setTags] = useState('')
    const [cover , setCover] = useState('')
    const [coverFile , setCoverFile] = useState('')

    const { username } = useAuth()

    const [upload, {
      isLoading: uploadLoading,
      isSuccess: uploadSuccess,
      isError: uploadIsError,
      error: uploadError
    }] = useUploadMutation()

    const {
      data: users,
      isSuccess: usersIsSuccess,
    } = useGetUsersQuery('usersList')

    const [addNewPost, {
      isLoading: addPostLoading,
      isSuccess: addPostSuccess,
      isError: addPostIsError,
      error: addPostError
    }] = useAddNewPostMutation()

    const canSave = [title, subhead, content].every(Boolean) && usersIsSuccess

    const handleSubmit = async (e) => {
      e.preventDefault()

      if (canSave) {
        const { ids, entities } = users
        const userId = ids.find(id => entities[id]?.username === username)

        const name = getPathStrFromStr(title)

        if (userId) {
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
              var newCover = new File([coverFile], coverName, { type: 'image/jpg' })
              data.append('posts', newCover)
              coverUrl = IMGPATH.Images + 'posts/' + name + '/' + coverName
            }
  
            await upload(data)
            if (uploadIsError) console.log(uploadError.status)
          }
          
          await addNewPost({
            user: userId,
            title, subHeading:
            subhead,
            content: str,
            tags: tagsList,
            cover: coverUrl
          })
        }
      }
    }

    const handleCoverRemove = () => {
      setCover('')
      setCoverFile('')
    }

    const onImageChange = (e) => {
      if (e.target.files && e.target.files[0]) {
        setCover(URL.createObjectURL(e.target.files[0]))
        setCoverFile(e.target.files[0])
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
                  <p className="form-tags-note">*Space and/or comma seperated</p>
                </div>
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