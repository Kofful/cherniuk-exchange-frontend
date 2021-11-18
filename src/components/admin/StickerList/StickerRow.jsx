import TableDataEditable from "./TableDataEditable";
import PropTypes from "prop-types";
import {getImage} from "../../../services/imageService";

const StickerRow = ({sticker, updateSticker}) => {
    const updateField = (field, newData) => {
        newData = newData.trim();
        if (newData.trim() !== "") {
            const newSticker = JSON.parse(JSON.stringify(sticker));
            switch (field) {
                case "coefficient":
                    newData = parseInt(newData);
                    if (!isNaN(newData)) {
                        newSticker[field] = newData;
                        updateSticker(field, newSticker);
                    }
                    break;
                case "name":
                    newSticker[field] = newData;
                    updateSticker(field, newSticker);
                    break;
                default:
            }
        }
    };

    return (
        <div className="d-flex border border-top-0 border-dark">
            <div className="col-1">{sticker.id}</div>
            <div className="col-3"><img src={getImage(sticker.pathSmall)} alt="Sticker"/></div>
            <TableDataEditable
                data={sticker.name}
                field="name"
                updateField={updateField}
            />
            <TableDataEditable
                data={sticker.coefficient.toString()}
                field="coefficient"
                updateField={updateField}
            />
        </div>
    );
};

StickerRow.propTypes = {
    sticker: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        path: PropTypes.string,
        pathSmall: PropTypes.string,
        coefficient: PropTypes.number,
        dirty: PropTypes.shape({
            name: PropTypes.bool,
            coefficient: PropTypes.bool
        })
    }),
    updateSticker: PropTypes.func
};
StickerRow.defaultProps = {
    sticker: {
        id: 0,
        name: "",
        path: "",
        pathSmall: "",
        coefficient: 0,
        dirty: {
            name: false,
            coefficient: false
        }
    },
    updateSticker: () => {
    },
};

export default StickerRow;
