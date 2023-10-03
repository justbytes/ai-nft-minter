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
  border-radius: 5px;
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

export const RecentImageBox = ({ link }) => {
  return (
    <Box>
      <StyledImage
        with="100px"
        height="100px"
        alt="recent generated image"
        src={link}
      />
    </Box>
  );
};
