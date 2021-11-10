import {route} from "../routes";
import {Link} from "react-router-dom";
import {observer} from "mobx-react";
import {useStore} from "../stores";

const HeaderNav = () => {
    const {userStore} = useStore();
    const {user} = userStore;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <div className="collapse navbar-collapse justify-content-between">
                    <Link className="navbar-brand" to={route("home")}>Exchange</Link>
                    <div>
                        {user && <Link to={route("logout")} className="btn btn-danger">Log out</Link>}

                        {!user && <Link to={route("login")} className="btn btn-success">Log in</Link>}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default observer(HeaderNav);
