import Groupomania from '../images/Groupomania.png'
import { NavLink } from 'react-router-dom'
import {useEffect} from 'react'
import {instance } from '../axios'
import jwt from 'jwt-decode'
import React from 'react'

function Navigation2(){
    const token = localStorage.getItem('token')
    const [ admin, setAdmin ] = React.useState(false)

    const [ toggle, setToggle ] = React.useState(false)

    useEffect(() => {
        if(token){
            const check = jwt(token)
            if(check.roleId === 2 || check.roleId === 3) setAdmin(true)
        }
    
    
    }, []);


    function logout(){
        localStorage.clear();
    }

    function displayToggle(){
        if(toggle){
            setToggle(false)
        }else{
            setToggle(true)
        }

    }

    function ToggleTrue(){
        return (
            <div className='toggle_true'>
                <h2 className='responsive_navbar_cross' onClick={displayToggle}>✖</h2>
                <div className="container_log_reg_toggle">
                    <NavLink className={(nav) => (nav.isActive ? "active" : "inactive")} exact="true" to="/">
                        Forum
                    </NavLink>
                    <NavLink className={(nav) => (nav.isActive ? "active" : "inactive")} exact="true" to="/profile">
                        Profile
                    </NavLink>
                    {admin ? <NavLink className={(nav) => (nav.isActive ? "active" : "inactive")} exact="true" to="/admin" >Admin</NavLink>: null}
                    <NavLink className={(nav) => (nav.isActive ? "" : "inactive")} exact="true" to="/login" onClick={logout}>
                        Logout
                    </NavLink>
                    
                </div>
            </div>
        )
    }

    return(
        <div>
            <div className="container_nav1">
                <div className="img_nav1">
                    <img src={Groupomania} alt="ok"/>
                </div>
                <h2 className='responsive_navbar' onClick={displayToggle}>☰</h2>
                { toggle ? <ToggleTrue/> : null}
                <div className="container_log_reg">
                    <NavLink className={(nav) => (nav.isActive ? "active" : "inactive")} exact="true" to="/">
                        Forum
                    </NavLink>
                    <NavLink className={(nav) => (nav.isActive ? "active" : "inactive")} exact="true" to="/profile">
                        Profile
                    </NavLink>
                    {admin ? <NavLink className={(nav) => (nav.isActive ? "active" : "inactive")} exact="true" to="/admin" >Admin</NavLink>: null}
                    <NavLink className={(nav) => (nav.isActive ? "" : "inactive")} exact="true" to="/login" onClick={logout}>
                        Logout
                    </NavLink>
                    
                </div>
            </div>
        </div>
        
    )
}

export default Navigation2;