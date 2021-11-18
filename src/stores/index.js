import UserStore from "./UserStore";
import {createContext, useContext} from "react";
import StickerStore from "./StickerStore";
import LocaleStore from "./LocaleStore";

export class Store {
    userStore;
    stickerStore;
    localeStore;

    constructor() {
        this.userStore = new UserStore();
        this.stickerStore = new StickerStore();
        this.localeStore = new LocaleStore();
    }
}

export const store = new Store();
export const StoreContext = createContext({});
export const StoreProvider = StoreContext.Provider;

export const useStore = () => useContext(StoreContext);
