const {useCookies} = require("react-cookie");

const HeaderNav = () => {
    const [cookies] = useCookies();
    console.log("token", cookies.token)
    //temporary log for checking when cookies refresh
    return (
        <h1>HEADER</h1>
    );
};

export default HeaderNav;
