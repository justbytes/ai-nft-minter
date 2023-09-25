import styled from 'styled-components';

export const Button = styled.button`
  border: 1px solid black;
  border-radius: 5px;
  width: ${(props) => props.$width};
  padding: ${(props) => props.$padding};
`;

export const BorderlessButton = styled.button`
  border: none;
  color: ${(props) => props.$color};
`;

export const ConnectButton = styled.button`
  border: 1px solid black;
  width: ${(props) => props.$width};
  padding: ${(props) => props.$padding};
  &:hover {
    color: white;
    border: 1px double transparent;
    background-image: linear-gradient(rgb(13, 14, 33), rgb(13, 14, 33)),
      radial-gradient(circle at left top, #61e786, #9792e3);
    background-clip: padding-box, border-box;
    border-radius: 5px;
    padding: 7px;
  }
`;

export const ConnectedButton = styled.button`
  border: 1px solid black;
  width: ${(props) => props.$width};
  padding: ${(props) => props.$padding};
  color: white;
  border: 1px double transparent;
  background-image: linear-gradient(rgb(13, 14, 33), rgb(13, 14, 33)),
    radial-gradient(circle at left top, #61e786, #9792e3);
  background-clip: padding-box, border-box;
  border-radius: 5px;
  padding: 7px;
`;
