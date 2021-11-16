import {action, makeObservable, observable} from "mobx";

export class StickerStore {
    stickers = null;
    isLoading = false;

    constructor() {
        makeObservable(this, {
            stickers: observable,
            isLoading: observable,
            updateStickers: action,
            setIsLoading: action
        });
    }

    updateStickers = data => {
        this.stickers = data;
        this.isLoading = false;
    }

    setIsLoading = isLoading => {
        this.isLoading = isLoading
    }

}

export default StickerStore;
