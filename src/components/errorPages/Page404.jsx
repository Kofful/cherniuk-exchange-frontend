import {FormattedMessage} from "react-intl";

const Page404 = () => {
    return (
        <h1>
            <FormattedMessage
                id="page.not.found"
                defaultMessage="Page Not Found"
            />
        </h1>
    );
};

export default Page404;
