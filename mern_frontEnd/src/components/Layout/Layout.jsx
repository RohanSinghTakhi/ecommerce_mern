import React from 'react';
import AdminNavbar from '../header/AdminNavbar';

function Layout(props) {
  return (
    <>
      <AdminNavbar />
      {props.children}
    </>
  );
}

export default Layout;
