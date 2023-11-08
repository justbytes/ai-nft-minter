import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  border-radius: 5px;
  padding: ${(props) => props.$padding};
  margin: ${(props) => props.$margin};
`;

const ImageBox = styled.div`
  border: 1px solid black;
  border-radius: 3px;
  padding: ${(props) => props.$padding};
  margin: 3px;
`;

const BoxTitle = styled.div`
  background-color: ${(props) => props.$bgColor};
  width: ${(props) => props.$width};
  padding: ${(props) => props.$padding};
  margin: ${(props) => props.$margin};
  border-bottom: 1px solid black;
  border-radius: 3px 3px 0px 0px;
`;

const BoxContent = styled.div`
  padding: ${(props) => props.$padding};
  margin: ${(props) => props.$margin};
`;

const Paragragh = styled.p`
  padding: ${(props) => props.$padding};
  margin: ${(props) => props.$margin};
`;

const Image = ({ className, width, height, alt, src }) => {
  return (
    <img
      className={className}
      width={width}
      height={height}
      alt={alt}
      src={src}
    />
  );
};

export const StyledImage = styled(Image)`
  border-radius: 2px;
`;

export const ActivityBox = ({ title, content }) => {
  return (
    <Box>
      <BoxTitle $bgColor="orange">
        <Paragragh $margin="2px" $padding="5px">
          {title}
        </Paragragh>
      </BoxTitle>
      <BoxContent>
        <Paragragh $margin="2px" $padding="5px">
          {content}
        </Paragragh>
      </BoxContent>
    </Box>
  );
};

export const RecentImageBox = ({ link, content }) => {
  return (
    <ImageBox>
      <StyledImage
        width="90px"
        height="90px"
        alt="recent generated image"
        src={link}
      />
    </ImageBox>
  );
};

export const Scrollable = styled.div`
  border: ${(props) => (props.$border ? `1px solid black` : '0px')};
  border-radius: ${(props) => props.$borderRadius};
  display: ${(props) => (props.$flex ? 'flex' : null)};
  flex-direction: ${(props) => props.$flexDirection};
  flex-wrap: ${(props) => props.$flexWrap};
  justify-content: ${(props) => props.$justifyContent};
  width: ${(props) => props.$width};
  max-height: ${(props) => props.$height};
  margin: ${(props) => props.$margin};
  padding: ${(props) => props.$padding};
  overflow: auto;
`;
