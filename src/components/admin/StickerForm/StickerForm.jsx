import {Formik} from "formik";
import {stickerSchema} from "../../../utils/validation/sticker";
import Input from "../../form/Input";
import {useState} from "react";
import {FormattedMessage, useIntl} from "react-intl";
import {addSticker} from "../../../api/stickers";

const StickerForm = () => {
    const defaultData = {
        name: "",
        coefficient: 1,
        stickerPath: "",
        sticker: null
    };

    const intl = useIntl();

    const [messages, setMessages] = useState([]);

    const submit = async (values, {resetForm, setSubmitting}) => {
        try {
            await addSticker(values);
            resetForm();
            setSubmitting(false);
        } catch (error) {
            if (error.status === 400) {
                setMessages(error.data.slice());
            } else {
                setMessages([
                    intl.formatMessage({
                        id: "something.went.wrong",
                        defaultMessage: "Something went wrong"
                    })
                ]);
            }
        }
    };

    return (
        <div className="d-flex flex-column align-items-center">
            <h1 className="mt-5">
                <FormattedMessage
                    id="admin.add.sticker"
                    defaultMessage="Add new sticker"
                />
            </h1>
            <Formik
                initialValues={defaultData}
                validationSchema={stickerSchema}
                onSubmit={submit}
            >
                {({
                      values,
                      errors,
                      touched,
                      setFieldValue,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting
                  }) => (
                    <form onSubmit={handleSubmit}
                          className="d-block mt-3 mb-5 p-3 w-100 border border-secondary rounded">
                        <Input
                            field="stickerPath"
                            value={values.stickerPath}
                            errors={errors.stickerPath}
                            touched={touched.stickerPath}
                            events={{
                                handleSubmit,
                                handleBlur,
                                handleChange: (e) => {
                                    setFieldValue("sticker", e.target.files[0]);
                                    handleChange(e);
                                }
                            }}
                        />
                        <Input
                            field="name"
                            value={values.name}
                            errors={errors.name}
                            touched={touched.name}
                            events={{
                                handleSubmit,
                                handleBlur,
                                handleChange
                            }}
                        />
                        <Input
                            field="coefficient"
                            value={values.coefficient}
                            errors={errors.coefficient}
                            touched={touched.coefficient}
                            events={{
                                handleSubmit,
                                handleBlur,
                                handleChange
                            }}
                        />
                        <div className="mt-4 mb-4 d-flex flex-column">
                            <button className="btn btn-success w-50 align-self-center" type={"submit"}
                                    disabled={isSubmitting}>
                                <FormattedMessage
                                id="admin.add"
                                defaultMessage="Add"
                                />
                            </button>
                            {messages.map(message =>
                                    <span className="text-danger align-self-center" key={message}>
                                {message}
                            </span>
                            )}
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default StickerForm;
