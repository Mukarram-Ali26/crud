import React from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as yup from "yup"

let schema = yup.object().shape({
  message: yup.string().required("required"),
})

const Add = () => {
  return (
    <div>
      <h1>Crud App Made by Mukarram Ali </h1>

      <Formik
        initialValues={{ message: "" }}
        validationSchema={schema}
        onSubmit={values => {
          fetch(`/.netlify/functions/add`, {
            method: "post",
            body: JSON.stringify(values),
          })
            .then(response => response.json())
            .then(data => {
              console.log("Data: " + JSON.stringify(data))
            })
        }}
      >
        {formik => (
          <Form onSubmit={formik.handleSubmit}>
            <Field
              as={TextField}
              variant="outlined"
              fullWidth="false"
              name="message"
              label="Your Text"
            />
            <br />
            <ErrorMessage name="message" />
            <div style={{ marginTop: "10px" }}>
              
              <Button
                variant="contained"
                type="submit"
                color="primary"
                component="span"
              >
                Upload
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Add
