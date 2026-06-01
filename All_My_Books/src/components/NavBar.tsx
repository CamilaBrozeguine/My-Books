import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
  background: ${props => props.theme.colors.maronzinho};
  padding: 1rem;y
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${props => props.theme.colors.quasebranco};
  
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.quasebranco};
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: bold;
  font-family: ${props => props.theme.fonts.body};
  padding: 0.5rem 1rem;
  transition: background 0.3s ease;
   animation: surgimentoMagico 3s ease-out forwards;

  &:hover {
    background: ${props => props.theme.colors.nude};
    color: ${props => props.theme.colors.maronzinho};
    border-radius: 5px;
  }
`;

function Navbar() {
  return (
    <Nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/favoritos">Favoritos</NavLink>
    </Nav>
  );
}

export default Navbar;

export { Nav, NavLink };
