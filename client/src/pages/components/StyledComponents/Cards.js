import styled from 'styled-components';

// export const Card = styled.div`
//   border: 1px solid black;
// `;

export const Card = styled.div`
  background-color: ${(props) => (props.$secondary ? '#FFFFFF' : '#E5E5E5')};
  width: ${(props) => props.$width};
  min-height: ${(props) => props.$height};
  max-height: ${(props) => props.$maxHeight};
  overflow: ${(props) => (props.$overflow ? 'auto' : null)};
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

export const CustomCard = styled.div`
  border: ${(props) => (props.$border ? `1px solid black` : '0px')};
  border-radius: ${(props) => props.$borderRadius};
  display: ${(props) => (props.$flex ? 'flex' : null)};
  flex-direction: ${(props) => props.$flexDirection};
  justify-content: ${(props) => props.$justifyContent};
  width: ${(props) => props.$width};
  min-height: ${(props) => props.$height};
  margin: ${(props) => props.$margin};
  padding: ${(props) => props.$padding};
`;

const Body = ({ className, children }) => (
  <div className={className}>{children}</div>
);

export const CardBody = styled(Body)`
  line-height: ${(props) => props.$lineHeight};
  padding: ${(props) => props.$padding};
`;

export const BorderedCardBody = styled(Body)`
  border: 1px solid #80808052;
  border-radius: 3px;
  width: ${(props) => props.$width};
  padding: ${(props) => props.$padding};
  margin: ${(props) => props.$margin};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const BottomBorderCardBody = styled(Body)`
  padding: ${(props) => props.$padding};
  border-bottom: solid 1px black;
`;

export const FlexCardBody = styled(Body)`
  padding: ${(props) => props.$padding};
  margin: ${(props) => props.$margin};
  display: flex;
  justify-content: space-evenly;
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

export const Box = styled.div`
  padding: ${(props) => props.$padding};
  margin: ${(props) => props.$margin};
  width: ${(props) => props.$width};
  border: solid 1px grey;
  display: flex;
  justify-content: center;
`;

export const CardTitle = styled.h1``;

export const CardTitle3 = styled.h3`
  text-align: center;
  border-bottom: 1px solid black;
  padding: ${(props) => props.$padding};
`;

export const CardTitle4 = styled.h4`
  color: ${(props) => props.$color};
  margin: ${(props) => props.$margin};
  padding: ${(props) => props.$padding};
`;

export const CardTitle6 = styled.h6`
  text-align: center;
  border-bottom: ${(props) => (props.$border ? '1px solid black' : 'null')};
  padding: ${(props) => props.$padding};
`;
