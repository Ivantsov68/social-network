import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';

const Header = (props) => {
   return <header className = {classes.header}>
      <img src='https://jobstrategy.ru/wp-content/uploads/2015/12/shell-logo-400x400-180x180.png' />
      <div className={classes.loginBlock}>
         { props.isAuth 
         ? <div>{props.login} <br/> <button onClick = {props.logout}>Logout</button></div>
         : <NavLink to={'/login'}>Login</NavLink> }
      </div>
      <span>С*В*О*И</span>
   </header>
}

export default Header;