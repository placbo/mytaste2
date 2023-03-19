import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AiOutlineLogin } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const StyledHeader = styled.div`
  position: fixed;
  top: 0;
  height: 70px;
  //background-color: ${(props) => props.theme.separator};
  background-color: black;
  width: 100%;
  display: flex;
  z-index: 1;
  align-items: center;
  justify-content: space-between;
  font-family: 'Jura', sans-serif;
`;

const IconWrapper = styled.div`
  font-size: 32px;
  margin-left: 1rem;
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  height: 100%;
`;

const IconLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  margin-top: 6px;
`;

const Logo = styled.span`
  font-size: 32px;
  font-weight: bold;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const UserAvatar = styled.img`
  height: 32px;
  max-width: 32px;
  margin-left: 1rem;
  margin-right: 1rem;
  border-radius: 50%;
`;

export const Header = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        console.log('user is logged out');
      }
    });
  }, []);

  return (
    <StyledHeader>
      <Link to="/">
        <Logo>MyTaste</Logo>
      </Link>
      {/* <span>{isAdmin && 'ADMIN'}</span> */}
      {!currentUser ? (
        <Link to="/login">
          <IconWrapper>
            <AiOutlineLogin />
            <IconLabel>Log in</IconLabel>
          </IconWrapper>
        </Link>
      ) : (
        <Link to="/profile">
          <UserAvatar src={currentUser.photoURL} />
        </Link>
      )}
    </StyledHeader>
  );
};
