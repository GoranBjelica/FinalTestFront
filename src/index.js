import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, HashRouter as Router, Routes, Navigate } from 'react-router-dom';
import { Navbar, Nav, Button, Container} from 'react-bootstrap';
import Home from './components/Home';
import Login from './components/authorization/Login'

import NotFound from './components/NotFound';
import {logout} from './services/auth';


import DodajUtakmicu from './components/utakmice/DodajUtakmicu';
import Utakmice from './components/utakmice/Utakmice';
import StrelacGola from './components/utakmice/StrelacGola';



class App extends React.Component {

    

    render() {
        const jwt = window.localStorage['jwt'];

        if(jwt){
            return (
            <>
                <Router>
                    <Navbar expand bg="dark" variant="dark">
                        <Navbar.Brand as={Link} to="/">
                            JWD 59
                        </Navbar.Brand>
                        <Nav>
                        <Nav.Link as={Link} to="/utakmice">
                            Utakmice
                        </Nav.Link>
                        <Nav.Link as={Link} to="/dodaj">
                            Dodaj utakmicu
                        </Nav.Link>
                        <Button onClick={()=>logout()}>Logout</Button>:
                        </Nav>
                    </Navbar>
                    <Container style={{paddingTop:"10px"}}>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/login" element={<Navigate replace to='/'/>} />
                        <Route path="/utakmice" element={<Utakmice/>} />
                        <Route path="/dodaj" element={<DodajUtakmicu/>} />
                        <Route path='/strelacGola/:id' element={<StrelacGola/>}></Route>
                        <Route path="*" element={<NotFound/>} />
                    </Routes>
                </Container>
                </Router>
            </>
        );
        }else{
            return( 
            <>
                <Router>
                <Navbar expand bg="dark" variant="dark">
                        <Navbar.Brand as={Link} to="/">
                            JWD 59
                        </Navbar.Brand>
                        <Nav>
                        
                        <Nav.Link as={Link} to="/login">
                            Login
                        </Nav.Link>
                        </Nav>
                    </Navbar>
                    <Container style={{paddingTop:"10px"}}>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/utakmice" element={<Utakmice/>} />
                        <Route path="/dodaj" element={<DodajUtakmicu/>} />
                        <Route path="/strelacGola/:id" element={<StrelacGola/>}></Route>
                        <Route path="*" element={<Navigate replace to = "/login"/>}/>
                    </Routes>
                    </Container>
                </Router>
            </>);
        }
    }
};


ReactDOM.render(
    <App/>,
    document.querySelector('#root')
);
