import React ,{useState , useEffect } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";



export default function CreateShop(){
    const navigate = useNavigate();
    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [descirption , setDescirption] = useState('');


    const CreateShop = async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('name' , name)
        formData.append('email' , email)
        formData.append('descirption' , descirption)

        await axios.post('http://127.0.0.1:8000/api/shops' , formData).then(({data})=>{
            console.log(data.message)
            navigate('/')
        }).catch(({response})=>{
            if(response.status == 442) {
                console.log(response.data.errors) 
            }
            else{
                console.log(response.data.message)
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
                    <h3>Create Shop</h3>
                  </div>
                  <div className="card-body">
                  <form onSubmit={CreateShop}>
                        
                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput" className="form-label">Name</label>
                            <input type="text" name="name"className="form-control" placeholder="Ex:Muhammed Fawzy" value={name} onChange={(e) => {setName(e.target.value)}} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput2" className="form-label">Email</label>
                            <input type="email" name="email" className="form-control" value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="example@gmail.com" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput2" className="form-label">Description</label>
                            <textarea className="form-control" name="descirption"value={descirption} onChange={(e) => {setDescirption(e.target.value)}}></textarea>
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