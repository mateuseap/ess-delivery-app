import React from 'react';
import { HeaderStyle, Title, Buttons } from './styles';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import {
  getHistorySvg,
  getUserSvg,
  getCartSvg,
} from '../../assets/headerAssets';

function getUser() {
  return { name: 'Felipe Gonçalves' };
}

export default function Header() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getUser);
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [user]);
  const navigate = useNavigate();

  function handleRouting(route) {
    navigate(route.target.id);
  }

  return (
    <HeaderStyle>
      {loading ? (
        ''
      ) : (
        <>
          <Title>{user.name}</Title>
          <Buttons>
            {getHistorySvg()}
            {getCartSvg()}
            {getUserSvg()}
          </Buttons>
        </>
      )}
    </HeaderStyle>
  );
}
