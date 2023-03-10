import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AnswerContext from "../../contexts/AnswerContext";

const EditAnswerForm = () => {

  const { id } = useParams();

  const { answers, updateAnswer } = useContext(AnswerContext);

  const currentAnswer = answers.find(answer => answer.id === id);

  const navigation = useNavigate();

  const validationSchema = Yup.object().shape({
    content: Yup.string().required('Content is required').min(5, 'Content must be at least 5 characters'),
  });

  const handleSubmit = (values) => {
    updateAnswer(id, values);
    navigation('/posts/' + currentAnswer.postId);
  }

  return (
    <>
      <div className="FormAnswer">
        <Formik
          initialValues={{
            content: currentAnswer.content,
            edited: true
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <label>
                Content:
                <Field name="content" type="text" />
                {errors.content && touched.content ? <div>{errors.content}</div> : null}
              </label>
              <button type="submit" value="Edit Answer">Edit Answer</button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default EditAnswerForm;