import { useGetTopTagsQuery } from "../../../features/posts/postsApiSlice"
import TagItem from "./TagItem"

const SuggestedTags = () => {
    const {
        data: tags,
        isSuccess,
        isError,
    } = useGetTopTagsQuery('postsList')

    let content

    if (isError) content = undefined

    if (isSuccess) {
        const tagsArray = Object.keys(tags).map(key => [key, tags[key]])
        const tagsList = tagsArray.slice(0,7).map(tag => <TagItem key={tag[0]} tag={tag[0]} />)
        content = (
            <div className='side-section'>
                <h3 className='side-title'>Recommended topics</h3>
                <div className='side-tag-items'>{tagsList}</div>
            </div>
        )
    }

    return content
}

export default SuggestedTags