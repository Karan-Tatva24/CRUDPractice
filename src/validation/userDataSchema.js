import * as Yup from "yup";

export const userDataSchema = Yup.object({
  firstName: Yup.string().required("First name is required!"),
  lastName: Yup.string().required("Last name is required!"),
  email: Yup.string()
    .email("Enter valid email!")
    .required("Email is required!"),
  phone: Yup.string()
    .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Phone number is not valid")
    .required("Phone number is required!"),
});
