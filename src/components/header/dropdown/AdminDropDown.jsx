import {Link} from "react-router-dom";
import {route} from "../../../routes";
import {FormattedMessage} from "react-intl";

const AdminDropDown = () => {
    return (
        <li className="dropdown-item p-0">
            <Link to={route("admin")} className="btn w-100 text-left text-reset text-decoration-none">
                <FormattedMessage
                    id="link.admin"
                    defaultMessage={"Administration"}
                />
            </Link>
        </li>
    );
};

export default AdminDropDown;
