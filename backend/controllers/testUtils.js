module.exports = { 
    createUserReq: {
        body: {
            username: 'testing123',
            password: 'testing123',
            email: 'email@email.com'
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
            image: 'testingImage',
            role: 'Author',
            active: true
        }
    },

    createPostReq: {
        body: {
            user: 'testingAuthor',
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