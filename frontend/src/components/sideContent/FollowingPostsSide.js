import React from 'react'
import NewPostsSide from './post/NewPostsSide'
import TrendingPostsSide from './post/TrendingPostsSide'

const FollowingPostsSide = () => {
    return (
        <div className='side-section__container'>
            <NewPostsSide />
            <TrendingPostsSide />
        </div>
    )
}

export default FollowingPostsSide