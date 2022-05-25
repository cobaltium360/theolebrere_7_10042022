import React from "react";
import { useEffect } from "react";
import Navigation2 from "../component/Navigation2";
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { instance } from '../axios'
import jwt_decode from 'jwt-decode'
import jwt from 'jwt-decode'
import { useRef } from "react";
import {  faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import {  faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import {  faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from "react-router"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Forum(){
    const [ username, setUsername ] = React.useState("");
    const [ posts, setPosts ] = React.useState([]);
    const [ image, setImage ] = React.useState("");
    const [ commentaire, setComment ] = React.useState([]);
    const [ newcommentaire, setNewComment ] = React.useState("");
    const [ textepost, setTextePost ] = React.useState("");
    const [ newpost, setNewpost ] = React.useState("");
    const token = localStorage.getItem('token')
    
    
    const ref = useRef();
    const editPost = (index) => {
        const newposts = [...posts];
        newposts[index].edit = true;;
        setPosts(newposts);
    }

    const editComment = (index, index2) => {
        const newPosts = [...posts];
        newPosts[index].comments[index2].edit = true;
        setPosts(newPosts);
    }
    const navigate = useNavigate();
    useEffect(() => {
        
        if(!token){
            navigate("/login")
        }
        setUsername(localStorage.getItem("username"));
        instance.get(`/post`).then(res => setPosts(res.data));
        
      }, []);

    const onImageChange = (event) => {
        const files = event.target.files;
        setImage(files[0]);
    }

    const handleNewPostChange = (event) => {
        setNewpost(event.target.value);
    }

    const postSubmit = () =>{
        if(image && newpost){
            const data = new FormData();
            data.append('image', image);
            data.append('textpost', newpost);
            instance.post('/post', data)
                .then(res => {
                    instance.get(`/post`)
                    .then(res => setPosts(res.data))
                    .catch(err => console.log(err))
                    const succesPost = "Post Posté !"
                    notifySucces(succesPost)
                })
                .catch(err => {
                    console.log(err)
                    const errPost = "Impossible de posté le post !"
                    notifyerr(errPost)
                })
            setNewpost("");
            ref.current.value = "";
        }else{
            if(image && !newpost){
                const data = new FormData();
                data.append('image', image);
                instance.post('/post', data)
                    .then(res => {
                        instance.get(`/post`)
                        .then(res => setPosts(res.data))
                        .catch(err => console.log(err))
                        const succesPost = "Post Posté !"
                        notifySucces(succesPost)
                    })
                    .catch(err => {
                        console.log(err)
                        const errPost = "Impossible de publié le post !"
                        notifyerr(errPost)
                    })
                setNewpost("");
                ref.current.value = "";
            }else{
                if(!image && newpost){
                    instance.post('/post', {description : newpost})
                        .then(res => {
                            instance.get(`/post`)
                            .then(res => setPosts(res.data))
                            .catch(err => console.log(err))
                            const succesPost = "Post Posté !"
                            notifySucces(succesPost)
                        })
                        .catch(err => {
                            console.log(err)
                            const errPost = "Impossible de publié le post !"
                            notifyerr(errPost)
                        })
                    setNewpost("");
                    ref.current.value = "";
                }else{
                    const errPost = "veuillez rempli au moin un champ"
                    notifyerr(errPost)
                }
            }
        }
        
    }



    const handleSubmitComment = (a,b) => {
        instance.post(`/comment/${a}`, {comment: commentaire[a]})
        .then(res => {
            commentaire[a] = ""
            instance.get(`/post`)
            .then(res => setPosts(res.data)
            .catch(err => console.log(err)))
            const addcomment = "Commentaire posté !"
            notifySucces(addcomment)
        })
        .catch(err => {
            console.log(err)
            const errAddComment = "Impossible de posté le commentaire"
            notifyerr(errAddComment)
        })
        
        
    }

    function handleChangeComment(event){
        const test = []
        test[event.target.id] = event.target.value
        setComment(test)
    }

    const handleModifyComment = (event) => {
        setNewComment(event.target.value);
    }

    const handleChangePost = (event) => {
        setTextePost(event.target.value)
    }

    function IsAuthorComment(props){
        const idComment = props.idAuthorComment;
        const userId = parseInt(localStorage.getItem('userId'));
        if(idComment === userId) {
            return (<FontAwesomeIcon icon={faPen}/> );
        }else{
            return "";
        }
    }

    function IsAuthorCommentDelete(props){
        const idComment = props.idAuthorComment;
        const userId = parseInt(localStorage.getItem('userId'));
        if(idComment === userId) {
            return <FontAwesomeIcon icon={faTrash}/>;
        }else{
            return "";
        }
       
    }
    const handleDeleteComment = (a) => {
        instance.delete(`/comment/${a}/2`)
        .then(res => {
            instance.get(`/post`)
            .then(res => setPosts(res.data))
            .catch(err => console.log(err))
            const succesDeleteComment = "Commentaire supprimé !"
            notifySucces(succesDeleteComment)
        })
        .catch(err => {
            console.log(err)
            const errDeleteComment = "Impossible de supprimé le commentaire"
            notifyerr(errDeleteComment)
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

    function IsAuthorPostModify(props){
        const idPost = props.idAuthorPost;
        const userId = parseInt(localStorage.getItem('userId'));
        if(userId === idPost){
            return <FontAwesomeIcon icon={faPen}/>;
        }else{
            return "";
        }
    }

    function handleSupressionPost(a){
        instance.delete(`/post/${a}/2`)
        .then(res =>  {
            instance.get(`/post`)
            .then(res => setPosts(res.data))
            .catch(err => console.log(err))
            const succesDeletePost = "Post supprimé !"
            notifySucces(succesDeletePost)
        })
        .catch(err => {
            console.log(err)
            const errDeletePost = "Impossible de supprimé le post !"
            notifyerr(errDeletePost)
        })
    }

    function handleEditCommentaire(a){
        instance.put(`/comment/${a}`, {comment: newcommentaire})
        .then(res => {
            instance.get(`/post`)
            .then(res => setPosts(res.data))
            .catch(err => console.log(err))
            const succesNewComment = "Commentaire modifié !"
            notifySucces(succesNewComment)
        })
        .catch(err => {
            console.log(err)
            const errNewComment = "Impossible de modifier le commentaire"
            notifyerr(errNewComment)
        })
    }

    function handleModifyPost(a){
        instance.put(`/post/${a}`, {post : textepost})
        .then(res => {
            instance.get(`/post`)
            .then(res => setPosts(res.data))
            .catch(err => console.log(err))
            const succesNewPost = "Post modifié"
            notifySucces(succesNewPost)
        })
        .catch(err => {
            console.log(err)
            const errNewPost = "Impossible de modifier le post"
            notifyerr(errNewPost)
        })
    }

    function handleSoftDeletePost(a){
        instance.delete(`/post/${a}/1`)
        .then(res =>  {
            instance.get(`/post`)
            .then(res => setPosts(res.data))
            .catch(err => console.log(err))
            const softdeletePost = "Post désactivé !"
            notifySucces(softdeletePost)
        })
        .catch(err => {
            console.log(err)
            const errSoftdeletePost = "Impossible de désactiver le post !"
            notifyerr(errSoftdeletePost)
        })
    }

    function handleRestorePost(a){
        instance.delete(`/post/${a}/3`)
        .then(res =>  {
            instance.get(`/post`)
            .then(res => setPosts(res.data))
            .catch(err => console.log(err))
            const restorePost = "Post restauré !"
            notifySucces(restorePost)
        })
        .catch(err => {
            console.log(err)
            const errRestorePost = "Impossible de restaurer le post !"
            notifyerr(errRestorePost)
        })
    }

    function handleSoftDeleteComment(a){
        instance.delete(`/comment/${a}/1`)
        .then(res => {
            instance.get(`/post`)
            .then(res => setPosts(res.data))
            .catch(err => console.log(err))
            const softdeleteComment = "Commentaire désactivé !"
            notifySucces(softdeleteComment)
        })
        .catch(err => {
            console.log(err)
            const errSoftdeleteComment = "Impossible de désactivé le commentaire !"
            notifyerr(errSoftdeleteComment)
        })
    }

    function handleRestoreComment(a){
        instance.delete(`/comment/${a}/3`)
        .then(res => {
            instance.get(`/post`)
            .then(res => setPosts(res.data))
            .catch(err => console.log(err))
            const restoreComment = "Commentaire restauré !"
            notifySucces(restoreComment)
        })
        .catch(err => {
            console.log(err)
            const errRestoreComment = "Impossible de restaurer le commentaire"
            notifyerr(errRestoreComment)
        })
    }


    function OptionAdminPost(props){
        if(token) {
            const check = jwt(token)
            if(check.roleId === 2 || check.roleId === 3){
                
                const softdelete = props.softdelete;
                const idpost = props.idpost;
                return (
                    <div className="container_admin_forum">
                        <p className="p_admin_forum">{softdelete ? (<span className="admin_desac">&nbsp;Inactif</span>): (<span className="admin_ac">&nbsp;Actif</span>)}</p>
                        <div className='options_admin_forum'>
                                        <button onClick={() => handleSupressionPost(idpost)} className='admin_btn_delete'>
                                            delete
                                        </button>
    
                                        {softdelete ? (<button onClick={() => handleRestorePost(idpost)} className='admin_btn_restore'>
                                            restore
                                        </button>) : (<button onClick={() => handleSoftDeletePost(idpost)} className='admin_btn_softdelete'>
                                            soft-delete
                                        </button>)}
                        </div>
                    </div>
                )
            }
        }

        
    }
    function OptionAdminComment(props){
        if(token){
            const check = jwt(token)
            if(check.roleId === 2 || check.roleId === 3){
                const softdelete = props.softdelete;
                const idcomment = props.idcomment;
                return (
                    <div className="container_admin_forum_comment">
                        <p>{softdelete ? (<span className="admin_desac">&nbsp;Inactif</span>): (<span className="admin_ac">&nbsp;Actif</span>)}</p>
                        <div className='options_admin_forum_comment'>
                                        <button onClick={() => handleDeleteComment(idcomment)} className='admin_btn_delete_comment'>
                                            delete
                                        </button>
                                       
                                        {softdelete ? (<button onClick={() => handleRestoreComment(idcomment)} className='admin_btn_restore_comment'>
                                            restore
                                        </button>) : (<button onClick={() => handleSoftDeleteComment(idcomment)} className='admin_btn_softdelete_comment'>
                                            soft-delete
                                        </button>)}
    
                                        
                                        
                        </div>
                    </div>
                )
            }
        }
        
    }

    function handleLike(a){
        instance.get(`/like/${a}/1`)
        .then(res =>  instance.get(`/post`).then(res => setPosts(res.data)))
    }

    function handleDislike(a){
        instance.get(`/like/${a}/2`)
        .then(res =>  instance.get(`/post`).then(res => setPosts(res.data)))
    }

    function handleUndislike(a){
        instance.delete(`/like/${a}/2`)
        .then(res =>  instance.get(`/post`).then(res => setPosts(res.data)))
    }
    function handleUnlike(a){
        instance.delete(`/like/${a}/1`)
        .then(res =>  instance.get(`/post`).then(res => setPosts(res.data)))
    }

    function ReplaceImgForum(props){
        const lettre = props.pseudo.substr(0, 1).toUpperCase()
        return(
            <div className="replace_img_forum_post"><h2 className="replace_h2_forum_post">{lettre}</h2></div>
        )
    }

    
    function LikedPost(props){
        const index = props.index1
        const postid = props.postId
        const nombrelike = posts[index].likes.length - 1
        if(token){
            const check = jwt(token)
            if(posts[index].likes[0]){
                for(let i = 0 ; i <= nombrelike; i++){
                    
                    if(posts[index].likes[i].userId === check.userId){
                        return (
                            <h2><FontAwesomeIcon onClick={() => handleUnlike(postid)} className="liked" icon={faThumbsUp}/></h2>
                        )
                    }
    
                    if(i === nombrelike){
                        return(
                            <h2 onClick={() => handleLike(postid)}><FontAwesomeIcon  icon={faThumbsUp}/></h2>
                        )
                    }
                }
            }else{
                return(
                    <h2 onClick={() => handleLike(postid)}><FontAwesomeIcon  icon={faThumbsUp}/></h2>
                )
            }
        }
        
    }

    function DislikedPost(props){
        const index = props.index1
        const postid = props.postId
        const nombredislike = posts[index].dislikes.length - 1
        if(token){
            const check = jwt(token)
            if(posts[index].dislikes[0]){
                for(let i =0 ; i <= nombredislike; i++){
                
                    if(posts[index].dislikes[i].userId === check.userId){
                        return (
                            <h2><FontAwesomeIcon onClick={() => handleUndislike(postid)} className="disliked" icon={faThumbsDown}/></h2>
                        )
                    }
                    if(i === nombredislike){
                        return (
                            <h2 onClick={() => handleDislike(postid)}><FontAwesomeIcon icon={faThumbsDown}/></h2>
                        )
                    }
                }
            }else{
                return(
                    <h2 onClick={() => handleDislike(postid)}><FontAwesomeIcon icon={faThumbsDown}/></h2>
                )
            }
        }
    }

    function notifyerr(a){
        toast.error(`${a}`);
    }

    function notifySucces(a){
        toast.success(`${a}`);
    }

    return(
        <div className="main">
            <Navigation2/>
            <div className={posts[0] ? "fond_bleu_forum" : "fond_bleu_forum_vide"}>
            <ToastContainer position="bottom-right"/>
                <div className="container_create_post">
                    <div className="contour">
                        <h2 className="titre_forum_newpost">{username} partagez quelque chose !</h2>
                        <textarea maxlength="1000" type="text" className="textarea_forum" onChange={handleNewPostChange} value={newpost}/>
                        <div className="container_input_submit">
                            <label className="label_upload" for="file_forum"><FontAwesomeIcon icon={faArrowUpFromBracket}/></label>
                            <input type="file" id="file_forum" className="inputfileforum" name="image" ref={ref} onChange={onImageChange} />
                            <button type="submit" className="btn_newpost_forum" onClick={postSubmit} >Post</button>
                        </div>
                    

                    
                    </div>
                </div>
                <div className="post_forum">
                    <h2 className="title_post">Fil d'actualités</h2>
                    {posts.map((post, index) => (
                        <ul className="ul_post" >
                            <OptionAdminPost softdelete={post.deletedAt} idpost={post.id}/>
                        <div className="container_post_pseudo_poubelle">
                            <NavLink exact="true" to={{pathname:"/profile/" + post.userId,}} className="nav_link_forum">
                            <div className="container_imgprofile_forum_navlink">
                                <div className="container_imgprofile_forum">
                                    {post.authorImg ? <img className="img_profile_forum_post" src={post.authorImg}/> : <ReplaceImgForum pseudo={post.author}/>}
                                </div>
                            <h2 className="titre_log_reg_forum">{post.author}</h2><br/>
                            </div>
                            </NavLink>
                            
                            <div className="container_post_trash_pen">
                                <p className="p_margin" onClick={() => editPost(index)}><IsAuthorPostModify idAuthorPost={post.userId}/></p>
                                <p className="p_margin" onClick={() => handleSupressionPost(post.id)}><IsAuthorPost idAuthorPost={post.userId}/></p>
                            </div>
                        </div>
                        <div className="input_change_post">
                        {post.imageUrl ? <img className="image_du_forum" src={post.imageUrl} alt=""/> : null}
                        
                        {post.edit ? (<div className="container_input_edit"><input type="text" maxlength="1000" className="input_edit_post" onChange={handleChangePost} defaultValue={post.text}/><button className="btn_edit_post" onClick={() => handleModifyPost(post.id)}>Modifier</button></div>) : (<p className="p_margin">{post.text}</p>)}
                        </div>
                            {post.comments.map((comment, index2)=>(
                                <li className="li_post">
                                    <OptionAdminComment softdelete={comment.deletedAt} idcomment={comment.id}/>
                                    <div className="container_comment">
                                        <NavLink className="nav_link_forum2" exact="true" to={{pathname:"/profile/" + comment.authorId,}}>{comment.author}</NavLink>
                                        <div className="container_pen_trash">
                                                <p className="p_margin" onClick={() => editComment(index, index2)}><IsAuthorComment idAuthorComment={comment.authorId}/></p>
                                                <p className="p_margin" onClick={() => handleDeleteComment(comment.id)}><IsAuthorCommentDelete idAuthorComment={comment.authorId} idducommentaire={comment.id}/></p> 
                                        </div>  
                                    </div>
                                    <br/>
                                    
                                        
                                        {comment.edit ? (<div><input type="text" maxlength="500" className="input_edit_comment" onChange={handleModifyComment} defaultValue={comment.text}/><button className="btn_edit_comment" onClick={() => handleEditCommentaire(comment.id)}>Modifier</button></div>) : (<p className="input_change_comment">{comment.text}</p>)}
                                        
                                                 
                                    
                                    
                                </li>
                            
                            ))} 
                        <div className="input_commentaire">
                            <input id={post.id} maxlength="500" className="input_forum_commentaire" value={commentaire[post.id]} onChange={handleChangeComment} type="text"/><button type="submit" className="btn_forum_commentaire" onClick={() => handleSubmitComment(post.id, index)}>Post</button>
                        </div>
                        <div className="container_like_dislike">
                            <div className="container_like">
                                
                                <h2>{post.likes.length}</h2>
                                <LikedPost index1={index} postId={post.id}/>
                            </div>
                            <div className="container_dislike">
                                <h2>{post.dislikes.length}</h2>
                                <DislikedPost index1={index} postId={post.id}/>
                            </div>
                            
                        </div>
                        </ul>
                    )).reverse()}
                </div>
            </div>
        </div>
        
    )
}

export default Forum;