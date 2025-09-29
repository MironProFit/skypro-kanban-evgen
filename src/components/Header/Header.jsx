import { useState, useEffect } from 'react';
import {
  SHeader,
  Logo,
  StyledActions,
  StyledTaskLink,
  StyledUserLink,
} from './Header.styled';
import PopUser from '../popups/PopUser/PopUser';
import { Link } from 'react-router-dom';

function Header({ setIsAuth, onToggleTheme, token, setTasks }) {
  const [isPopUserOpen, setIsPopUserOpen] = useState(false);
  const [userName, setUserName] = useState('Пользователь');
  const [userEmail, setUserEmail] = useState('email@example.com');

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      try {
        const parsed = JSON.parse(userInfo);
        setUserName(parsed.user?.name || parsed.name || 'Пользователь');
        setUserEmail(parsed.user?.login || parsed.login || 'email@example.com');
      } catch (err) {
        console.error(err.message)
      }
    }
  }, []);

  return (
    <SHeader>
      <Logo>
        <img
          src={`/images/${localStorage.getItem('theme') === 'dark' ? 'logo_dark.png' : 'logo.png'}`}
          alt="Logo"
        />
      </Logo>
      <StyledActions>
        <StyledTaskLink as={Link} to="/createcard">
          Создать новую задачу
        </StyledTaskLink>
        <StyledUserLink
          onClick={() => setIsPopUserOpen(!isPopUserOpen)}
        >
          {userName}
        </StyledUserLink>
        <PopUser
          isOpen={isPopUserOpen}
          setIsAuth={setIsAuth}
          userName={userName}
          userEmail={userEmail}
          theme={localStorage.getItem('theme') || 'light'}
          onToggleTheme={(newTheme) => {
            localStorage.setItem('theme', newTheme);
            onToggleTheme(newTheme);
          }}
        />
      </StyledActions>
    </SHeader>
  );
}

export default Header;