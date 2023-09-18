import styled from 'styled-components';

export const Form = styled.form`
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  padding: ${(props) => props.$padding};
  margin: ${(props) => props.$margin};
  border: 1px solid black;
  border-radius: 5px;
`;

export const FormBody = styled.div`
  margin: 15px 5px;
  padding: 5px;
  background-color: ${(props) => (props.$secondary ? '#E5E5E5' : '#FFFFFF')};
  border-radius: 5px;
`;

export const CenteredBody = styled.div`
  margin: 15px 5px;
  padding: 5px;
  background-color: ${(props) => (props.$secondary ? '#E5E5E5' : '#FFFFFF')};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SubBody = styled.div`
  width: ${(props) => props.$width};
  display: flex;
`;

export const AttributeBody = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const FormTitle = styled.h1`
  border-radius: 5px;
  border: solid 1px black;
  text-align: center;
  width: 100%;
`;
