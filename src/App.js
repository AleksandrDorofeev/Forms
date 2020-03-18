import React from "react";
import "./App.css";

import { Formik, Field, Form, useField, FieldArray } from "formik";
import * as yup from "yup";

const CustomRadio = ({ label, ...props }) => {
  const [field] = useField(props);
  return (
    <>
      <label>
        <input {...field} {...props} />
        {label}
      </label>
    </>
  );
};

const CustomInput = props => {
  const [field, meta] = useField(props);
  return (
    <>
      <Field {...field} {...props} />
      {meta.error && meta.touched ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const validationSchema = yup.object({
  firstName: yup
    .string()
    .required()
    .max(10),
  pets: yup.array().of(
    yup.object({
      name: yup.string().required("nope")
    })
  )
});

function App() {
  return (
    <div>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          isTall: false,
          cookies: [],
          yogurt: "",
          pets: [{ type: "cat", name: "Alex", id: "" + Math.random() }]
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          console.log("Submit:", data);
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit
        }) => (
          <Form onSubmit={handleSubmit}>
            <div>
              <CustomInput
                placeholder="First Name"
                name="firstName"
                type="input"
              />
            </div>
            <div>
              <CustomInput
                placeholder="Last Name"
                name="lastName"
                type="input"
              />
            </div>

            {/* <input
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <input
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            /> */}
            <div>
              <Field name="isTall" type="checkbox" />
            </div>
            <div>cookies:</div>
            <div>
              <Field name="cookies" type="checkbox" value="chocolate chip" />
              <Field name="cookies" type="checkbox" value="apple chip" />
            </div>
            <div>
              <CustomRadio
                name="yogurt"
                type="radio"
                label="cherry"
                value="cherry"
              />
              <CustomRadio
                name="yogurt"
                type="radio"
                label="peach"
                value="peach"
              />
            </div>
            <div>
              <FieldArray name="pets">
                {arrayHelpers => (
                  <div>
                    <button
                      onClick={() =>
                        arrayHelpers.push({
                          type: "frog",
                          name: "",
                          id: "" + Math.random()
                        })
                      }
                    >
                      add pet
                    </button>
                    {values.pets.map((pet, index) => {
                      return (
                        <div key={pet.id}>
                          <CustomInput
                            placeholder="pet name"
                            name={`pets.${index}.name`}
                            type="input"
                          />
                          <select
                            name={`pets.${index}.type`}
                            onChange={handleChange}
                            value={pet.type}
                            type="select"
                          >
                            <option value="cat">cat</option>
                            <option value="dog">dog</option>
                            <option value="frog">frog</option>
                          </select>
                          <button onClick={() => arrayHelpers.remove(index)}>
                            X
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </FieldArray>
            </div>
            <div>
              <button disabled={isSubmitting} type="submit">
                submit
              </button>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;
