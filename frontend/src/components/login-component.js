import React ,{useState , useEffect } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";



export default function Login(){
    const navigate = useNavigate();
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [authenticated, setAuthenticated] = useState();


    const Login = async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('email' , email)
        formData.append('password' , password)

        await axios.post('http://127.0.0.1:8000/api/login' , formData).then(({data})=>{
            console.log(data)
            navigate('/')
        }).catch(({response})=>{
            if(response.status == 442) {
                console.log(response.data.errors) 
            }
            else{
                console.log(response.data.message)
                setAuthenticated(response.data.authenticated);

            }
        }
        )

    }

    return (
        <div className="container">
           <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <h3>Login</h3>
                  </div>
                  <div className="card-body">
                  <form onSubmit={Login}>
                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput2" className="form-label">Email</label>
                            <input type="email" name="email" className="form-control" value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="example@gmail.com" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput2" className="form-label">Password</label>
                            <input type="passwrod" name="password" className="form-control" value={password} onChange={(e) => {setPassword(e.target.value)}}  />
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-primary" type="submit">Save</button>
                        </div>
                    </form>
                  </div>
                </div>
              </div>
           </div>
        </div>
        
    )
}