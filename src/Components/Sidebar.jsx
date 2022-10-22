import React from 'react'
import '../Stylesheets/sidebar.scss';
import Chats from './Chats';
import Navbar from './Navbar';
import Searchbar from './Searchbar';

function Sidebar() {
  return (
    <div className='sidebar'>
        <Navbar/>
        <Searchbar/>
        <Chats/>
    </div>
  )
}

export default Sidebar