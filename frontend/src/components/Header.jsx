/* eslint-disable */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { userLogOut } from '../slices/authSlice.js';

const Header = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(userLogOut());
    navigate('/');
  }
  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="bg-light border-bottom p-2">
      <div className="d-flex justify-content-between align-items-center">
        <span 
          className="fs-4 cursor-pointer" 
          onClick={goToHome}
          style={{ cursor: 'pointer' }}
        >
          {t('homepage.header.title')}
        </span>
        <Button variant="primary" onClick={handleLogout}>
          {t('homepage.header.exit')}
        </Button>
      </div>
    </div>
  );
};

export default React.memo(Header);