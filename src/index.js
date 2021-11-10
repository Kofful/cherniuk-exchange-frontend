import {render} from "react-dom";
import {BrowserRouter} from "react-router-dom";
import Routes from "./routes";
import HeaderNav from "./components/HeaderNav";
import {ToastProvider} from "react-toast-notifications";
import {Provider as StoreProvider} from "mobx-react";

const rootElement = document.getElementById("root");
render(
    <>
        <ToastProvider>
            <StoreProvider>
                <BrowserRouter>
                    <HeaderNav/>
                    <Routes/>
                </BrowserRouter>
            </StoreProvider>
        </ToastProvider>
    </>,
    rootElement
);