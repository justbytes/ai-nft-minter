import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import Auth from '../../../utils/auth';
import { LOGIN_USER } from '../../../utils/mutations';

import { Form, CenteredBody } from '../StyledComponents/Forms';
import { Input } from '../StyledComponents/Inputs';
import { CenteredParagragh } from '../StyledComponents/Paragraphs';
import { Button, BorderlessButton } from '../StyledComponents/Buttons';
import { PageHeader } from '../StyledComponents/Headers';

const LoginUser = ({ changeScreen }) => {
  const [userData, setUserData] = useState({ email: '', password: '' });

  const [login] = useMutation(LOGIN_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login({
        variables: {
          email: userData.email,
          password: userData.password,
        },
      });

      Auth.login(data.login.token);
    } catch (err) {
      // console.error(err);
      alert('Incorrect email or password. Please try again.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <>
      <PageHeader $margin="2%">LOGIN</PageHeader>
      <Form $width="65%" onSubmit={handleSubmit}>
        <CenteredBody $secondary>
          <Input
            $width="30%"
            $margin="5px 0px"
            type="input"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />

          <Input
            $width="30%"
            $margin="5px 0px"
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />

          <CenteredParagragh>
            Don't have an account? Sign up{' '}
            <BorderlessButton $color="orange" onClick={changeScreen}>
              here
            </BorderlessButton>
          </CenteredParagragh>
          <Button type="submit" $width="15%">
            Login
          </Button>
        </CenteredBody>
      </Form>
    </>
  );
};

export default LoginUser;
