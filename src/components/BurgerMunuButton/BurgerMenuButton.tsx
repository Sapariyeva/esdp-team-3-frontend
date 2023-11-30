import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleMenu } from '../../redux/slices/menuSlice';
import './BurgerMenuButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
export const BurgerMenuButton: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <button className="burger-menu-button" onClick={() => dispatch(toggleMenu())}>
      <FontAwesomeIcon icon={faBars} />
    </button>
  );
};