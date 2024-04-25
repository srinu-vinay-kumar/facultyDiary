// // packages import
// import { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import { Form, Button } from "react-bootstrap";

// // components import
// import Header from "./Header";

// const PasswordReset = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");

//   const sendLink = async (e) => {
//     e.preventDefault();

//     const res = await fetch("/sendpasswordlink", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email }),
//     });
//     const data = await res.json();

//     if (data.status == 201) {
//       setEmail("");
//       setMessage(true);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div>
//         <h1>Enter your Email</h1>
//         {message ? <p>Password reset link send successfully</p> : ""}
//         <Form>
//           <Form.Group className="my-2" controlId="empId">
//             <Form.Label className="form-label">Email</Form.Label>
//             <Form.Control
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             ></Form.Control>
//           </Form.Group>

//           <Button onClick={sendLink}>Send Email</Button>
//         </Form>
//       </div>
//     </>
//   );
// };

// export default PasswordReset;

// import { useFormik } from "formik";
// import * as Yup from "yup";
// import axios from "../config/axiosConfig.js";
// import { Formik } from "formik";
// import { Form, Button } from "react-bootstrap";
// const PasswordReset = () => {
//   const formik = useFormik({
//     initialValues: {
//       newPassword: "",
//       confirmPassword: "",
//     },
//     validationSchema: Yup.object({
//       newPassword: Yup.string().required("Required").min(6, "Too Short!"),
//       confirmPassword: Yup.string()
//         .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
//         .required("Required"),
//     }),
//     onSubmit: (values) => {
//       const { newPassword } = values;
//       const token = window.location.pathname.split("/").pop();

//       axios
//         .post(`users/reset-password/${token}`, { newPassword })
//         .then((response) => {
//           toast.success(response.data.message);
//           setTimeout(() => {
//             window.location.href = "/signin";
//           }, 3000);
//         })
//         .catch((error) => {
//           toast.error("Your link has expired");
//         });
//     },
//   });

//   return (
//     // JSX for ResetPassword component

//     <>
//       <Formik formik={formik}>
//         <Form>
//           <Form.Group className="my-2" controlId="newPassword">
//             <Form.Label className="form-label">New Password</Form.Label>
//             <Form.Control
//               type="password"
//               placeholder="Enter new password"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.newPassword}
//             />
//             {formik.touched.newPassword && formik.errors.newPassword ? (
//               <div className="error">{formik.errors.newPassword}</div>
//             ) : null}
//           </Form.Group>
//           <Form.Group className="my-2" controlId="confirmPassword">
//             <Form.Label className="form-label">Confirm Password</Form.Label>
//             <Form.Control
//               type="password"
//               placeholder="Confirm new password"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.confirmPassword}
//             />
//             {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
//               <div className="error">{formik.errors.confirmPassword}</div>
//             ) : null}
//           </Form.Group>
//           <Button variant="primary" type="submit">
//             Reset Password
//           </Button>
//         </Form>
//       </Formik>
//     </>
//   );
// };

// export default PasswordReset;
