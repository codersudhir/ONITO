import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import UserForm from './UserForm';
import userReducer from './store/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <UserForm />
        {/* <UserTable /> */}
      </div>
    </Provider>
  );
};

export default App;
