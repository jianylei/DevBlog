module.exports = { 
    createUserReq: {
        body: {
            username: 'testing123',
            password: 'testing123',
            firstName: 'testingFirst',
            lastName: 'testingLast'
        }
    },

    updateUserReq: {
        body: {
            id: 'abc123',
            username: 'testing123',
            password: 'testing123',
            firstName: 'testingFirst',
            lastName: 'testingLast',
            about: 'testingAbout',
            images: {
                profile: 'testingProfileImg',
                cover: 'testingCoverImg'
            },
            roles: ['Author'],
            active: true
        }
    },

    createPostReq: {
        body: {
            author: 'testingAuthor',
            title: 'testingTitle',
            subHeading: 'testingSub',
            content: 'testingContent',
            cover: 'testingCover',
            tags: ['testingTags']
        }
    },

    updatePostReq: {
        body: {
            id: 'testingId',
            title: 'testingTitle',
            subHeading: 'testingSub',
            content: 'testingContent',
            cover: 'testingCover',
            tags: ['testingTags'],
            status: 'Pending'
        }
    },
}