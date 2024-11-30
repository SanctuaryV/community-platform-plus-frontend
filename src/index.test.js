import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

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

test('renders welcome message', () => {
  render(
    <BrowserRouter>
      <Home />
      <Login />
      <Register />
      <Profile />
      <Message />
      <Profilelist />
      <Edit />
      <Community />
      <Post />
      <Policy />
      <Contact />
      <Service />
    </BrowserRouter>
  );

  // ทดสอบที่นี่
});
