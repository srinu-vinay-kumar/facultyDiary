import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../config/axiosConfig.js";
import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";

const ForgotPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      axios
        .post("/api/forgotPassword", values)
        .then((response) => {
          toast.success("Email sent successfully");
        })
        .catch((error) => {
          if (error.response.status === 404) {
            toast.error("Email not found");
          } else {
            toast.error("Server error");
          }
        });
    },
  });

  return (
    // JSX for ForgotPassword component
    <>
      <Formik formik={formik}>
        <Form>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </Form.Group>
          <Button variant="primary" type="submit" onClick={formik.handleSubmit}>
            Submit
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default ForgotPassword;
