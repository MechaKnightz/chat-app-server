import { LoginUser } from './loginUser';
import { Role } from './role';

export class MockAuth {
    private static users: LoginUser[] = [
        { id: 1, username: 'constan', password: 'constan', firstName: 'Admin', lastName: 'User', role: Role.Admin },
        { id: 2, username: 'jessie', password: 'jessie', firstName: 'Normal', lastName: 'User', role: Role.User }
    ];

    public static authorize(inputName: string, inputPassword:string ): boolean
    {
        var user = this.users.filter(x => x.username == inputName && x.password == inputPassword)[0];
        console.log('Authorized user %s.', user.username);
        if(user != null) return true;
        return false;
    }

    public static getUser(inputName :string) : LoginUser
    {
        return this.users.filter(x => x.username == inputName)[0];
    }
}