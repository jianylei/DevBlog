import React from 'react'
import SuggestedAuthors from './author/SuggestedAuthors'
import NewPostsSide from './post/NewPostsSide'
import TrendingPostsSide from './post/TrendingPostsSide'

const FollowingPostsSide = () => {
    return (
        <div className='side-section__container'>
            <NewPostsSide />
            <TrendingPostsSide />
            <SuggestedAuthors />
        </div>
    )
}

export default FollowingPostsSide