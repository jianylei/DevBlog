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

    PATH: Object.freeze({
        Images: './public/images/'
    }),

    TABS: Object.freeze({
        Post: 'Post',
        Author: 'Author',
        Review: 'Review',
        Pending: 'Pending',
        Page: 'Page'
    })
}