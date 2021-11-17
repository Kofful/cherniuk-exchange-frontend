import {observer} from "mobx-react";
import {useStore} from "../../stores";

const LanguagePicker = () => {
    const {localeStore} = useStore();

    const locales = [
        "en",
        "ru"
    ];

    const updateLocale = ({target}) => {
        localeStore.updateLocale(target.value);
        window.localStorage.setItem("locale", target.value);
    };

    return (
        <select className="mx-3 btn btn-dark border-0 text-white text-uppercase" onChange={updateLocale} value={localeStore.locale}>
            {
                locales.map(lang => (
                    <option value={lang} key={lang}>{lang}</option>
                ))
            }
        </select>
    );
};

export default observer(LanguagePicker);
