import React from 'react';
import AdminNavbar from '../header/AdminNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';  // Bootstrap CSS import

function Layout(props) {
  return (
    <>
      <AdminNavbar />
      {props.children}
    </>
  );
}

export default Layout;
