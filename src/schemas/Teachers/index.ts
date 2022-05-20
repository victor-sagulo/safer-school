import * as yup from "yup";

export const storeTeacher = yup.object().shape({
  name: yup
    .string()
    .required("You need to provide a name to register a teacher")
    .max(128, "max name length is 128 characters"),
  email: yup
    .string()
    .required("Please provide a email address")
    .email("Please provide a valid email address"),
});

export const updateTeacher = yup.object().shape({
  name: yup.string().max(128, "max name length is 128 characters"),
  email: yup.string().email("Please provide a valid email address"),
});
