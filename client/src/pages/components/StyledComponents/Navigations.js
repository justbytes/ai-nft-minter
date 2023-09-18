import styled from 'styled-components';

export const NavbarWrapper = styled.nav`
  background-color: black;
  padding: 10px 0;
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 0 20px;
`;

export const NavMenu = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
`;

export const NavItem = styled.li`
  margin-right: 20px;
`;

export const NavLink = styled.a`
  text-decoration: none;
  color: white;
  padding: 7px;
  text-align: center;
  &:hover {
    color: white;
    border: 1px double transparent;
    background-image: linear-gradient(rgb(13, 14, 33), rgb(13, 14, 33)),
      radial-gradient(circle at left top, #61e786, #9792e3);
    background-clip: padding-box, border-box;
    border-radius: 5px;
    padding: 7px;
    text-align: center;
  }
`;

export const NavDropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
  color: white;
  padding: 7px;
  text-align: center;
  &:hover {
    .nav-dropdown-content {
      display: block;
      color: white;
      border: 1px double transparent;
      background-clip: padding-box, border-box;
      border-radius: 5px;
      padding: 7px;
      text-align: center;
    }
  }
`;

export const NavDropdownContent = styled.div`
  display: none;
  position: absolute;
  width: 215%;

  border: 1px double transparent;
  background-image: linear-gradient(rgb(13, 14, 33), rgb(13, 14, 33)),
    radial-gradient(circle at left top, #61e786, #9792e3);
`;

export const NavDropDownName = styled.a`
  text-decoration: none;
  color: white;
  padding: 7px;
  text-align: center;
  &:hover {
    color: white;
    border: 1px double transparent;
    background-image: linear-gradient(rgb(13, 14, 33), rgb(13, 14, 33)),
      radial-gradient(circle at left top, #61e786, #9792e3);
    background-clip: padding-box, border-box;
    border-radius: 5px;
    padding: 7px;
    text-align: center;
  }
`;

export const NavDropdownItem = styled.a`
  padding: 8px 12px;
  text-decoration: none;
  color: white;
  display: block;
  border-bottom: 1px solid black;
`;
