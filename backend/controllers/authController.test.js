const User = require('../models/User')
const authController = require('./authController')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

describe('POST /auth', () => {
    it('sucessful request', async () => {
        const mockedReq = { 
            body: {
                username: 'testingUser',
                password: 'testingPassword'
            }
        }
        const mockedRes = { 
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({"accessToken": "testingToken"})
            },
            cookie: jest.fn()
        }

        User.findOne = jest.fn().mockImplementation(() => ({
            exec: jest.fn().mockResolvedValueOnce({
                username: 'testingUser',
                password: 'testingPassword',
                active: true
            })
        }))

        bcrypt.compare = jest.fn().mockResolvedValueOnce(true)

        jwt.sign = jest.fn().mockImplementation(() => 'testingToken')

        await authController.login(mockedReq,mockedRes)
    })

    it('error: missing field', async () => {
        let mockedReq = { 
            body: {
                username: 'testingUser',
                password: ''
            }
        }
        const mockedRes = { 
            status: (statusNum) => {
                expect(statusNum).toEqual(400)
                return mockedRes
            },
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({"message": 'All fields are required'})
            }
        }

        await authController.login(mockedReq,mockedRes)
        mockedReq.body.password = 'testingPassword'
        mockedReq.body.username = ''
        await authController.login(mockedReq,mockedRes)
    })

    it('error: user not found', async () => {
        const mockedReq = { 
            body: {
                username: 'testingUser',
                password: 'testingPassword'
            }
        }
        const mockedRes = { 
            status: (statusNum) => {
                expect(statusNum).toEqual(401)
                return mockedRes
            },
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({"message": 'Unauthorized'})
            }
        }

        User.findOne = jest.fn().mockImplementation(() => ({
            exec: jest.fn().mockResolvedValueOnce(undefined)
        }))

        await authController.login(mockedReq,mockedRes)
    })

    it('error: user not active', async () => {
        const mockedReq = { 
            body: {
                username: 'testingUser',
                password: 'testingPassword'
            }
        }
        const mockedRes = { 
            status: (statusNum) => {
                expect(statusNum).toEqual(401)
                return mockedRes
            },
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({"message": 'Unauthorized'})
            }
        }

        User.findOne = jest.fn().mockImplementation(() => ({
            exec: jest.fn().mockResolvedValueOnce({
                username: 'testingUser',
                password: 'testingPassword',
                active: false
            })
        }))

        await authController.login(mockedReq,mockedRes)
    })

    it('error: invalid password', async () => {
        const mockedReq = { 
            body: {
                username: 'testingUser',
                password: 'testingPassword'
            }
        }
        const mockedRes = { 
            status: (statusNum) => {
                expect(statusNum).toEqual(401)
                return mockedRes
            },
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({"message": 'Unauthorized'})
            }
        }

        User.findOne = jest.fn().mockImplementation(() => ({
            exec: jest.fn().mockResolvedValueOnce({
                username: 'testingUser',
                password: 'testingPassword',
                active: true
            })
        }))

        bcrypt.compare = jest.fn().mockResolvedValueOnce(false)

        await authController.login(mockedReq,mockedRes)
    })
})

describe('GET /auth/refresh', () => {
    it('sucessful request', async () => {
        const mockedReq = { 
            cookies: {
                jwt: 'testingJWT'
            }
        }
        const mockedRes = { 
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({"accessToken": "testingToken"})
            },
        }

        const decodedValue = { username: 'testingUser', roles: ['Author'] }
        const verifySpy = jest.spyOn(jwt, 'verify')
            .mockImplementationOnce((token, getPublicKey, callback) => {
                callback(null, decodedValue);
            });

        User.findOne = jest.fn().mockResolvedValueOnce({
            id: 0, 
            username: decodedValue.username
        })

        jwt.sign = jest.fn().mockImplementation(() => 'testingToken')

        await authController.refresh(mockedReq,mockedRes)
    })

    it('error: missing JWT', async () => {
        const mockedReq = { 
            cookies: {
                jwt: ''
            }
        }
        const mockedRes = { 
            status: (statusNum) => {
                expect(statusNum).toEqual(401)
                return mockedRes
            },
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({"message": "Unauthorized"})
            },
        }

        await authController.refresh(mockedReq,mockedRes)
    })

    it('error: decode err', async () => {
        const mockedReq = { 
            cookies: {
                jwt: 'testingJWT'
            }
        }
        const mockedRes = { 
            status: (statusNum) => {
                expect(statusNum).toEqual(401)
                return mockedRes
            },
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({"message": "Forbidden"})
            },
        }

        const verifySpy = jest.spyOn(jwt, 'verify')
            .mockImplementationOnce((token, getPublicKey, callback) => {
                callback('err', null);
            });

        await authController.refresh(mockedReq,mockedRes)
    })

    it('error: user not found', async () => {
        const mockedReq = { 
            cookies: {
                jwt: 'testingJWT'
            }
        }
        const mockedRes = { 
            status: (statusNum) => {
                expect(statusNum).toEqual(401)
                return mockedRes
            },
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({"message": "Unauthorized"})
            },
        }

        const decodedValue = { username: 'testingUser', roles: ['Author'] }
        const verifySpy = jest.spyOn(jwt, 'verify')
            .mockImplementationOnce((token, getPublicKey, callback) => {
                callback(null, decodedValue);
            });

        User.findOne = jest.fn().mockResolvedValueOnce(undefined)

        await authController.refresh(mockedReq,mockedRes)
    })
})

describe('POST /auth/logout', () => {
    it('sucessful request', async () => {
        const mockedReq = { 
            cookies: {
                jwt: 'testingJWT'
            }
        }
        const mockedRes = { 
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({"message": 'Cookie cleared'})
            },
            clearCookie: jest.fn()
        }

        await authController.logout(mockedReq,mockedRes)
    })

    it('204 status', async () => {
        const mockedReq = { 
            cookies: {
                jwt: ''
            }
        }
        const mockedRes = {
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({"message": 'Cookie cleared'})
            },
            sendStatus: (status) => {
                expect(status).toEqual(204)
            }
        }

        await authController.logout(mockedReq,mockedRes)
    })
})