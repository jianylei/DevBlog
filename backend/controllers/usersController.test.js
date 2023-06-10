const User = require('../models/User');
const testUtils = require('./testUtils');
const usersController = require('./usersController');
const bcrypt = require('bcrypt');

describe('GET /users', () => {
    it('sucessful request', async () => {
        const mockedRes = {
            json: (jsonRes) => {
                expect(jsonRes.length).toEqual(3);
            },
        };

        User.find = jest.fn().mockImplementation(() => ({
            select: jest.fn().mockImplementation(() => ({
                lean: jest.fn().mockResolvedValueOnce([{ id: 1 }, { id: 2 }, { id: 3 }]),
            })),
        }));

        await usersController.getAllUsers({}, mockedRes);
    });

    it('error: no users found', async () => {
        const mockedRes = {
            status: (statusNum) => {
                expect(statusNum).toEqual(400);
                return mockedRes;
            },
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({ message: 'No users found' });
            },
        };

        User.find = jest.fn().mockImplementation(() => ({
            select: jest.fn().mockImplementation(() => ({
                lean: jest.fn().mockResolvedValueOnce([]),
            })),
        }));

        await usersController.getAllUsers({}, mockedRes);
    });

    it('error: db return undefined', async () => {
        const mockedRes = {
            status: (statusNum) => {
                expect(statusNum).toEqual(400);
                return mockedRes;
            },
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({ message: 'No users found' });
            },
        };

        User.find = jest.fn().mockImplementation(() => ({
            select: jest.fn().mockImplementation(() => ({
                lean: jest.fn().mockResolvedValueOnce(undefined),
            })),
        }));

        await usersController.getAllUsers({}, mockedRes);
    });
});

describe('POST /users', () => {
    it('sucessful request', async () => {
        const mockedReq = testUtils.createUserReq;
        const mockedRes = {
            status: (statusNum) => {
                expect(statusNum).toEqual(201);
                return mockedRes;
            },
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({
                    message: `New user ${mockedReq.body.username} created`,
                });
            },
        };

        User.findOne = jest.fn().mockImplementation(() => ({
            collation: jest.fn().mockImplementation(() => ({
                lean: jest.fn().mockImplementation(() => ({
                    exec: jest.fn().mockResolvedValueOnce(undefined),
                })),
            })),
        }));

        User.create = jest.fn().mockResolvedValueOnce({ id: 0 });

        bcrypt.hash = jest.fn().mockResolvedValueOnce('hashedpassword');

        await usersController.createNewUser(mockedReq, mockedRes);
    });

    it('error: missing body field', async () => {
        let mockedReq = testUtils.createUserReq;
        const mockedRes = {
            status: (statusNum) => {
                expect(statusNum).toEqual(400);
                return mockedRes;
            },
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({ message: 'All fields are required' });
            },
        };

        mockedReq.body.password = '';
        await usersController.createNewUser(mockedReq, mockedRes);
        mockedReq.body.password = 'testing123';
        mockedReq.body.username = '';
        await usersController.createNewUser(mockedReq, mockedRes);
        mockedReq.body.username = 'testing123';
        mockedReq.body.email = '';
        await usersController.createNewUser(mockedReq, mockedRes);
        mockedReq.body.email = 'email@email.com';
    });

    it('error: duplicate username', async () => {
        const mockedReq = testUtils.createUserReq;

        const mockedRes = {
            status: (statusNum) => {
                expect(statusNum).toEqual(409);
                return mockedRes;
            },
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({ message: 'Duplicate username' });
            },
        };

        User.findOne = jest.fn().mockImplementation(() => ({
            collation: jest.fn().mockImplementation(() => ({
                lean: jest.fn().mockImplementation(() => ({
                    exec: jest.fn().mockResolvedValueOnce({ id: 0 }),
                })),
            })),
        }));

        await usersController.createNewUser(mockedReq, mockedRes);
    });

    it('error: db error', async () => {
        const mockedReq = testUtils.createUserReq;
        const mockedRes = {
            status: (statusNum) => {
                expect(statusNum).toEqual(400);
                return mockedRes;
            },
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({ message: 'Invalid user data received' });
            },
        };

        User.findOne = jest.fn().mockImplementation(() => ({
            collation: jest.fn().mockImplementation(() => ({
                lean: jest.fn().mockImplementation(() => ({
                    exec: jest.fn().mockResolvedValueOnce(undefined),
                })),
            })),
        }));

        User.create = jest.fn().mockResolvedValueOnce(undefined);

        bcrypt.hash = jest.fn().mockResolvedValueOnce('hashedpassword');

        await usersController.createNewUser(mockedReq, mockedRes);
    });
});

describe('PATCH /users', () => {
    it('sucessful request', async () => {
        const mockedReq = testUtils.updateUserReq;
        const mockedRes = {
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({ message: `${mockedReq.body.username} updated` });
            },
        };

        User.findOne = jest.fn().mockImplementation(() => ({
            collation: jest.fn().mockImplementation(() => ({
                lean: jest.fn().mockImplementation(() => ({
                    exec: jest.fn().mockResolvedValueOnce(undefined),
                })),
            })),
        }));

        User.findById = jest.fn().mockImplementation(() => ({
            exec: jest.fn().mockResolvedValueOnce({
                id: mockedReq.body.id,
                save: jest.fn().mockResolvedValueOnce({ username: mockedReq.body.username }),
            }),
        }));

        bcrypt.hash = jest.fn().mockResolvedValueOnce('hashedpassword');

        await usersController.updateUser(mockedReq, mockedRes);
    });

    it('error: missing body field', async () => {
        let mockedReq = testUtils.updateUserReq;
        const mockedRes = {
            status: (statusNum) => {
                expect(statusNum).toEqual(400);
                return mockedRes;
            },
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({ message: 'Please enter all required fields' });
            },
        };

        mockedReq.body.lastName = '';
        await usersController.updateUser(mockedReq, mockedRes);
        mockedReq.body.lastName = 'testingLast';
        mockedReq.body.firstName = '';
        await usersController.updateUser(mockedReq, mockedRes);
        mockedReq.body.firstName = 'testingFirst';
        mockedReq.body.id = '';
        await usersController.updateUser(mockedReq, mockedRes);
        mockedReq.body.id = 'testing123';
        mockedReq.body.username = '';
        await usersController.updateUser(mockedReq, mockedRes);
        mockedReq.body.username = 'testing123';
        mockedReq.body.role = '';
        await usersController.updateUser(mockedReq, mockedRes);
        mockedReq.body.role = 'Author';
        mockedReq.body.active = 'test';
        await usersController.updateUser(mockedReq, mockedRes);
        mockedReq.body.active = true;
    });

    it('error: user does not exist to update', async () => {
        const mockedReq = testUtils.updateUserReq;
        const mockedRes = {
            status: (statusNum) => {
                expect(statusNum).toEqual(400);
                return mockedRes;
            },
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({ message: 'User not found' });
            },
        };

        User.findById = jest.fn().mockImplementation(() => ({
            exec: jest.fn().mockResolvedValueOnce(undefined),
        }));

        await usersController.updateUser(mockedReq, mockedRes);
    });

    it('error: duplicate username', async () => {
        const mockedReq = testUtils.updateUserReq;
        const mockedRes = {
            status: (statusNum) => {
                expect(statusNum).toEqual(409);
                return mockedRes;
            },
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({ message: 'Duplicate username' });
            },
        };

        User.findOne = jest.fn().mockImplementation(() => ({
            collation: jest.fn().mockImplementation(() => ({
                lean: jest.fn().mockImplementation(() => ({
                    exec: jest.fn().mockResolvedValueOnce({ _id: 0 }),
                })),
            })),
        }));

        User.findById = jest.fn().mockImplementation(() => ({
            exec: jest.fn().mockResolvedValueOnce({ id: mockedReq.body.id }),
        }));

        await usersController.updateUser(mockedReq, mockedRes);
    });
});

describe('DELETE /users', () => {
    it('sucessful request', async () => {
        const id = 'testingId';
        const username = 'testingUsername';
        const mockedReq = { body: { id: 'testingId' } };
        const mockedRes = {
            json: (jsonRes) => {
                expect(jsonRes).toBe(`Username ${username} with ID ${id} deleted`);
            },
        };

        User.findById = jest.fn().mockImplementation(() => ({
            exec: jest.fn().mockResolvedValueOnce({
                id: mockedReq.body.id,
                deleteOne: jest.fn().mockResolvedValueOnce({
                    _id: id,
                    username: username,
                }),
            }),
        }));

        await usersController.deleteUser(mockedReq, mockedRes);
    });

    it('error: id not provided', async () => {
        const mockedReq = { body: { id: '' } };
        const mockedRes = {
            status: (statusNum) => {
                expect(statusNum).toEqual(400);
                return mockedRes;
            },
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({ message: 'User ID required' });
            },
        };

        await usersController.deleteUser(mockedReq, mockedRes);
    });

    it('error: user not found', async () => {
        const mockedReq = { body: { id: 'testingId' } };
        const mockedRes = {
            status: (statusNum) => {
                expect(statusNum).toEqual(400);
                return mockedRes;
            },
            json: (jsonRes) => {
                expect(jsonRes).toStrictEqual({ message: 'User not found' });
            },
        };

        User.findById = jest.fn().mockImplementation(() => ({
            exec: jest.fn().mockResolvedValueOnce(undefined),
        }));

        await usersController.deleteUser(mockedReq, mockedRes);
    });
});
