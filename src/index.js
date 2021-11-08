import {render} from "react-dom";
import {BrowserRouter} from "react-router-dom";
import Routes from "./routes";
import HeaderNav from "./components/HeaderNav";
import {ToastProvider} from "react-toast-notifications";

const rootElement = document.getElementById("root");
render(
    <>
        <HeaderNav/>
        <ToastProvider>
            <BrowserRouter>
                <Routes/>
            </BrowserRouter>
        </ToastProvider>
    </>,
    rootElement
);