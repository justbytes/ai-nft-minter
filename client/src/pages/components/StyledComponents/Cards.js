import styled from 'styled-components';

// export const Card = styled.div`
//   border: 1px solid black;
// `;

export const Card = styled.div`
  background-color: ${(props) => (props.$secondary ? '#FFFFFF' : '#E5E5E5')};
  width: ${(props) => props.$width};
  min-height: ${(props) => props.$height};
  margin: ${(props) => props.$margin};
  padding: ${(props) => props.$padding};
  border: 1px solid black;
  border-radius: 5px;
`;

export const FlexCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.$secondary ? '#FFFFFF' : '#E5E5E5')};
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  margin: ${(props) => props.$margin};
  padding: ${(props) => props.$padding};
  border: 1px solid black;
  border-radius: 5px;
`;

const Body = ({ className, children }) => (
  <div className={className}>{children}</div>
);

export const CardBody = styled(Body)`
  line-height: ${(props) => props.$lineHeight};
  padding: ${(props) => props.$padding};
`;

export const BottomBorderCardBody = styled(Body)`
  border-bottom: solid 1px black;
`;

export const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-radius: 3px;
  width: 100%;
  padding: ${(props) => props.$padding};
  margin-top: 15px;
`;

export const CardTitle = styled.h1``;

export const CardTitle3 = styled.h3`
  text-align: center;
  border-bottom: 1px solid black;
  padding: ${(props) => props.$padding};
`;
