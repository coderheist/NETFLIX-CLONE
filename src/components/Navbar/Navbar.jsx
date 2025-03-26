import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import {useRef,useEffect} from 'react'
import { logout } from '../../firebase'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Navbar = () => {
  const navRef=useRef();
  useEffect(() => {
    window.addEventListener('scroll',()=>{
      if(window.scrollY>=80){
        navRef.current.classList.add('nav-dark');
      }else{
        navRef.current.classList.remove('nav-dark');
      }
    })
  },[]);


  return (
    <div ref={navRef}className='navbar'>
      <div className="navbar-left">
      <img src={logo} alt="" />
      <ul>
        <li>Home</li>
        <li>Tv Shows</li>
        <li>Movies</li>
        <li>New & popular</li>
        <li>Browse by Language</li>
      </ul>
      </div>
      <div className="navbar-right">
        <img src={search} alt=""  className='icons'/>
        <p>Children</p>
        <img src={bell_icon} alt=""  className='icons'/>
        <div className="navbar-profile">
        <img src={profile_img} alt=""  className='profile'/>
        <img src={caret_icon} alt="" />
        <div className="dropdown">
          <p onClick={()=>{logout()}}>Sign Out Of Netflix</p>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
