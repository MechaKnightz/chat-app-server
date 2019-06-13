"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var role_1 = require("./role");
var MockAuth = /** @class */ (function () {
    function MockAuth() {
    }
    MockAuth.authorize = function (inputName, inputPassword) {
        var user = this.users.filter(function (x) { return x.username == inputName && x.password == inputPassword; })[0];
        console.log('Authorized user %s.', user.username);
        if (user != null)
            return true;
        return false;
    };
    MockAuth.getUser = function (inputName) {
        return this.users.filter(function (x) { return x.username == inputName; })[0];
    };
    MockAuth.users = [
        { id: 1, username: 'constan', password: 'constan', firstName: 'Admin', lastName: 'User', role: role_1.Role.Admin },
        { id: 2, username: 'jessie', password: 'jessie', firstName: 'Normal', lastName: 'User', role: role_1.Role.User }
    ];
    return MockAuth;
}());
exports.MockAuth = MockAuth;
