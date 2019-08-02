const db = require('../database/dbConfig');
const Users = require('./model-route');

beforeEach(async () => {
    await db('users').truncate();
});

describe('[POST] /register, insert user', () => {
    it('is able to register a new user to the db!', async () => {
        let users = await Users.getAll();
        expect(users).toHaveLength(0);

        await Users.registerUser({ username: 'Jane', password: 12345 });
        await Users.registerUser({ username: 'Ben', password: 12345 });

        users = await Users.getAll();
        expect(users).toHaveLength(2);
    });

    it('is able to insert the correct user', async () => {
        let users = await Users.getAll();
        expect(users).toHaveLength(0);

        await Users.registerUser({ username: 'Jane', password: 12345  });
        await Users.registerUser({ username: 'Ben', password: 12345 });
        users = await Users.getAll();

        expect(users[0].username).toBe('Jane');
        expect(users[1].username).toBe('Ben');
    });

    it('returns the newly inserted user', async () => {
        const user = await Users.registerUser({ username: 'Jane', password: 12345 });
        expect(user[0].username).toBe('Jane');
    });
});