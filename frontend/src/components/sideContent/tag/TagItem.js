import { memo } from 'react'

const TagItem = ({ tag }) => {
  return (
    <button className='side-tag-item'>{tag}</button>
  )
}

const memoizedTagItem = memo(TagItem)

export default memoizedTagItem