import UserStore from "./UserStore";
import {createContext, useContext} from "react";

export class Store {
    userStore

    constructor() {
        this.userStore = new UserStore();
    }
}

export const store = new Store();
export const StoreContext = createContext({});
export const StoreProvider = StoreContext.Provider;

export const useStore = () => useContext(StoreContext);
