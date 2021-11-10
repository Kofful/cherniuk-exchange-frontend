import {action, makeObservable, observable} from "mobx";

export class UserStore {
    user = null;

    constructor() {
        makeObservable(this, {
            user: observable,
            setUser: action,
        });
    }

    setUser = data => {
        this.user = data;
    }

}
export default UserStore;
