const Post = require("../models/Post")
const User = require("../models/User")
const postsController = require('./postsController')
const testUtils = require('./testUtils')
const { STATUS } = require('../config/constants')

describe('GET /post', () => {
    it('sucessful request', async () => {
        const mockedRes = { 
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual([
                    {
                        "author": "testingUser", 
                        "id": 1, 
                        "readTime": 1
                    }, 
                    {
                        "author": "testingUser", 
                        "id": 2, 
                        "readTime": 1
                    }, 
                    {
                        "author": "testingUser", 
                        "id": 3, 
                        "readTime": 1
                    }
                ])
            }
        }

        Post.find = jest.fn().mockImplementation(() => ({
            lean: jest.fn().mockResolvedValueOnce([
                { id: 1 }, { id: 2 }, { id: 3 }
            ])
        }))

        User.findById = jest.fn().mockImplementation(() => ({
            lean: jest.fn().mockImplementation(() => ({
                exec: jest.fn().mockResolvedValueOnce({ username: 'testingUser' })
            }))
        }))

        await postsController.getAllPosts({},mockedRes)
    })

    it('sucessful request - no user found', async () => {
        const mockedRes = { 
            json: (jsonRes) => {
                for (const post of jsonRes) {
                    expect(post.author).toBe('[deleted]')
                }
            }
        }

        Post.find = jest.fn().mockImplementation(() => ({
            lean: jest.fn().mockResolvedValueOnce([
                { id: 1 }, { id: 2 }, { id: 3 }
            ])
        }))

        User.findById = jest.fn().mockImplementation(() => ({
            lean: jest.fn().mockImplementation(() => ({
                exec: jest.fn().mockResolvedValueOnce(undefined)
            }))
        }))

        await postsController.getAllPosts({},mockedRes)
    })

    it('error: no posts found', async () => {
        const mockedRes = { 
            status: (statusNum) => {
                expect(statusNum).toEqual(400)
                return mockedRes
            },
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({"message": 'No posts found'})
            }
        }

        Post.find = jest.fn().mockImplementation(() => ({
            lean: jest.fn().mockResolvedValueOnce([])
        }))

        await postsController.getAllPosts({},mockedRes)
    })
})

describe('POST /post', () => {
    it('sucessful request', async () => {
        const mockedReq = testUtils.createPostReq
        const mockedRes = {
            status: (statusNum) => {
                expect(statusNum).toEqual(201)
                return mockedRes
            },
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({
                    "message": `New post created: ${mockedReq.body.title}`
                })
            }
        }

        Post.findOne = jest.fn().mockImplementation(() => ({
            collation: jest.fn().mockImplementation(() => ({
                lean: jest.fn().mockImplementation(() => ({
                    exec: jest.fn().mockResolvedValueOnce(undefined)
                }))
            }))
        }))

        Post.create = jest.fn().mockResolvedValueOnce({ id: 0 })

        await postsController.createNewPost(mockedReq,mockedRes)
    })

    it('error: missing field', async () => {
        const mockedReq = testUtils.createPostReq
        const mockedRes = {
            status: (statusNum) => {
                expect(statusNum).toEqual(400)
                return mockedRes
            },
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({ "message": 'Please enter all required fields' })
            }
        }

        mockedReq.body.user = ''
        await postsController.createNewPost(mockedReq,mockedRes)
        mockedReq.body.user = 'testingAuthor'
        mockedReq.body.title = ''
        await postsController.createNewPost(mockedReq,mockedRes)
        mockedReq.body.title = 'testingTitle'
        mockedReq.body.subHeading = ''
        await postsController.createNewPost(mockedReq,mockedRes)
        mockedReq.body.subHeading = 'testingSub'
        mockedReq.body.content = ''
        await postsController.createNewPost(mockedReq,mockedRes)
        mockedReq.body.content = 'testingContent'
    })

    it('error: duplicate title', async () => {
        const mockedReq = testUtils.createPostReq
        const mockedRes = {
            status: (statusNum) => {
                expect(statusNum).toEqual(409)
                return mockedRes
            },
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({
                    "message": 'Duplicate post title'
                })
            }
        }

        Post.findOne = jest.fn().mockImplementation(() => ({
            collation: jest.fn().mockImplementation(() => ({
                lean: jest.fn().mockImplementation(() => ({
                    exec: jest.fn().mockResolvedValueOnce({ id: 0 })
                }))
            }))
        }))

        await postsController.createNewPost(mockedReq,mockedRes)
    })

    it('error: db error', async () => {
        const mockedReq = testUtils.createPostReq
        const mockedRes = {
            status: (statusNum) => {
                expect(statusNum).toEqual(400)
                return mockedRes
            },
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({
                    "message": 'Invalid post data recieved'
                })
            }
        }

        Post.findOne = jest.fn().mockImplementation(() => ({
            collation: jest.fn().mockImplementation(() => ({
                lean: jest.fn().mockImplementation(() => ({
                    exec: jest.fn().mockResolvedValueOnce(undefined)
                }))
            }))
        }))

        Post.create = jest.fn().mockResolvedValueOnce(undefined)

        await postsController.createNewPost(mockedReq,mockedRes)
    })
})

describe('PATCH /post', () => {
    it('sucessful request', async () => {
        const mockedReq = testUtils.updatePostReq
        const mockedRes = {
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({
                    "message": `Updated post: ${mockedReq.body.title}`
                })
            }
        }

        Post.findById = jest.fn().mockImplementation(() => ({
            exec: jest.fn().mockResolvedValueOnce({ 
                id: 0,
                save: jest.fn().mockResolvedValueOnce({ title: 'testingTitle' })
            })
        }))

        Post.findOne = jest.fn().mockImplementation(() => ({
            collation: jest.fn().mockImplementation(() => ({
                lean: jest.fn().mockImplementation(() => ({
                    exec: jest.fn().mockResolvedValueOnce(undefined)
                }))
            }))
        }))

        await postsController.updatePost(mockedReq,mockedRes)
    })

    it('error: missing field', async () => {
        const mockedReq = testUtils.updatePostReq
        const mockedRes = {
            status: (statusNum) => {
                expect(statusNum).toEqual(400)
                return mockedRes
            },
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({ "message": 'Please enter all required fields' })
            }
        }

        mockedReq.body.id = ''
        await postsController.updatePost(mockedReq,mockedRes)
        mockedReq.body.id = 'testingId'
        mockedReq.body.title = ''
        await postsController.updatePost(mockedReq,mockedRes)
        mockedReq.body.title = 'testingTitle'
        mockedReq.body.subHeading = ''
        await postsController.updatePost(mockedReq,mockedRes)
        mockedReq.body.subHeading = 'testingSub'
        mockedReq.body.content = ''
        await postsController.updatePost(mockedReq,mockedRes)
        mockedReq.body.content = 'testingContent'
    })

    it('error: post does not exist for update', async () => {
        const mockedReq = testUtils.updatePostReq
        const mockedRes = {
            status: (statusNum) => {
                expect(statusNum).toEqual(400)
                return mockedRes
            },
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({
                    "message": 'Post not found'
                })
            }
        }

        Post.findById = jest.fn().mockImplementation(() => ({
            exec: jest.fn().mockResolvedValueOnce(undefined)
        }))

        await postsController.updatePost(mockedReq,mockedRes)
    })

    it('error: duplicate title', async () => {
        const mockedReq = testUtils.updatePostReq
        const mockedRes = {
            status: (statusNum) => {
                expect(statusNum).toEqual(409)
                return mockedRes
            },
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({
                    "message": 'Duplicate post title'
                })
            }
        }

        Post.findById = jest.fn().mockImplementation(() => ({
            exec: jest.fn().mockResolvedValueOnce({ id: 0 })
        }))

        Post.findOne = jest.fn().mockImplementation(() => ({
            collation: jest.fn().mockImplementation(() => ({
                lean: jest.fn().mockImplementation(() => ({
                    exec: jest.fn().mockResolvedValueOnce({ _id: 0 })
                }))
            }))
        }))

        await postsController.updatePost(mockedReq,mockedRes)
    })
})

describe('PATCH /post/status', () => {
    it('sucessful request', async () => {
        const mockedReq = testUtils.updatePostReq
        const mockedRes = {
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({
                    "message": `Updated post: ${mockedReq.body.title} is ${mockedReq.body.status}`
                })
            }
        }

        Post.findById = jest.fn().mockImplementation(() => ({
            exec: jest.fn().mockResolvedValueOnce({ 
                id: 0,
                save: jest.fn().mockResolvedValueOnce(mockedReq.body)
            })
        }))

        await postsController.updatePostStatus(mockedReq,mockedRes)
    })

    it('error: missing field', async () => {
        const mockedReq = {
            body: {
                id: '',
                status: STATUS.Pending
            }
        }
        const mockedRes = {
            status: (statusNum) => {
                expect(statusNum).toEqual(400)
                return mockedRes
            },
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({
                    "message": 'All fields are required'
                })
            }
        }

        await postsController.updatePostStatus(mockedReq,mockedRes)
        mockedReq.body.id = 'testingId'
        mockedReq.body.status = ''
        await postsController.updatePostStatus(mockedReq,mockedRes)
    })

    it('error: invalid status', async () => {
        const mockedReq = {
            body: {
                id: 'testingId',
                status: 'test'
            }
        }
        const mockedRes = {
            status: (statusNum) => {
                expect(statusNum).toEqual(400)
                return mockedRes
            },
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({
                    "message": 'Invalid status'
                })
            }
        }

        await postsController.updatePostStatus(mockedReq,mockedRes)
    })

    it('error: post not found', async () => {
        const mockedReq = testUtils.updatePostReq
        const mockedRes = {
            status: (statusNum) => {
                expect(statusNum).toEqual(400)
                return mockedRes
            },
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({
                    "message": 'Post not found'
                })
            }
        }

        Post.findById = jest.fn().mockImplementation(() => ({
            exec: jest.fn().mockResolvedValueOnce(undefined)
        }))

        await postsController.updatePostStatus(mockedReq,mockedRes)
    })
})

describe('PATCH /post/view', () => {
    it('sucessful request', async () => {
        const mockedReq = testUtils.updatePostReq
        const mockedRes = {
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({
                    "message": `Updated ${mockedReq.body.title} view`
                })
            }
        }

        Post.findOneAndUpdate = jest.fn().mockImplementation(() => ({
            exec: jest.fn().mockResolvedValueOnce({
                id: 0,
                save: jest.fn().mockResolvedValueOnce(mockedReq.body)
            })
        }))

        await postsController.updateView(mockedReq,mockedRes)
    })

    it('error: missing field', async () => {
        const mockedReq = {
            body: {
                id: ''
            }
        }
        const mockedRes = {
            status: (statusNum) => {
                expect(statusNum).toEqual(400)
                return mockedRes
            },
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({
                    "message": 'All fields are required'
                })
            }
        }

        await postsController.updateView(mockedReq,mockedRes)
    })

    it('error: post not found', async () => {
        const mockedReq = {
            body: {
                id: 'testingId',
                status: 'test'
            }
        }
        const mockedRes = {
            status: (statusNum) => {
                expect(statusNum).toEqual(400)
                return mockedRes
            },
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({
                    "message": 'Invalid status'
                })
            }
        }

        await postsController.updatePostStatus(mockedReq,mockedRes)
    })

    it('error: post not found', async () => {
        const mockedReq = testUtils.updatePostReq
        const mockedRes = {
            status: (statusNum) => {
                expect(statusNum).toEqual(400)
                return mockedRes
            },
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({
                    "message": 'Post not found'
                })
            }
        }

        Post.findOneAndUpdate = jest.fn().mockImplementation(() => ({
            exec: jest.fn().mockResolvedValueOnce(undefined)
        }))

        await postsController.updateView(mockedReq,mockedRes)
    })
})

describe('DELETE /post', () => {
    it('sucessful request', async () => {
        const mockedReq = testUtils.updatePostReq
        const mockedRes = {
            json: (jsonRes) => {
                expect(jsonRes).toBe(
                    `Post ${mockedReq.body.title} with ID ${mockedReq.body.id} deleted`
                )
            }
        }

        Post.findById = jest.fn().mockImplementation(() => ({
            exec: jest.fn().mockResolvedValueOnce({
                id: 0,
                deleteOne: jest.fn().mockResolvedValueOnce({
                    _id: mockedReq.body.id,
                    title: mockedReq.body.title,
                })
            })
        }))

        await postsController.deletePost(mockedReq,mockedRes)
    })

    it('error: missing field', async () => {
        const mockedReq = { body: { id: '' } }
        const mockedRes = {
            status: (statusNum) => {
                expect(statusNum).toEqual(400)
                return mockedRes
            },
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({
                    "message": 'Post ID required'
                })
            }
        }

        await postsController.deletePost(mockedReq,mockedRes)
    })

    it('error: post not found', async () => {
        const mockedReq = testUtils.updatePostReq
        const mockedRes = {
            status: (statusNum) => {
                expect(statusNum).toEqual(400)
                return mockedRes
            },
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({
                    "message": 'Post not found'
                })
            }
        }

        Post.findById = jest.fn().mockImplementation(() => ({
            exec: jest.fn().mockResolvedValueOnce(undefined)
        }))

        await postsController.deletePost(mockedReq,mockedRes)
    })
})