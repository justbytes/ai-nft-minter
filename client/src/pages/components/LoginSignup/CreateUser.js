import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import Auth from '../../../utils/auth';
import { ADD_USER } from '../../../utils/mutations';

import { Form, CenteredBody } from '../StyledComponents/Forms';
import { Input } from '../StyledComponents/Inputs';
import { Button } from '../StyledComponents/Buttons';
import { PageHeader } from '../StyledComponents/Headers';

const CreateUser = () => {
  const initialUser = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  };
  const [userData, setUserData] = useState(initialUser);
  const [addUser] = useMutation(ADD_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await addUser({
        variables: {
          firstname: userData.firstName,
          lastname: userData.lastName,
          username: userData.username,
          email: userData.email,
          password: userData.password,
        },
      });

      console.log(data);

      Auth.login(data.addUser.token);
    } catch (err) {
      // console.error(err);
      alert('Failed to create new user, please try again.');
    }
  };

  return (
    <>
      <PageHeader $margin="2%">SIGN UP</PageHeader>
      <Form $width="55%">
        <CenteredBody $secondary>
          <Input
            $width="50%"
            $margin="3px 0px"
            type="input"
            placeholder="First Name"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
          />
          <Input
            $width="50%"
            $margin="3px 0px"
            type="input"
            placeholder="Last Name"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
          />
          <Input
            $width="50%"
            $margin="3px 0px"
            type="input"
            placeholder="Username"
            name="username"
            value={userData.username}
            onChange={handleChange}
          />
          <Input
            $width="50%"
            $margin="3px 0px"
            type="input"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
          <Input
            $width="50%"
            $margin="3px 0px"
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
          <Button type="submit" $width="15%" onClick={handleSubmit}>
            Sign Up
          </Button>
        </CenteredBody>
      </Form>
    </>
  );
};

export default CreateUser;
