import React ,{useState , useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";




export default function ShopList(){
    
    const [shops , setShops] = useState([]);
    const [authenticated, setAuthenticated] = useState();
   

 
    const fetchShops = async()=>{
        await axios.get('http://127.0.0.1:8000/api/shops' ).then(({data})=>{setShops(data)})
       
       
    }

    const deleteShop = async(id)=>{
        await axios.delete('http://127.0.0.1:8000/api/shops/'+id).then(({data})=>{
            console.log(data.message)
            fetchShops();
        }).catch(({response: {data} })=>{
                console.log(data.message) 
          
        }
        )
    }

    const SendEmails = async(id)=>{
      await axios.delete('http://127.0.0.1:8000/api/send-emails/')
    }

    const checkAuth = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/check-auth");
        console.log(response.data.authenticated);
        setAuthenticated(response.data.authenticated);
      } catch (error) {
        console.log(error);
      }
    };

  


      useEffect(()=>{
       
        fetchShops();
        checkAuth();
       
    } ,[])


    return (
        <div className="container">
           <div className="row">
              <div className="col-lg-12">
                <Link className="btn btn-primary button" to={"/shops/create"}>Create Shop</Link>
                <button className="btn btn-success button" onClick={() => SendEmails()}>Send Emails</button>
                <div className="card">
                  <div className="card-header">
                    <h3>Shops</h3>
                  </div>
                  <div className="card-body">
                  <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Desciption</th>
                            <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                  {shops.length > 0 &&
                    shops.map((shop, key) => (
                      <tr key={key}>
                        <td>{shop.name}</td>
                        <td>{shop.email}</td>
                        <td>{shop.descirption}</td>
                        <td>
                          
                              <button
                                className="btn btn-danger"
                                onClick={() => deleteShop(shop.id)}
                              >
                                <i className="fas fa-trash"></i>Delete
                              </button>
                              <Link
                                className="btn btn-primary"
                                to={`/shops/${shop.id}/edit`}
                              >
                                Edit Shop
                              </Link>
                           
                          
                        </td>
                      </tr>
                    ))}
                </tbody>
                        </table>
                  </div>
                </div>
              </div>
           </div>
        </div>
    )
}