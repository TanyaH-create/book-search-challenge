import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { ADD_USER } from '../utils/mutations';
//import { createUser } from '../utils/API';
import Auth from '../utils/auth';
import type { User } from '../models/User';
import { useMutation } from '@apollo/client';

// biome-ignore lint/correctness/noEmptyPattern: <explanation>
const SignupForm = ({}: { handleModalClose: () => void }) => {
  // set initial form state
  const [userFormData, setUserFormData] = useState<User>({ username: '', email: '', password: '', savedBooks: [] });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

    // state for error message
    const [errorMessage, setErrorMessage] = useState('');

  //set mutation hook
  const [ addUser ] = useMutation(ADD_USER);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      //const response = await createUser(userFormData);
      const { data } = await addUser({
        variables: {
          username: userFormData.username,
          email: userFormData.email,
          password: userFormData.password
        }

      });

      console.log('Response received:', data ? 'Data present' : 'No data');

      if (!data) {
        throw new Error('something went wrong!');
      }

      //const { token } = await response.json();
      const { token } = data.addUser;

      if (!token) {
        throw new Error('No token received from server');
      }

      console.log('Token received successfully');

      Auth.login(token);

    } catch (err: any) {
      console.error('Signup error:', err);
      setShowAlert(true);
    

    // Enhanced error logging
    if (err.graphQLErrors) {
      console.error('GraphQL Errors:', JSON.stringify(err.graphQLErrors, null, 2));
      setErrorMessage(err.graphQLErrors[0]?.message || 'GraphQL error occurred');
    } else if (err.networkError) {
      console.error('Network Error:', err.networkError);
      if (err.networkError.result?.errors) {
        console.error('Network Error Details:', JSON.stringify(err.networkError.result.errors, null, 2));
      }
      setErrorMessage('Network error: Server responded with an error');
    } else {
      setErrorMessage(err.message || 'Something went wrong with your signup!');
    }
    
    setShowAlert(true);
  }



    setUserFormData({
      username: '',
      email: '',
      password: '',
      savedBooks: [],
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username || ''}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email || ''}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password || ''}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;
