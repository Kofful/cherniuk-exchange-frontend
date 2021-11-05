import {useValidator as useReactValidator} from "react-joi";

export function useValidator(settings) {
    const {state, setData, setExplicitField, validate} = useReactValidator(settings);

    const updateField = (fieldName, e) => {
        setData((old) => {
            let newData = {...old};
            newData[fieldName] = e.target.value;
            return newData;
        });

        validateIfDirty();
    }

    const validateIfDirty = () => {
        let dirty = true;

        Object.values(state.$data_state).forEach(field => {
            if(!field.$dirty) {
                dirty = false;
            }
        });

        if(dirty) {
            validate();
        }
    }

    return [state, updateField, setExplicitField];
}