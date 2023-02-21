const Profile = ({ user }) => {

    const profileImg = user?.image
        ? `url(${user?.image})`
        : 'var(--NO-IMAGE)'

    return (
        <div>
            <div
                className={`image side-image ${user?.image ? 'img-overlay' : ''}`}
                style={{backgroundImage: profileImg}}
                onClick={undefined}
            />
            <h3>
                { user?.firstName && user?.lastName
                    ? `${user?.firstName} ${user?.lastName}`
                    : user?.username
                }
            </h3>
        </div>
    )
}

export default Profile