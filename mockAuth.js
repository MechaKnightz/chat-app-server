const Role = require('./_models/role');
const { secret } = require('./config.json');
const jwt = require('jsonwebtoken');

const users = [
    { id: 1, username: 'constan', password: 'constan', firstName: 'Admin', lastName: 'User', role: Role.Admin },
    { id: 2, username: 'jessie', password: 'jessie', firstName: 'Normal', lastName: 'User', role: Role.User }
];

module.exports = {
    authenticate
};

function getUser(id)
{
    return users.find(u => u.id === id);
}


function authenticate(token) {
    console.log(token)
    var decodedToken = jwt.verify(token, secret);
    console.log(decodedToken)
    var user = getUser(decodedToken.sub);
    console.log(user)
    return user;
}