import * as yup from "yup";

export const storeStudent = yup.object().shape({
  name: yup
    .string()
    .required("You need to provide a name to register a student")
    .max(128, "max name length is 128 characters"),
  birthDate: yup
    .string()
    .required("You need to provide a birthDate to register a student"),
  address: yup
    .string()
    .required("You need to provide a address to register a student")
    .max(300, "max address length is 300 characters"),
});

export const updateStudent = yup.object().shape({
  name: yup.string().max(128, "max name length is 128 characters"),
  address: yup.string().max(300, "max address length is 300 characters"),
});

export const addStudentRelative = yup.object().shape({
  studentId: yup
    .string()
    .required("You need to provide a studentId")
    .length(36, "studentId length is 36 characters"),
  relativeId: yup
    .string()
    .required("You need to provide a relativeId")
    .length(36, "relativeId length is 36 characters"),
  parentLevel: yup
    .string()
    .required("You need to provide a parentLevel")
    .max(50, "max parentLevel length is 50 characters"),
});

export const addStudentToClassroom = yup.object().shape({
  classroomId: yup
    .string()
    .required("You need to provide a classroomId")
    .length(36, "classroomId length is 36 characters"),
});
