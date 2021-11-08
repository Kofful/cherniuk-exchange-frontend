import {withCookies} from "react-cookie";

export default withCookies(function HeaderNav(props) {
    console.log("token", props.cookies.get("token"))
    //temporary log for checking when cookies refresh
    return (
        <h1>HEADER</h1>
    )
});
