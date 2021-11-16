import * as Yup from "yup";

const name = Yup.string()
    .required("Sticker name is required!");

const coefficient = Yup.number()
    .required("Sticker coefficient is required!")
    .typeError("Coefficient must be a number!")
    .integer("Sticker coefficient must be an integer!")
    .min(0, "Sticker coefficient must be 0 or greater!")
    .max(100000, "Sticker coefficient must be 100,000 or less!");

const stickerPath = Yup.string()
    .required("Sticker image is required!");

const sticker = Yup.mixed()
    .required("Sticker image is required!")

export const stickerSchema = Yup.object().shape({
    name,
    coefficient,
    stickerPath,
    sticker
});
