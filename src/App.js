import {ToastProvider} from "react-toast-notifications";
import {StoreProvider, store} from "./stores";
import IntlWrapper from "./components/localization/IntlWrapper";

const App = () => {
    return (
        <ToastProvider>
            <StoreProvider value={store}>
                <IntlWrapper/>
            </StoreProvider>
        </ToastProvider>
    );
};

export default App;
