import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useEffect} from 'react'
import {instance } from '../axios'
import jwt from 'jwt-decode'
import React from 'react'
import Navigation2 from "../component/Navigation2";
import { useNavigate } from "react-router";

function Admin(){
    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    const [ users, setUsers ] = React.useState([])
    const [ admin, setAdmin ] = React.useState(false)

    useEffect(() => {
        if(!token){
            navigate("/login")
        }else{
            const check = jwt(token)
            if(check.roleId === 2 || check.roleId === 3){
                setAdmin(true)
            }else{
                navigate('/forum')
            }
        }
        

        

        instance.get('/user')
        .then(res => setUsers(res.data))
        .catch(err => console.log(err))

        console.log(users)
    }, []);

    function notifyerr(a){
        toast.error(`${a}`);
    }

    function notifySucces(a){
        toast.success(`${a}`);
    }

    function redirect(a){
        navigate(`/profile/${a}`)
    }

    function restoreUser(a){
        instance.delete(`/user/${a}/3`)
        .then(res => {
            instance.get('/user')
                .then(res => setUsers(res.data))
                .catch(err => console.log(err))
            const notRestore = "Restauration du compte réussi !"
            notifySucces(notRestore)
        })
        .catch(err => {
            console.log(err)
            const notRestore = "Impossible de restaurer le compte !"
            notifyerr(notRestore)
        })
    }

    function softdelete(a){
        instance.delete(`/user/${a}/1`)
        .then(res => {
            instance.get('/user')
                .then(res => setUsers(res.data))
                .catch(err => console.log(err))
            const notSoftdelete = "Soft-delete réussi !"
            notifySucces(notSoftdelete)
    })
        .catch(err => {
            console.log(err)
            const notSoftdelete = "Impossible de soft-delete le compte !"
            notifyerr(notSoftdelete)
        })
    }

    function deleteUser(a){
        instance.delete(`/user/${a}/2`)
        .then(res => {
            instance.get('/user')
                .then(res => setUsers(res.data))
                .catch(err => console.log(err))
            const notDelete = "Compte supprimé !"
            notifySucces(notDelete)
    })
        .catch(err => {
            console.log(err)
            const notDelete = "Impossible de supprimé ce compte !"
            notifyerr(notDelete)
        })
    }

    function updateUser(a){
        instance.put(`/admin/${a}/1`)
        .then(res => {
            instance.get('/user')
                .then(res => setUsers(res.data))
                .catch(err => console.log(err))
            const notUpgrade = "User upgrade as Moderator !"
            notifySucces(notUpgrade)
        })
        .catch(err => {
            console.log(err)
            const notUpgrade = "Impossible d'upgrade l'user !"
            notifyerr(notUpgrade)
        })
    }

    function downgradeUser(a){
        instance.put(`/admin/${a}/2`)
        .then(res => {
            instance.get('/user')
            .then(res => setUsers(res.data))
            .catch(err => console.log(err))
        const notDowngrade = "Moderator downgrade !"
        notifySucces(notDowngrade)
    })
        .catch(err => {
            console.log(err)
            const notDowngrade = "Impossible de downgrade ce compte !"
            notifySucces(notDowngrade)
        })
    }

    function UpgradeAdmin(props){
        const role = props.roleId;
        const id = props.userid;
        const check = jwt(token)
        if(check.roleId === 3){
            if(role === 2){
                return(
                    <button onClick={() => downgradeUser(id)} className='admin_btn_softdelete'>
                        downgrade as Moderator
                    </button>
                )
            }else if(role === 3){
                return null
            }else{
                return (
                    <button onClick={() => updateUser(id)} className='admin_btn_restore'>
                        Upgrade as Moderator
                    </button>
                )
            }
        }else{
            return null
        }
    }

    function Status(props){
        const role = props.role
        if(role === 1) return <h2>User</h2>
        else if(role === 2) return <h2>Moderator</h2>
        else if(role === 3) return <h2>Administrator</h2>
    }

    return(
        <div>
            <Navigation2/>
            <div className="fond_bleu_admin">
            <ToastContainer position="bottom-right"/>
            <div className='container_listeuser_admin'>
                <h2 className='liste_user_admin'>Liste des users :</h2>
                {users.map((user) => (
                    <ul className={user.roleId > 1 ? "ul_admin_modo_admin": "ul_admin"} >
                        <Status role={user.roleId} />
                        <h2 className='view_profile_admin' onClick={() => redirect(user.id)}>View Profile</h2>
                        <div className='container_admin_user'>
                            <div className='container_info'>
                                <div className='container_2_admin'>
                                    <p>Email : {user.email}</p>
                                    <p>Username : {user.username}</p>
                                </div>
                                <div className='container_2_admin'>
                                    <p>Firstname : {user.firstname}</p>
                                    <p>Lastname : {user.lastname}</p>
                                </div>
                            </div>
                            <div className='container_option_admin'>
                                <div className='etat_account_admin'>
                                    <p>{user.deletedAt ? <span className='admin_desac'>désactiver</span>: <span className='admin_ac'>activer</span>}</p>
                                </div>
                                <div className='options_admin'>
                                    <button onClick={() => deleteUser(user.id)} className='admin_btn_delete'>
                                        delete
                                    </button>
                                    {user.deletedAt ? (<button onClick={() => restoreUser(user.id)} className='admin_btn_restore'>
                                        restore
                                    </button>) : (<button onClick={() => softdelete(user.id)} className='admin_btn_softdelete'>
                                        soft-delete
                                    </button>)}

                                    <UpgradeAdmin roleId={user.roleId} userid={user.id}/>
                                    
                                </div>
                                
                            </div>
                        </div>
                    </ul>
                ))}
            
            </div>
            </div>
        </div>
           
    )
}

export default Admin;