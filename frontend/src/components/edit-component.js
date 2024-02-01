import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditShop() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchShop();
  }, []);

  const fetchShop = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/shops/${id}`);
      const { name, description, email } = response.data.shop;
      setName(name);
      setDescription(description);
      setEmail(email);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const updateShop = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("name", name);
    formData.append("email", email);
    formData.append("description", description);

    try {
      await axios.post(`http://127.0.0.1:8000/api/shops/${id}`, formData);
      console.log("Shop updated successfully");
      navigate("/");
    } catch (error) {
      if (error.response.status === 442) {
        console.log(error.response.data.errors);
      } else {
        console.log(error.response.data.message);
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h3>Edit Shop</h3>
            </div>
            <div className="card-body">
              <form onSubmit={updateShop}>
                <div className="mb-3">
                  <label htmlFor="formGroupExampleInput" className="form-label">Name</label>
                  <input type="text" className="form-control" placeholder="Ex:Muhammed Fawzy" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="formGroupExampleInput2" className="form-label">Email</label>
                  <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@gmail.com" />
                </div>
                <div className="mb-3">
                  <label htmlFor="formGroupExampleInput2" className="form-label">Description</label>
                  <textarea className="form-control" name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
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
  );
}