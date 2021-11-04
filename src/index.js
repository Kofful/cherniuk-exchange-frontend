import {render} from "react-dom";
import {BrowserRouter} from "react-router-dom";
import Routes from "./routes";
import HeaderNav from "./components/HeaderNav";

const rootElement = document.getElementById("root");
render(
    <>
        <HeaderNav/>
        <BrowserRouter>
            <Routes/>
        </BrowserRouter>
    </>,
    rootElement
);