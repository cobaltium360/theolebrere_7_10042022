import Groupomania from '../images/Groupomania.png'
import { NavLink } from 'react-router-dom'
import React from 'react'

function Navigation1(){

    const [ toggle, setToggle ] = React.useState(false)

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
                    <NavLink className={(nav) => (nav.isActive ? "active" : "inactive")} exact="true" to="/register">
                        Register
                    </NavLink>
                    <NavLink className={(nav) => (nav.isActive ? "active" : "inactive")} exact="true" to="/login">
                        Login
                    </NavLink>
                    
                </div>
            </div>
            )}
    return(
        <div>
            <div className="container_nav1">
                <div className="img_nav1">
                    <img src={Groupomania} alt="ok"/>
                </div>
                <h2 className='responsive_navbar' onClick={displayToggle}>☰</h2>
                { toggle ? <ToggleTrue/> : null}
                <div className="container_log_reg">
                    <NavLink className={(nav) => (nav.isActive ? "active" : "inactive")} exact="true" to="/register">
                        Register
                    </NavLink>
                    <NavLink className={(nav) => (nav.isActive ? "active" : "inactive")} exact="true" to="/login">
                        Login
                    </NavLink>
                </div>
            </div>
        </div>
        
    )
}

export default Navigation1;