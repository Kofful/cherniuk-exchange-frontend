import UserStore from "./UserStore";
import {createContext, useContext} from "react";
import StickerStore from "./StickerStore";

export class Store {
    userStore;
    stickerStore;

    constructor() {
        this.userStore = new UserStore();
        this.stickerStore = new StickerStore();
    }
}

export const store = new Store();
export const StoreContext = createContext({});
export const StoreProvider = StoreContext.Provider;

export const useStore = () => useContext(StoreContext);
