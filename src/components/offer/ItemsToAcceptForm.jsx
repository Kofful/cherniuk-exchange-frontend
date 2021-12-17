import {FormattedMessage} from "react-intl";

const ItemsToAcceptForm = () => {
    return (
        <div className="w-50">
            <h3>
                <FormattedMessage
                    id="stickers.to.accept"
                    defaultMessage="Stickers you accept"
                    description="Label for stickers user accepts"
                />
            </h3>
        </div>
    );
};

export default ItemsToAcceptForm;
