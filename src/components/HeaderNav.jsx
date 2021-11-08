import {withCookies} from "react-cookie";

const HeaderNav = props => {
    console.log("token", props.cookies.get("token"))
    //temporary log for checking when cookies refresh
    return (
        <h1>HEADER</h1>
    )
}

export default withCookies(HeaderNav);
