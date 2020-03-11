export class User {
    userName: String;
    userPassword: String;
    videoId: Number;

    constructor() {
    }

    public setuserName(userName: String) {
        this.userName = userName;
    }
 
    public getUserName(userName: String) {
        return this.userName;
    }

    public setUserPassword(userPassword: String) {
        this.userPassword = userPassword;
    }

    public getUserPassword(userPassword: String) {
        return this.userPassword;
    }
    
}
