import {render} from "react-dom";
import {BrowserRouter} from "react-router-dom";
import Routes from "./routes";
import HeaderNav from "./components/HeaderNav";
import {ToastProvider} from "react-toast-notifications";

const rootElement = document.getElementById("root");
render(
    <>
        <ToastProvider>
            <BrowserRouter>
                <HeaderNav/>
                <Routes/>
            </BrowserRouter>
        </ToastProvider>
    </>,
    rootElement
);