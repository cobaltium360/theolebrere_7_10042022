import Navigation1 from "../component/Navigation1";
import React from 'react';
import {useNavigate} from 'react-router';
import {instance } from '../axios'
import { validEmail, validPassword } from '../component/regex.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useEffect} from 'react';


function Login(){
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    const [formValue, setformValue] = React.useState({
        email: '',
        password: ''
      });

      useEffect(() => {
        if(token){
            navigate("/")
        }
    }, []);

    const handleChange = (event) => {
        setformValue({
          ...formValue,
          [event.target.name]: event.target.value
        });
    }
        
    function notifyerr(a){
        toast.error(`${a}`);
    }

    


    const handleSubmit = async() => {
        if (validPassword.test(formValue.password) && validEmail.test(formValue.email)) {
            instance.post(`/auth/signin`, { email : formValue.email, password : formValue.password })
                .then(res => {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('userId', res.data.userId);
                    localStorage.setItem('username', res.data.username);
                    navigate('/')
                })
                .catch((err) => {
                    if(err.response.data.error == "Mot de passe incorrect !"){
                        const errMdp = "Mot de passe incorect"
                        notifyerr(errMdp)
                    }else{
                        const errAutre = "Une erreur s'est produite !"
                        notifyerr(errAutre)
                    }
                })
        }else{
            const errRegex = "Merci de respecté les conditions !"
            notifyerr(errRegex)
        }
        
      
    }



    return(
        <div>
            <Navigation1/>
            <div className="page_login">
            <ToastContainer position="bottom-right"/>
            <div className="container_login">
                        <h2 className="titre_log_reg">Connectez-vous</h2>
                    
                        <div className="container_input_login">
                            <div className="container_input_label">
                                <label className="label_login" htmlFor="email">Email :</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="input_login"
                                    placeholder="enter an email"
                                    value={formValue.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="container_input_label">
                            <label className="label_login" htmlFor="password">Password :</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="input_login"
                                    placeholder="enter a password"
                                    value={formValue.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    
                        <button
                            type="submit"
                            className="btn_login"
                            onClick={handleSubmit}
                        >
                            Login
                        </button>
                    </div>
            </div>
            
        </div>
        
    )
}

export default Login;