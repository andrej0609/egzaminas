import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { Formik, Form, Field } from 'formik';
import * as yup from "yup";
import PostContext from "../../contexts/PostContext";
import UserContext from "../../contexts/UserContext";
import { useContext } from "react";

const NewPostForm = () => {

  const { addNewPost } = useContext(PostContext);
  const { loggedInUser } = useContext(UserContext);

  const navigation = useNavigate();

  const validationSchema = yup.object().shape({
    heading: yup.string().required('Heading is required').min(3, 'Heading must be at least 3 characters'),
    content: yup.string().required('Content is required').min(3, 'Content must be at least 3 characters'),
  });

  const handleSubmit = (values) => {
    const newPost = {
      heading: values.heading,
      content: values.content,
      id: nanoid(),
      userId: loggedInUser.id,
      likes: 0,
      likedBy: [],
      dislikes: 0,
      dislikedBy: [],
      Time: new Date().toLocaleString(),
      edited: false
    };

    addNewPost(newPost);
    navigation('/');
  }

  return (
    <>
      <div className="FormAddPost">
        <Formik
          initialValues={{
            heading: '',
            content: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <label>
                Heading:
                <Field name="heading" type="text" />
                {errors.heading && touched.heading ? <div>{errors.heading}</div> : null}
              </label>
              <label>
                Content:
                <Field name="content" type="text" />
                {errors.content && touched.content ? <div>{errors.content}</div> : null}
              </label>
              <input type="submit" value="Create new Post" />
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default NewPostForm;