import styled from 'styled-components';

export const Section = styled.section`
  background-color: ${(props) => (props.secondary ? '#E5E5E5' : '#FFFFFF')};
  min-height: 100vh;
  border-bottom: 1px solid black;
`;

export const CenteredSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.$secondary ? '#E5E5E5' : '#FFFFFF')};
  min-height: 100vh;
  border-bottom: 1px solid black;
`;

export const EvenSection = styled.section`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${(props) => (props.$secondary ? '#E5E5E5' : '#FFFFFF')};
  min-height: 100vh;
  border-bottom: 1px solid black;
`;

export const FlexSection = styled.section`
  display: flex;
  background-color: ${(props) => (props.$secondary ? '#E5E5E5' : '#FFFFFF')};
  min-height: 100vh;
`;
