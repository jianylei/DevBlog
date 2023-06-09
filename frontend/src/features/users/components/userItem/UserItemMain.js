const UserItemMain = ({ user, navHandler }) => {
    return (
        <div className="author-card-details__container" onClick={navHandler}>
            <h3 className="author-card-username">{user.username}</h3>
            <p className="author-card-about">{user.about}</p>
        </div>
    );
};

export default UserItemMain;
