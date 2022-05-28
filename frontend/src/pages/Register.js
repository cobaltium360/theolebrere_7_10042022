import Navigation1 from "../component/Navigation1";
import React from 'react';
import {useNavigate} from 'react-router';
import {instance } from '../axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validEmail, validPassword, validPrenom, validNom, validUsername } from '../component/regex.js';

function Register(){

    const navigate = useNavigate();
    const [formValue, setformValue] = React.useState({
        email: '',
        password: '',
        username: '',
        lastname: '',
        firstname:''
      });
    
    const handleChange = (event) => {
        setformValue({
          ...formValue,
          [event.target.name]: event.target.value
        });
    }

    const handleSubmit = async() => {
        if(validPassword.test(formValue.password) && validEmail.test(formValue.email) && validPrenom.test(formValue.firstname) && validNom.test(formValue.lastname) && validUsername.test(formValue.username)){
            instance.post(`/auth/signup`, { email : formValue.email, password : formValue.password, firstname: formValue.firstname, lastname: formValue.lastname, username: formValue.username })
            .then(res => {
                navigate("/login")
            })
            .catch((err) => {
                if(err.response.data.message === "email ou username deja existant"){
                    const errMdp = "email ou username deja existant"
                    notifyerr(errMdp)
                }else{
                    if(err.response.data.message === "il manque des informations"){
                        const errAutre = "il manque des informations"
                        notifyerr(errAutre)
                    }
                    
                }
            })
        }else{
            const errRegex = "Merci de respecté les conditions !"
            notifyerr(errRegex)
        }
        
    }

    function notifyerr(a){
        toast.error(`${a}`);
    }

    return(
        <div>
            <Navigation1/>
            <div className="fond_bleu_register">
            <ToastContainer position="bottom-right"/>
                <div className="container_register">
                    <h2 className="titre_log_reg">Inscrivez-vous</h2>
                    <div className="container_input_register">
                        <div className="container_input_label">
                            <label className="label_login" htmlFor="email">Email :</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="enter an email"
                                className="input_login"
                                value={formValue.email}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div className="container_input_label">
                            <label className="label_login" htmlFor="username">Username :</label>
                            <input
                                type="username"
                                name="username"
                                placeholder="enter a username"
                                className="input_login"
                                value={formValue.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="container_input_label">
                            <label className="label_login" htmlFor="firstname">Firstname :</label>
                            <input
                                type="firstname"
                                name="firstname"
                                placeholder="enter a firstname"
                                className="input_login"
                                value={formValue.firstname}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="container_input_label">
                            <label className="label_login" htmlFor="lastname">Lastname :</label>
                            <input
                                type="lastname"
                                name="lastname"
                                placeholder="enter a lastname"
                                className="input_login"
                                value={formValue.lastname}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="container_input_label">
                            <label className="label_login" htmlFor="password">Password :</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="enter a password"
                                className="input_login"
                                value={formValue.password}
                                onChange={handleChange}
                            />
                        </div>
                        
                    </div>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="btn_login"
                        >
                        Inscription
                    </button>
                </div>
            </div>
        </div>
        
    )
}

export default Register;