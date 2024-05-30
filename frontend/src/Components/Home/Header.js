import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import { GoogleLogin, GoogleOAuthProvider, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const customStyles = {
  content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(0,0,0,0.75)',
      textAlign: 'center',
      width:"450px"
  }
};
export default function Header() {
  const [background, setBackground] = useState("red");
  const location = useLocation();
  const [loginmodalOpen, setLoginModalopen] = useState(false);
  const [accmodalOpen, setAccModalOpen] = useState(false);
  const [mail, setMail] = useState("")
  const [pass, setPass] = useState("")
  const [login, setLogin] = useState(false)
  const [username, setUsername] = useState("")
  const [pic, setPic] = useState("");
  const [logUser, setLogUser] = useState([]);
  const [signUser, setSignUser] = useState([])
  const [name, setName] = useState("")

  useEffect(() => {
    if (location.pathname === "/Home") {
      setBackground("darkgray");
    } else {
      setBackground("red");
    }
  }, [location.pathname]);

  const loginOpen = () => {
    setLoginModalopen(true)
}
const accountOpen = () => {
  setAccModalOpen(true)
}

const loginClose = () => {
  setLoginModalopen(false)
}
const accountClose = () => {
  setAccModalOpen(false)
}

const LogOut = ()  =>{
  googleLogout();
  setLogin(false);
  sessionStorage.clear() ; 
  setUsername("");
  setPic("");
}

const responseGoogle = (response) => {
  setLogin(true);
  const decode = jwtDecode(response.credential)
  setUsername(decode.given_name)
  setPic(decode.picture)
  console.log(decode)
};

const loginApi = (e) =>{
  e.preventDefault();
  const data ={
    email:mail,
    password:pass
  }

axios.post(`http://localhost:8700/getlogin`,data)
.then((res)=>{
  setLogin(true)
  sessionStorage.setItem("user" , res.data.user.username);
  setLogUser(res.data.user);
  console.log(logUser, 'login success');
  var answer = sessionStorage.getItem("user");
  setUsername(answer);
  console.log(username)
}).catch(err=>err, "login failed")
loginClose()
accountClose()

}

const signupApi = (e) =>{
e.preventDefault();
const data = {
  username : name,
  email:mail,
  password:pass
}
axios.post(`http://localhost:8700/getUserId`,data)
.then(res => setSignUser(res.data),
 console.log(signUser, "sign success")
 )
 .catch(err => err, "signfailed")
 accountClose();
 loginClose();
}
const targetName = (e) => {
  setName(e.target.value)
}
const targetMail = (e) => {
  setMail(e.target.value)
}
const targetPass = (e) => {
  setPass(e.target.value)
}
  return (
    <div>
      {!login?(<div className='sticky' style={{ backgroundColor: background }}>
        <div className="logofil"><b>e!</b></div>
        <button type="button" className="btn but" data-bs-toggle="button" onClick={loginOpen}><b>Login</b></button>
        <button type="button" className="btn btn-outline-dark but1" onClick={accountOpen}>Create an account</button>
      </div>):(<div class="container-fluid heads" style={{ backgroundColor: background, height:"50px" }}>
      <div class="symbol">e!</div>
      {/* <img
            src={pic}
            alt="my img"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          /> */}
            <button class="btn btn-outline-danger text-black mx-2" onClick={LogOut} style={{ float: 'right',marginTop:"10px" }}>Logout</button>
            <button class="btn btn-outline-danger text-black" style={{ float: 'right',marginTop:"10px" }}>{username}</button>
      </div>
  )
}
<Modal id="login"
        isOpen={loginmodalOpen}
        style={customStyles}>
          <h1 style={{ margin: 'auto', textAlign: 'center', color: 'orange' }}> <b>Login credentials</b>  </h1>
          <label><h3 style={{ color: 'deeppink' }}>Email:</h3></label>
          <br/>
          <input type="email" value={mail} className='border border-3 rounded-3 shadow-lg  mb-5 bg-body' onChange={targetMail} placeholder='Enter a valid Email' />
          <br/>
          <label><h3 style={{ color: 'deeppink' }}>Password:</h3></label>
          <br />
          <input type="password" value={pass} className='border border-3 rounded-3 shadow-lg  mb-5 bg-body' onChange={targetPass} placeholder='Enter Password'/>
          <br/>
          <button className="logins"  value={username} onClick={loginApi}>login</button>
          <br/>
          <br/>
          <div style={{ textAlign: 'center',margin:'auto',maxWidth:'250px'}} className='px-2'>
                    <GoogleOAuthProvider clientId="593793400537-orcas6h3nrn3h0njb6qlkml80s1ojacu.apps.googleusercontent.com">
                        <GoogleLogin
                            onSuccess={responseGoogle}
                            onError={responseGoogle}
                        />
                    </GoogleOAuthProvider>
                </div>

                <br />
                <br />
          <button className="close"  onClick={loginClose}>Close</button>
          <br/>
        </Modal>
        <Modal isOpen={accmodalOpen} style={customStyles}>
                <form onSubmit={signupApi}>
                    <h1 style={{ color: 'orange' }}>Registeration Form</h1>
                    <br />
                    <label><h3 style={{ color: 'deeppink' }}>Username :</h3></label>
                    <br />
                    <input type="text" onChange={targetName} value={name} className='border border-3 rounded-3 shadow-lg  mb-5 bg-body' placeholder='Enter a name' />
                    <br />
                    <label><h3 style={{ color: 'deeppink'}}>Email:</h3></label>
                    <br />
                    <input type="email" onChange={targetMail} value={mail} className='border border-3 rounded-3 shadow-lg  mb-5 bg-body' placeholder='Enter a valid Email' />
                    <br />
                    <label><h3 style={{ color: 'deeppink'}}>Password:</h3></label>
                    <br />
                    <input type="password" onChange={targetPass} value={pass} className='border border-3 rounded-3 shadow-lg  mb-5 bg-body' placeholder='Enter Password' />
                    <br />
                    <a href=" " >Do you have any account.</a>
                    <br /><br />
                    <input type="submit" className='border border-3 rounded-3 submit' onClick={signupApi} value="submit" />
                    
                </form>
            </Modal>
            </div>
  );
}