import './App.css';
import Register from './pages/register/register';
import Login from './pages/login/login';
import Header from './components/header/header'
import Home from './pages/home';
import { Route, Routes, Navigate } from 'react-router-dom';
import Container from "@mui/material/Container"
import { getMeReduxServices } from './redux/services';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import Post from "./components/post/post"
import ChangePost from "./components/change-post/change-post"

const App = () => {
    const { user } = useSelector(state => state.authReducer)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMeReduxServices())
    }, [])

    return (
        <div className="App">
            <Header />
            <Container maxWidth='lg' >
                <Routes>
                    <Route path='/' element={user.fullName ? <Home /> : <Register />} />
                    <Route exact path='/auth/register' element={user.fullName ? <Navigate to='/' replace /> : <Register />} />
                    <Route exact path='/auth/sign-in' element={user.fullName ? <Navigate to='/' replace /> : <Login />} />
                    <Route path="/posts" element={<Post />} />
                    <Route path="/update-post/:postId" element={<ChangePost />} />
                </Routes>
            </Container>

        </div>
    );
}

export default App;
