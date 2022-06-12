import React from "react";
import { useEffect } from "react";
import Navigation2 from "../component/Navigation2";
import { instance } from '../axios'
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {  faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validPrenom, validNom } from '../component/regex.js';



function Profile() {
    const [dataAPI, setData] = React.useState({firstname : "", lastname: "", username : "", email: "", description :""});
    const [descriptionFront, setDescription] = React.useState("");
    const [emailFront, setEmail] = React.useState("")
    const [usernameFront, setUsername] = React.useState("")
    const [ firstnameFront, setFirstnameFront ] = React.useState("");

    const [ lastnameFront , setLastnameFront ] = React.useState("");

    const [image, setImage] = React.useState("");
    const [isDesactiver, setDesac] = React.useState(false)
    const userID = localStorage.getItem('userId')
    const [posts, setPosts ] = React.useState(false)
    const navigate = useNavigate();
    const [redirect, setRedirect] = React.useState(false)
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token')
    useEffect(() => {

        if(!token){
            navigate("/login")
        }

        instance.get(`/user/${userId}`).then(res => {
                setData(res.data);
                if (res.data.deletedAt) setDesac(true)
                if(res.data.posts[0]){
                    setPosts(true)
                }
                
            })
            .catch(err => console.log(err))
    }, []);

    const handleChange = (event) => {
        setDescription(event.target.value);
    }

    const handleChangeFirstname = (event) => {
        setFirstnameFront(event.target.value);
    }

    const handleChangeLastname = (event) => {
        setLastnameFront(event.target.value);
    }

    const onImageChange = (event) => {
        const files = event.target.files;
        setImage(files[0]);

    }
    const handleSubmit = (event) => {
        const update = {}
        if(descriptionFront !== ""){
            update.description = descriptionFront
        }
        if(firstnameFront !== ""){
            update.firstname = firstnameFront
        }
        if(lastnameFront !== ""){
            update.lastname = lastnameFront
        }
        if (!image && descriptionFront === "" && firstnameFront === "" && lastnameFront === "") {
            const errModif = 'veuillez remplir/modifer la description ou la photo'
            notifyerr(errModif)
        } else {
            if ((image && update.description) || (image && update.lastname) || (image && update.firstname)) {
                if((update.firstname && !validPrenom.test(update.firstname)) || (update.lastname && !validNom.test(update.lastname))){
                    const errRegex = "Merci de remplir correctement les champs"
                    notifyerr(errRegex)
                    return
                }else{
                    const update2 = JSON.stringify(update)
                    const data = new FormData();
                    data.append('image', image);
                    data.append('profileinfo', update2)
                    instance.put(`/user/${userID}`, data)
                        .then(res => 
                            {instance.get(`/user/${userId}`)
                            .then(res => setData(res.data))
                            .catch(err => console.log(err))
                        const succesProfil = "Profil Modifié"
                        notifySucces(succesProfil)
                    })
                        .catch(err => {
                            console.log(err)
                            const errProfil = "Une erreur est survenu merci de réessayer"
                            notifyerr(errProfil)
                        })
                    setDescription("")
                    setFirstnameFront("")
                    setLastnameFront("")
                }
                
            }
            
            else {
                if (image && descriptionFront === "" && firstnameFront === "" && lastnameFront === "") {
                    const data = new FormData();
                    data.append('image', image);
                    instance.put(`/user/${userID}`, data)
                        .then(res => {
                            instance.get(`/user/${userId}`)
                            .then(res => setData(res.data))
                            .catch(err => console.log(err))
                        const succesProfil = "Profil Modifié !"
                        notifySucces(succesProfil)
                    })
                        .catch(err => {
                            console.log(err)
                            const errProfil = "Une erreur est survenu merci de réessayer"
                            notifyerr(errProfil)
                        })
                    

                }else {
                    if ((!image && update.description) || (!image && update.firstname) || (!image && update.lastname)) {
                        if((update.firstname && !validPrenom.test(update.firstname)) || (update.lastname && !validNom.test(update.lastname))){
                            const errRegex = "merci de remplir correctement les champs"
                            notifyerr(errRegex)
                            return
                        }else{
                            instance.put(`/user/${userID}`, { update })
                                .then(res => {
                                    instance.get(`/user/${userId}`)
                                    .then(res => setData(res.data))
                                    .catch(err => console.log(err))
                                const succesProfil = "Profil Modifié !"
                                notifySucces(succesProfil)
                            })
                                .catch(err => {
                                    console.log(err)
                                    const errProfil = "une erreur est survenu merci de réessayer"
                                    notifyerr(errProfil)
                                })
                            setDescription("")
                            setFirstnameFront("")
                            setLastnameFront("")
                        }
                        
                        
                        
                        
                    }
                }
            }

        }

    }
    const handleSuppression = () => {
        const userId = localStorage.getItem('userId');
        instance.delete(`/user/${userId}/2`)
            .then(res => {
                localStorage.clear();
                navigate("/")
            })
            .catch(err => {
                console.log(err)
                const deleteErr = "impossible de supprimé le compte !"
                notifyerr(deleteErr)
            })
    }
    const handleDesactivation = () => {
        const userId = localStorage.getItem('userId');
        instance.delete(`/user/${userId}/1`)
            .then(res => { 
                setDesac(true) 
                const softSucces = "Compte désactivé !"
                notifySucces(softSucces)
            })
            .catch(err => {
                console.log(err)
                const softErr = "Impossible de désactiver le compte !"
                notifyerr(softErr)
            })
    }


    const handleReactivation = () => {
        const userId = localStorage.getItem('userId');
        instance.delete(`/user/${userId}/3`)
            .then(res => { 
                setDesac(false) 
                const restoreSucces = "Compte réactiver !"
                notifySucces(restoreSucces)
            })
            .catch(err => {
                console.log(err)
                const restoreErr = "Impossible de réactiver le compte"
                notifyerr(restoreErr)
            })
    }

    function RedirectUser(a){
        navigate(`/profile/${a}`)
        setRedirect(true)
    }

    function handleSupressionPost(a){
        instance.delete(`/post/${a}/2`)
        .then(res =>  {
            instance.get(`/user/${userId}`)
            .then(res =>setData(res.data))
            .catch(err => console.log(err))
            const deletePostSucces = "Post supprimé !"
            notifySucces(deletePostSucces)
        })
        .catch(err => {
            console.log(err)
            const deletePostErr = "Impossible de supprimé le post"
            notifyerr(deletePostErr)
        })
    }

    function IsAuthorPost(props){
        const idPost = props.idAuthorPost;
        const userId = parseInt(localStorage.getItem('userId'));
        if(userId === idPost){
            return <FontAwesomeIcon icon={faTrash}/>;
        }else{
            return "";
        }
    }

    function ReplaceImg(){
        if(dataAPI.username){
            
        const lettre = dataAPI.username.substr(0, 1).toUpperCase()
        return (
            <div className="container_replace_img">
                <h2 className="lettre_replace_h2">{lettre}</h2>
            </div>
        )
        }
        
    }

    function notifyerr(a){
        toast.error(`${a}`);
    }

    function notifySucces(a){
        toast.success(`${a}`);
    }

    return (
        <div>
            <Navigation2 />
            <div className="fond_bleu_forum">
                <ToastContainer position="bottom-right"/>
                <div className="container_profile">
                    
                    <div className="container_infoprofile">
                        <div className="container_div_dangereuse">
                            <div className="div_dangereuse">
                                <h2 className="profile_option_ducompte">Option du comtpe :</h2>
                            {isDesactiver ? (
                                <div className="boutton_div_danger">
                                    <button
                                        type="submit"
                                        onClick={handleReactivation}
                                        className="btn_dangereux_reactiver"
                                    >
                                        Réactiver le compte
                                    </button>
                                </div>) : (
                                <div className="boutton_div_danger">
                                    <button
                                        type="submit"
                                        onClick={handleDesactivation}
                                        className="btn_dangereux_desac"
                                    >
                                        Desactiver le compte
                                    </button>
                                </div>
                            )}
                            <div className="boutton_div_danger">
                                <button
                                    type="submit"
                                    onClick={handleSuppression}
                                    className="btn_dangereux_suppr"
                                >
                                    Suppression du compte
                                </button>
                            </div>
                        </div>
                        </div>
                        <div className="container_infoprofile_border">
                        {dataAPI.imageUrl ?
                        (<div className="container_img"><img src={dataAPI.imageUrl} className="image_profile" alt="" /></div>)
                        :
                        (<ReplaceImg usernamereplace={dataAPI.username}/>)}
                        <div>
                            <h2>Changez votre photo de profil :</h2>
                            <label htmlFor="file_profile" className="label_upload_profile" ><FontAwesomeIcon className="logo_upload_profile" icon={faArrowUpFromBracket}/></label>
                            <input type="file" id="file_profile" className="inputfileforum" name="image" onChange={onImageChange} />
                        </div>
                        <div className="trixe_profile">
                            <div>
                                <p><label htmlFor="username_profile">Username :</label></p>
                                <input
                                    disabled={true}
                                    name="username"
                                    value={dataAPI.username}
                                    className="input_disable"
                                    id="username_profile"
                                />
                            </div>
                            <div>
                                <p><label htmlFor="email_profile">Email :</label></p>
                                <input
                                    disabled={true}
                                    name="email"
                                    value={dataAPI.email}
                                    className="input_disable"
                                    id="email_profile"
                                />
                            </div>
                        </div>
                        <div className="trixe_profile">
                            <div>
                                <p><label htmlFor="prenom_profile">Prénom :</label></p>
                                <input
                                    className="input_enable_profile"
                                    name="firstname"
                                    defaultValue={dataAPI.firstname}
                                    onChange={handleChangeFirstname}
                                    id="prenom_profile"
                                />
                            </div>
                            <div>
                                <p><label htmlFor="nom_profile">Nom :</label></p>
                                <input
                                    className="input_enable_profile"
                                    name="lastname"
                                    defaultValue={dataAPI.lastname}
                                    onChange={handleChangeLastname}
                                    id="nom_profile"
                                />

                            </div>
                        </div>

                        <div>
                            <p><label htmlFor="description_profile">Description :</label></p>
                            <input
                                type="description"
                                name="description"
                                id="description_profile"
                                maxLength="200"
                                className="input_enable_profile"
                                placeholder="enter a description"
                                defaultValue={dataAPI.description}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="btn_update"
                        >
                            Mettre à jour
                        </button>
                        
                        
                    </div>
                    </div>
                </div>
            
                <div>
                    
                    <div className="container_post_profile">
                        <h2 className="postedeuserprofileid">Vos Posts :</h2>
                    {posts ? dataAPI.posts.map((post ,index)=>(
                    
                            <ul key={index} className="ul_post">
                                <div className="container_post_pseudo_poubelle_profile">
                                    <h2 className="pseudo_author_post_profileid">{post.author}</h2><br/>
                                    <p onClick={() => handleSupressionPost(post.id)}><IsAuthorPost idAuthorPost={post.userId}/></p>
                                </div>
                                <div className="input_change_post">
                                    {post.imageUrl ? <img className="image_du_forum" src={post.imageUrl} alt=""/> : null}
                                    <p>{post.text}</p>
                                </div>
                                {post.comments.map((comment, index2)=>(
                                    <li key={index2} className="li_post">
                                        <h2 className="nav_link_forum" onClick={() => RedirectUser(comment.authorId)}>{comment.author}</h2>
                                        <p className="commentaire_post_profile">{comment.text}</p>
                                    </li>
                                ))}
                            </ul>
                            
                        )): <p className="p_profileid_aucun_post">aucun poste</p>}</div>
                </div>
            </div>
        </div>

    )
}

export default Profile;