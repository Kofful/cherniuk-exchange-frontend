import Router from "../router/Router";
import {useStore} from "../../stores";
import {IntlProvider} from "react-intl";
import {observer} from "mobx-react";
import {useEffect} from "react";

const IntlWrapper = () => {
    const {localeStore} = useStore();

    const defaultLocale = "ru";

    useEffect(() => {
        const chosenLocale = window.localStorage.getItem("locale");

        if(chosenLocale) {
            localeStore.updateLocale(chosenLocale);
        } else {
            localeStore.updateLocale(defaultLocale);
        }
    }, []);

    const locale = localeStore.locale === "" ? defaultLocale : localeStore.locale;

    return (
        <IntlProvider locale={locale} messages={localeStore.messages} onError={() => {}}>
            <Router/>
        </IntlProvider>
    );
};

export default observer(IntlWrapper);
