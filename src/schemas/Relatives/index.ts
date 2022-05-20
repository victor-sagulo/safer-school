import * as yup from "yup";

export const storeRelative = yup.object().shape({
  name: yup
    .string()
    .required("You need to provide a name to register a relative")
    .max(128, "max name length is 128 characters"),
  email: yup
    .string()
    .required("Please provide a email address")
    .email("Please provide a valid email address"),
  phone: yup
    .string()
    .required("Please provide a phone")
    .max(13, "phone max length is 13"),
});

export const updateRelative = yup.object().shape({
  name: yup.string().max(128, "max name length is 128 characters"),
  email: yup.string().email("Please provide a valid email address"),
  phone: yup.string().max(13, "phone max length is 13"),
});
