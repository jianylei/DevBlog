module.exports = { 
    STATUS: Object.freeze({
        Approved: 'Approved',
        Denied: 'Denied',
        Pending: 'Pending'
    }),

    ROLES: Object.freeze({
        Author: 'Author',
        Moderator: 'Moderator',
        Admin: 'Admin'
    }),

    TABS: Object.freeze({
        Post: 'Post',
        Author: 'Author',
        Review: 'Review',
        Pending: 'Pending',
        Page: 'Page'
    }),

    MODAL: Object.freeze({
        TYPE: {
            SignIn: 'SignIn',
            SignUp: 'SignUp'
        }
    }),

    IMGPATH: Object.freeze({
        Images: 'http://localhost:3080/images/'
    }),

    DELETED: '[deleted]',

    DIMENSIONS: Object.freeze({
        WIDTH: {
            S: 728,
            M: 904
        }
    }),

    REGEX: Object.freeze({
        ROUTES: {
            POSTS: /^\/$/,
            AUTHORS: /^\/authors(\/)?$/,
            AUTHOR: /^\/authors(\/)?/,
            WRITE: /^\/write(\/)?$/,
            EDIT: /^\/write\/.*$/,
        }
    })
}