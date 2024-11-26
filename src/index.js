import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './Login.js';
import Register from './Register.js';
import Home from './Home.js';
import Profile from './Profile.js';
import Message from './Message.js';
import Profilelist from './Profilelist.js';
import Edit from './Edit.js';
import Community from './Community.js';
import Post from './Post.js';
import Policy from './Policy.js';
import Contact from './Contact.js';
import Service from './Service.js';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/profile/:userId' element={<Profile />} /> 
      <Route path='/message' element={<Message />} />
      <Route path='/profilelist' element={<Profilelist />} />
      <Route path='/edit-profile/:userId' element={<Edit />} />
      <Route path='/community' element={<Community />} />
      <Route path='/community/:communityId' element={<Post />} />
      <Route path='/policy' element={<Policy />} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/service' element={<Service />} />
    </Routes>
  </BrowserRouter>
);
