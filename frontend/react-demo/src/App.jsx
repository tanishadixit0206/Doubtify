import './App.css';
import React from 'react';
import RoutesD from "./RoutesD"
import { AuthContextProvider } from './context/AuthContext';
import AddSolutionDiv from './components/AddSolutionDiv';

function App() {
  return (
    <AuthContextProvider>
      <RoutesD />
    </AuthContextProvider>
  );
}

export default App;
