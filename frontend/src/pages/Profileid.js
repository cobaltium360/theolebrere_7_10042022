import Navigation2 from "../component/Navigation2";
import { useParams } from "react-router-dom";
import {useEffect} from 'react';
import { instance } from "../axios";
import { useNavigate } from "react-router";
import React from "react";


function Profileid(){
    const params = useParams()
    const navigate = useNavigate()
    const [data, setData] = React.useState([])
    const [desac, setDesac ] = React.useState(false)
    const [erreur, setErreur ] = React.useState(false)
    const [posts, setPosts ] = React.useState(false)
    const [redirect, setRedirect] = React.useState(false)
    const token = localStorage.getItem('token')
    useEffect(() => {
        setRedirect(false)
        const userId = localStorage.getItem('userId');
        if(!token){
            navigate("/login")
        }
        if(userId === params.id){
            navigate('/profile')
        }else{
            instance.get(`/user/${params.id}`).then(res => {
                setData(res.data)
            }).catch(err => console.log(err))
        }
    }, [redirect]);

    function PasUser(){
        if(erreur){
            
            return <h2 className="pasuser">test</h2>
        }else if(desac){
            
            return <h2 className="pasuser">test2</h2>
        }
    }

    function RedirectUser(a){
        console.log('ok')
        
        navigate(`/profile/${a}`)
        setRedirect(true)
    }

    function ReplaceImg(){
        const lettre = data.username.substr(0, 1).toUpperCase()
        return (
            <div className="container_replace_img">
                <h2 className="lettre_replace_h2">{lettre}</h2>
            </div>
        )
    }

    function DisplayUser(){
        return (
            <div className={data.posts[0] ? "fond_bleu_forum" : "fond_bleu_profileid"}>
                <div className="container_displayuser">
                    <div className="container_container_displayuser_img_pseudo_description">
                        <div className="container_displayuser_img_pseudo_description">
                            {data.imageUrl ?
                                (<div className="container_image_displayprofile"><img src={data.imageUrl} className="image_displayprofile" alt="" /></div>)
                                :
                                (<ReplaceImg/>)}
                                <h2 className="titre_pseudo">{data.username}</h2>
                                {data.description ? <p className="p_description_profileid">{data.description}</p> : null}
                        </div>
                    </div>
                    
                    <div className="container_post_profileid">
                        <h2 className="postedeuserprofileid">Posts de l'utilisateur :</h2>
                        {data.posts[0] ? data.posts.map((post)=>(
                    
                            <ul className="ul_post">
                                <div className="container_post_pseudo_poubelle_profileid">
                                    <h2 className="pseudo_author_post_profileid">{post.author}</h2>
                                </div>
                                {post.imageUrl ? <img className="image_du_forum" src={post.imageUrl} alt=""/> : null}
                                <p>{post.text}</p>
                                {post.comments.map((comment)=>(
                                    <li className="li_post">
                                        <h2 className="nav_link_forum" onClick={() => RedirectUser(comment.authorId)}>{comment.author}</h2>
                                        <p className="p_profileid_post_comment">{comment.text}</p>
                                    </li>
                                ))}
                            </ul>
                            
                        )).reverse(): <p className="p_profileid_aucun_post">aucun poste</p>}</div>
                    
                </div>
            </div>
        )
    }
    
    return(
        <div>
            <Navigation2/>
            
                {data.username ? <DisplayUser/> : <div className="page_login"><h2 className="user_introuvable_profileid">user introuvable !</h2></div> }
            
                
            
        </div>
        
    )
}

export default Profileid;