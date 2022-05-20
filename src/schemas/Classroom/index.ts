import * as yup from "yup";

export const storeClassroom = yup.object().shape({
  name: yup
    .string()
    .required("You need to provide a name to register a classroom")
    .max(128, "max name length is 128 characters"),
  teacherId: yup.string().length(36, "teacherId length is 36 characters"),
});

export const updateClassroom = yup.object().shape({
  name: yup.string().max(128, "max name length is 128 characters"),
  teacherId: yup.string().length(36, "teacherId length is 36 characters"),
});
