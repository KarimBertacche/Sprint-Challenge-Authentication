const db = require('../database/dbConfig');

module.exports = {
    registerUser,
    getUserBy
};

function registerUser(user) {
    return db('users').insert(user).then(id => {
        const [ userId ] = id;
        return db('users').select('users.id', 'users.username').where({ id: userId });
    });
}

function getUserBy(filter) {
    return db('users').where(filter).first();
}