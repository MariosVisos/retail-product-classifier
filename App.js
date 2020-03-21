import React from 'react';
import { Provider } from 'react-redux';
import Main from './src/Main';
import configureStore from './src/store/configureStore';

export default function App() {
  const store = configureStore();
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
