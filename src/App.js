import logo from './logo.svg';
import React,{useEffect} from 'react';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './Home/home';
import About from './Home/about';
import AuthForm from './Home/authentication';
import Main from './Main/main';
import { logPageView } from './analytics';
import UserDetailsPage from './Main/userdetails';
import ChatBox from './Main/chat';
import UploadPage from './Main/upload';
import DisplayPage from './Main/blog';
function App() {
  useEffect(() => {
    logPageView();
  }, []);
  return (
    <>
    {/* <h1>Welcome</h1> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/main' element={<Main/>}></Route>
          <Route path='/auth' element={<AuthForm/>}></Route>
          <Route path='/chat' element={<ChatBox/>}></Route>
          <Route path='/upload' element={<UploadPage/>}></Route>
          <Route path='/blog' element={<DisplayPage/>}></Route>
          <Route path='/userdetails' element={<UserDetailsPage/>}></Route>
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
