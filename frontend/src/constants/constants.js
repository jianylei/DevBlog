export const STATUS = Object.freeze({
    APPROVED: 'Approved',
    DENIED: 'Denied',
    PENDING: 'Pending'
})

export const ROLES = Object.freeze({
    AUTHOR: 'Author',
    MODERATOR: 'Moderator',
    ADMIN: 'Admin',
    AUTH: ['Moderator', 'Admin']
})

export const TABS = Object.freeze({
    POST: 'Post',
    AUTHOR: 'Author',
    REVIEW: 'Review',
    PENDING: 'Pending',
    PAGE: 'Page'
})

export const MODAL = Object.freeze({
    TYPE: {
        SIGNIN: 'SignIn',
        SIGNUP: 'SignUp'
    }
})

export const IMGPATH = Object.freeze({
    IMAGES: 'http://localhost:3080/images/'
})

export const DELETED = '[deleted]'

export const DIMENSIONS = Object.freeze({
    WIDTH: {
        S: 728,
        M: 904
    }
})

export const REGEX = Object.freeze({
    ROUTES: {
        POSTS: /^\/$/,
        AUTHORS: /^\/authors(\/)?$/,
        AUTHOR: /^\/authors(\/)?/,
        WRITE: /^\/write(\/)?$/,
        EDIT: /^\/write\/.*$/,
    }
})