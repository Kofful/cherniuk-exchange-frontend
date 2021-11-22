import {route} from "../../routes";
import {Link} from "react-router-dom";
import LanguagePicker from "../localization/LanguagePicker";
import HeaderDropDown from "./dropdown/HeaderDropDown";

const HeaderNav = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <div className="collapse navbar-collapse justify-content-between">
                    <Link className="navbar-brand" to={route("home")}>Exchange</Link>
                    <div className="d-flex">
                        <LanguagePicker/>
                        <HeaderDropDown/>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default HeaderNav;
