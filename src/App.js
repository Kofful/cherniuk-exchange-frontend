import {ToastProvider} from "react-toast-notifications";
import {StoreProvider, store} from "./stores";
import Router from "./components/router/Router";

const App = () => {
    return (
        <ToastProvider>
            <StoreProvider value={store}>
                <Router/>
            </StoreProvider>
        </ToastProvider>
    );
};

export default App;
