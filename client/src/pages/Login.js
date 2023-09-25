import React, { useState } from 'react';

import { CenteredSection } from './components/StyledComponents/Sections';
import LoginUser from './components/LoginSignup/LoginUser';
import CreateUser from './components/LoginSignup/CreateUser';

export function Login() {
  const [signup, setSignup] = useState(false);

  const changeScreen = () => {
    setSignup(true);
  };

  return (
    <CenteredSection>
      {!signup ? <LoginUser changeScreen={changeScreen} /> : <CreateUser />}
    </CenteredSection>
  );
}
