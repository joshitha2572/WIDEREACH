import React,{useState,useEffect} from 'react'
import M from 'materialize-css' 
import {useHistory} from 'react-router-dom'


const CreatePost = ()=>{
    const history = useHistory()
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [ url,setUrl] = useState("")
    useEffect(()=>{
        if(url){
        fetch("/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                body,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
            
            if(data.error){
                M.toast({html:data.error})
    
            }
            else{
                M.toast({html:"created post successfully"})
                history.push('/')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    },[url])
    const postDetails = ()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","Wide Reach")
        data.append("cloud_name","dqmbi4fa9")
        fetch("	https://api.cloudinary.com/v1_1/dqmbi4fa9/image/upload",{
            method:"post",
            body:data
        })
       .then(res=>res.json())
       .then(data=>{
           setUrl(data.url) 
       })
       .catch(err=>{
           console.log(err)
       })
       
       
    }
    return(
        <div className ="card input-filed">
        
            <input
             type="text"
              placeholder ="title"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              />
            <input
             type="text" 
             placeholder ="body"
             value={body}
             onChange={(e)=>setBody(e.target.value)}
             />
            <div className="file-field input-field">
                <div className="btn">
                    <span>File</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
                </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text"/>
            </div>
            </div>
            <button className="btn waves-effect waves-light"
            onClick={()=>postDetails()}
            >
                      
                      Submit Post
                </button>
        


        </div>
    )
}


export default CreatePost