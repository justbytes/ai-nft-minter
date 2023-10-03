import styled from 'styled-components';

export const Paragragh = styled.p`
  color: ${(props) => props.$color || 'black'};
  padding: ${(props) => props.$padding};
  margin: ${(props) => props.$margin};
`;

export const CenteredParagragh = styled.p`
  text-align: center;
  color: ${(props) => props.$color || 'black'};
`;
