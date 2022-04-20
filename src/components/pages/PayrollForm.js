import React, { useState , useEffect, useCallback} from "react"
import axios from "axios";
import { Link } from "react-router-dom";
import deleteIcon from "../../Assets/icons/delete-black-18dp.svg";
import editIcon from "../../Assets/icons/create-black-18dp.svg";
import logo from "../../Assets/images/adressbookimage.png"

const PayrollForm = () => {

  //let employeeList = JSON.parse(localStorage.getItem('EmployeeList'));
   // console.log(employeeList);

    const [users, setUser] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:3001/users");
        setUser(result.data);
    }
    const viewUserData= async (id) => {
      await axios.viewUser(`http://localhost:3001/users/${id}`);
      loadUsers();
  }
    const deleteUserData= async (id) => {
      await axios.delete(`http://localhost:3001/users/${id}`);
      loadUsers();
  }

    return (
        <div className="container" >
            <div className="py-4">
              <div className="header-content header">
              <img src={logo} alt="" />
              <h3>
              <span className="emp-text">ADDRESS</span> <br />
                    <span className="emp-text emp-payroll">BOOK</span>
              </h3>
              
              </div><br /><br />
              <div>
                <Link className="btn" to="/users/add">+Add Contact</Link>
             
              <div className="length">
                Person Details<div class="bbb">{users.length}</div>
                </div>
              </div>
             <table class="table border shadow">
          <thead class="thead-dark">
    <tr>
      <th scope="col">ID</th>
      <th scope="col">FULLNAME</th>
      <th scope="col">ADDRESS</th>
      <th scope="col">CITY</th>
      <th scope="col">STATE</th>
      <th scope="col">ZIP CODE</th>
      <th scope="col">PHONE NUMBER</th>
      <th scope="col">ACTIONS</th>
        
      
    </tr>
  </thead>
  <tbody>
            {users.map((user, index) => (
              <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.address}</td>
                <td>{user.city}</td>
                <td>{user.state}</td>
                <td>{user.zipcode}</td>
                <td>{user.phonenumber}</td>
                <td>
                 <img src={deleteIcon} alt="delete" onClick={() => deleteUserData(user.id)}/>
                  <Link to={`/users/edit/${user.id}`}>
                  <img  src={editIcon} alt="edit"  />
                  </Link>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default PayrollForm;