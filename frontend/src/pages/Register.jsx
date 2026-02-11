import axios from "axios";
import {useState} from "react";

export default function Register(){

 const [data,setData] = useState({
   name:"",
   email:"",
   password:""
 });

 const submit=()=>{
   axios.post("http://localhost:5000/students",data)
   .then(()=>alert("Registered"));
 };

 return(
  <div>
    <h2>Register</h2>
    <input placeholder="Name"
      onChange={e=>setData({...data,name:e.target.value})}/>
    <input placeholder="Email"
      onChange={e=>setData({...data,email:e.target.value})}/>
    <input placeholder="Password" type="password"
      onChange={e=>setData({...data,password:e.target.value})}/>
    <button onClick={submit}>Register</button>
  </div>
 );
}
