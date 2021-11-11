import {action, makeObservable, observable} from "mobx";

export class UserStore {
    user = null;
    isLoading = false;

    constructor() {
        makeObservable(this, {
            user: observable,
            setUser: action,
            setIsLoading: action
        });
    }

    setUser = data => {
        this.user = data;
        this.isLoading = false;
    }

    setIsLoading = isLoading => {
        this.isLoading = isLoading
    }

}
export default UserStore;
