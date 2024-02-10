import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashBoard from './dashboard';
import Header from './common/header';
import DetailView from './user-details';
// import './App.scss';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/user-details/:id" element={<DetailView />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;