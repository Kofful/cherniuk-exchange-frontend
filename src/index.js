import { render } from "react-dom";
import {BrowserRouter} from "react-router-dom";
import Routes from "./routes";

const rootElement = document.getElementById("root");
render(
    <BrowserRouter>
        <Routes/>
    </BrowserRouter>,
    rootElement
);