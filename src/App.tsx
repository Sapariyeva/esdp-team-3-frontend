import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { SideMenu } from './components/SideMenu/SideMenu';
import { BurgerMenuButton } from './components/BurgerMunuButton/BurgerMenuButton';
import BackgroundImageBlock from './components/BackgrouneImageBlock/BackGroundImageBlock';
const App = () => {
  return (
    <Provider store={store}>
      <BurgerMenuButton />
      <SideMenu />
      <BackgroundImageBlock /> 
      {/* Остальные компоненты */}
    </Provider>
  );
};

export default App;