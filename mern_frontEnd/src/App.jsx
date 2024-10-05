import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,NavDropdown,Container,Nav } from 'react-bootstrap'; // Use Container instead of Jumbotron
import AdminNavbar from './components/header/AdminNavbar';
import Layout from './components/Layout/Layout';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <Layout>
      <h1>
        main
      </h1>
    </Layout>
    </>
  );
}

export default App;
