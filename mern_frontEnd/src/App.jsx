import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './containers/Home/Home';
import Singup from './containers/Singup/Singup';
import Signin from './containers/Signin/Signin';
import NO_Page from './containers/NO_Page/NO_Page';
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' Component={Home}/>
        <Route path='/Singup' Component={Singup}/>
        <Route path='/Signin' Component={Signin}/>
        <Route path='/*' Component={NO_Page}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
