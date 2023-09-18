import styled from 'styled-components';

export const Input = styled.input`
  margin: ${(props) => props.$margin};
  padding: 2px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid black;
`;

export const BigInput = styled.textarea`
  margin: ${(props) => props.$margin};
  padding: 2px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid black;
`;
