import Router from "../router/Router";
import {useStore} from "../../stores";
import {IntlProvider} from "react-intl";
import {observer} from "mobx-react";
import {useEffect} from "react";

const IntlWrapper = () => {
    const {localeStore} = useStore();

    useEffect(() => {
        const defaultLocale = "ru";
        const chosenLocale = window.localStorage.getItem("locale");

        if(chosenLocale) {
            localeStore.updateLocale(chosenLocale);
        } else {
            localeStore.updateLocale(defaultLocale);
        }
    });

    return (
        <IntlProvider locale={localeStore.locale} messages={localeStore.messages}>
            <Router/>
        </IntlProvider>
    );
};

export default observer(IntlWrapper);
