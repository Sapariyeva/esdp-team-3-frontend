import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/types';
import { toggleMenu } from '../../redux/slices/menuSlice';
import './SideMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export const SideMenu: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.menu.isOpen);

  return (
    <div className={`side-menu ${isOpen ? 'open' : ''}`}>
      <div className="profile">
        <img className="avatar" src="avatar_url" alt="" />
        <div className="user-info">
          <p>Name</p>
          <p>Email</p>
          <p>★<span>3.77</span></p>
        </div>
      </div>
      <ul className="menu-items">
        <li className="menu-item" onClick={() => console.log('New Order clicked')}>New Order</li>
        <li className="menu-item" onClick={() => console.log('Order List clicked')}>Order List</li>
        <li className="menu-item" onClick={() => console.log('Active Orders clicked')}>Active Orders</li>
        <li className="menu-item" onClick={() => console.log('Order History clicked')}>Order History</li>
        <li className="menu-item" onClick={() => console.log('Support clicked')}>Support</li>
      </ul>
      <button className="close-button" onClick={() => dispatch(toggleMenu())}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
    </div>
  );
};