import {ToastProvider} from "react-toast-notifications";
import {BrowserRouter} from "react-router-dom";
import HeaderNav from "./components/HeaderNav";
import Routes from "./routes";
import {StoreProvider, store} from "./stores";

const App = () => {
    return (
        <ToastProvider>
            <StoreProvider value={store}>
                <BrowserRouter>
                    <HeaderNav/>
                    <Routes/>
                </BrowserRouter>
            </StoreProvider>
        </ToastProvider>
    );
};

export default App;
