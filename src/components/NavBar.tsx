import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { BookHeart, ChartColumn, House } from 'lucide-react';

const Nav = styled.nav`
  background: ${props => props.theme.colors.azul};
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${props => props.theme.colors.quasebranco};
  position: relative;
  z-index: 100;
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.quasebranco};
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: bold;
  margin: 5px;
  font-family: ${props => props.theme.fonts.body};
  padding: 0.5rem 1rem;
  transition: background 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.quasebranco};
    color: ${props => props.theme.colors.maronzinho};
    border-radius: 25px;
  }
`;

/* links visíveis em desktop, escondidos em mobile */
const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 600px) {
    display: none;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${props => props.theme.colors.quasebranco};
  font-family: 'Great Vibes', cursive;
  font-size: 1.1rem;

  @media (max-width: 600px) {
    display: none;
  }
`;

const LogoutBtn = styled.button`
  background: transparent;
  border: 1.5px solid ${props => props.theme.colors.quasebranco};
  color: ${props => props.theme.colors.quasebranco};
  border-radius: 20px;
  padding: 4px 14px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  font-family: ${props => props.theme.fonts.body};

  &:hover {
    background: ${props => props.theme.colors.quasebranco};
    color: ${props => props.theme.colors.maronzinho};
  }
`;

/* botão hamburguer estilo scrapbook */
const HamburgerBtn = styled.button`
  display: none;
  flex-direction: column;
  gap: 5px;
  background: #fdfaf2;
  border: none;
  border-radius: 4px;
  padding: 8px 10px;
  cursor: pointer;
  position: relative;
  box-shadow: 2px 2px 0 #c9b49a, 3px 3px 0 #b8a08a;
  transition: transform 0.2s;

  /* washi tape no topo do botão */
  &::before {
    content: '';
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 10px;
    background: repeating-linear-gradient(
      90deg, #a8c090 0, #a8c090 6px, #c8dab4 6px, #c8dab4 12px
    );
    border-radius: 2px;
    opacity: 0.95;
  }

  &:hover { transform: translateY(-2px); }

  @media (max-width: 600px) {
    display: flex;
  }
`;

/* as três linhas do hamburguer */
const HamburgerLine = styled.span`
  display: block;
  width: 22px;
  height: 2px;
  background: ${props => props.theme.colors.maronzinho};
  border-radius: 2px;
  transition: all 0.3s ease;
`;

/* dropdown que abre em mobile */
const MobileMenu = styled.div<{ $open: boolean }>`
  display: none;

  @media (max-width: 600px) {
    display: ${props => props.$open ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #fdfaf2;
    border-bottom: 2px solid #c9b49a;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    z-index: 99;
    padding: 1rem;
    gap: 4px;

    /* washi tape no topo do dropdown */
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6px;
      background: repeating-linear-gradient(
        90deg, #e8b4b8 0, #e8b4b8 10px, #f0cdd0 10px, #f0cdd0 20px
      );
      opacity: 0.85;
    }
  }
`;

const MobileLink = styled(Link)`
  color: ${props => props.theme.colors.maronzinho};
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: bold;
  font-family: 'Caveat', cursive;
  font-size: 1.1rem;
  padding: 8px 12px;
  border-radius: 8px;
  transition: background 0.2s;

  &:hover {
    background: rgba(168, 192, 144, 0.2);
  }
  
  .icon-nav{
  padding: 0.8rem;

  }
  :hover{
  color
  }
`;

const MobileUserInfo = styled.div`
  color: ${props => props.theme.colors.maronzinho};
  font-family: 'Great Vibes', cursive;
  font-size: 1.1rem;
  padding: 8px 12px;
  border-top: 1px dashed #c9b49a;
  margin-top: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function Navbar() {
  const auth = useAuth() as {
    usuario?: { nome?: string } | null;
    logout?: () => void;
  } | null;
  const usuario = auth?.usuario ?? null;
  const logout = auth?.logout ?? (() => {});
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);

  function handleLogout() {
    logout();
    navigate('/login');
    setMenuAberto(false);
  }

  return (
    <Nav>
      {/* links desktop */}
      <NavLinks>
        <NavLink to="/"><House className='icon-nav' color="#ea6c98" strokeWidth={1.25} />Home</NavLink>
        <NavLink to="/favoritos"><BookHeart className='icon-nav' color="#ea6c98" strokeWidth={1.25}  />Favoritos</NavLink>
        <NavLink to="/estatisticas"><ChartColumn className='icon-nav' color="#ea6c98" strokeWidth={1.25} />Estatísticas</NavLink>
      </NavLinks>

      {/* usuária desktop */}
      {usuario ? (
        <UserInfo>
          Olá, {usuario.nome} 
          <LogoutBtn onClick={handleLogout}>sair</LogoutBtn>
        </UserInfo>
      ) : (
        <UserInfo>
          <NavLink to="/login">Entrar</NavLink>
        </UserInfo>
      )}

      {/* botão hamburguer mobile */}
      <HamburgerBtn onClick={() => setMenuAberto(!menuAberto)}>
        <HamburgerLine />
        <HamburgerLine />
        <HamburgerLine />
      </HamburgerBtn>

      {/* dropdown mobile */}
      <MobileMenu $open={menuAberto}>
        <MobileLink to="/" onClick={() => setMenuAberto(false)}> Home</MobileLink>
        <MobileLink to="/favoritos" onClick={() => setMenuAberto(false)}> Favoritos</MobileLink>
        <MobileLink to="/estatisticas" onClick={() => setMenuAberto(false)}>Estatísticas</MobileLink>

        {usuario ? (
          <MobileUserInfo>
            Olá, {usuario.nome} 
            <LogoutBtn onClick={handleLogout}>sair</LogoutBtn>
          </MobileUserInfo>
        ) : (
          <MobileLink to="/login" onClick={() => setMenuAberto(false)}>Entrar</MobileLink>
        )}
      </MobileMenu>
    </Nav>
  );
}

export default Navbar;
export { Nav, NavLink };