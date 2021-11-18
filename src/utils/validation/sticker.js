import * as Yup from "yup";

const name = Yup.string()
    .required("sticker.name.required");

const coefficient = Yup.number()
    .required("sticker.coefficient.required")
    .typeError("sticker.coefficient.number")
    .integer("sticker.coefficient.integer")
    .min(0, "sticker.coefficient.min")
    .max(100000, "sticker.coefficient.max");

const stickerPath = Yup.string()
    .required("sticker.image.required");

const sticker = Yup.mixed()
    .required("sticker.image.required")

export const stickerSchema = Yup.object().shape({
    name,
    coefficient,
    stickerPath,
    sticker
});
