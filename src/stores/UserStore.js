import {action, makeObservable, observable} from "mobx";

export class User {
    username = "";

    constructor() {
        makeObservable(this, {
            username: observable,
            updateUsername: action,
        });
    }

    updateUsername = username => {
        this.username = username;
    }

}

let UserStore;

const getUserStore = () => {
    if(!UserStore) {
        UserStore = new User();
    }
    return UserStore;
};

export default getUserStore;
