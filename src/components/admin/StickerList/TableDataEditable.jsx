import PropTypes from "prop-types";
import {useState} from "react";


const TableDataEditable = ({data, field, updateField, isDirty}) => {
    const [isEditing, setIsEditing] = useState(false);

    const saveChanges = ({target}) => {
        if(data !== target.value) {
            updateField(field, target.value);
        }
        setIsEditing(false);
    };

    const onKeyDown = e => {
        if(e.key === "Enter") {
            saveChanges(e);
        }
    };

    return (
        <div className="col-4">
            {!isEditing && <div className={`w-100 h-100 d-flex align-items-center ${isDirty ? "text-danger" : ""}`} onClick={() => setIsEditing(true)}>
                <div>{data}</div>
            </div>}
            {isEditing && <input className="w-100 h-100 bg-dark text-white form-control"
                                 onBlur={saveChanges}
                                 onKeyDown={onKeyDown}
                                 defaultValue={data}
                                 name={field}
                                 autoFocus={true}/>}
        </div>
    );
};

TableDataEditable.propTypes = {
    data: PropTypes.string,
    field: PropTypes.string,
    updateField: PropTypes.func,
    isDirty: PropTypes.bool
};

TableDataEditable.defaultProps = {
    data: "",
    field: "",
    updateField: () => {},
    isDirty: false
}

export default TableDataEditable;
