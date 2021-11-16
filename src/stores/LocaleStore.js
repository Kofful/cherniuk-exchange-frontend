import {action, makeObservable, observable} from "mobx";
import locales from "../utils/localization/locales";

export class LocaleStore {
    locale = "";
    messages = {};

    constructor() {
        makeObservable(this, {
            locale: observable,
            messages: observable,
            updateLocale: action,
        });
    }

    updateLocale = data => {
        this.locale = data;
        this.messages = locales[this.locale];
    }
}

export default LocaleStore;
