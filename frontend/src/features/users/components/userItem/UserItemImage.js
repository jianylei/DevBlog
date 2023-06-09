import React from 'react';

const UserItemImage = ({ user, navHandler }) => {
    const profileImg = user.image ? `url(${user.image})` : 'var(--NO-IMAGE)';

    return (
        <div
            className={`image author-card-image ${user.image ? 'img-overlay' : ''}`}
            style={{ backgroundImage: profileImg }}
            onClick={navHandler}
        />
    );
};

export default UserItemImage;
