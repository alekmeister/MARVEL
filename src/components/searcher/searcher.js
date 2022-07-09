import './searcher.scss';

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useMarvelService from '../../services/MarvelService';
const Searcher = () => {
  const { getChar } = useMarvelService();
  const [char, setChar] = useState({});
  const [error, setError] = useState('');

  // const successMessage = !error && `There is! Visit ${char.name} page`;
  // const errorMesage =
  //   'name' in char
  //     ? `There is! Visit ${char.name} page`
  //     : 'The character was not found. Check the name and try again';
  // // console.log(char);

  // // console.log(colorResult);

  const userMessage = char['name']
    ? `There is! Visit ${char.name} page`
    : error;

  return (
    <Formik
      initialValues={{
        name: '',
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(2, 'Minimum 2 symbols!')
          .required('This field is required'),
      })}
      onSubmit={(value) => {
        getChar(value.name).then(
          (result) => {
            if (!result) {
              setChar({});
              return;
            } else {
              setError(
                'The character was not found. Check the name and try again'
              );
              setChar(result);
            }
          },
          (data) => setChar({})
        );
      }}
    >
      {({ errors, touched }) => {
        return (
          <Form>
            <div className="char__search-form">
              <div className="char__search-title">
                Or find a character by name:
              </div>
              <div className="char__search-wrapper">
                <Field name="name" placeholder="Enter name"></Field>
                <button className="button button__main">
                  <div className="inner">Find it</div>
                </button>
              </div>

              <div
                className={
                  'name' in char ? 'char__search-success' : 'char__search-error'
                }
              >
                {'name' in errors && touched.name ? (
                  <ErrorMessage
                    className="char__search-error"
                    name="name"
                    component="div"
                  />
                ) : (
                  userMessage
                )}

                <button
                  className="button button__secondary"
                  style={{
                    marginLeft: '85px',
                    visibility:
                      'name' in char && !('name' in errors)
                        ? 'visible'
                        : 'hidden',
                  }}
                >
                  <div className="inner">Page</div>
                </button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Searcher;
