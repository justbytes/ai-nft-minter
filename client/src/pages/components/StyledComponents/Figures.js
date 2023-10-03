import styled from 'styled-components';

export const Figure = styled.figure`
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  border: 1px solid black;
  border-radius: 5px;
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
