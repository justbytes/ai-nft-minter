import styled from 'styled-components';

const Link = ({ link, className, children }) => (
  <a href={link} className={className}>
    {children}
  </a>
);

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: orange;
  margin: ${(props) => props.$margin};
`;

export const ButtonLink = styled(Link)`
  text-decoration: none;
  margin: auto;
  color: black;
  background-color: #4cc9f0;
  border-radius: 5px;
  padding: ${(props) => props.$padding};
  width: ${(props) => props.$width};
`;
