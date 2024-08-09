import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import algoleapLogo from '../assets/algoleap.png';
import userImage from '../assets/user-image.png';
import home from '../assets/home.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import '../styles/user-style.css';

const UserPage = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState([]);
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data for user:', username);
        const res = await axios.get(`http://localhost:8080/algoleap/${username}`);
        console.log('API response:', res.data);
        setUserData(res.data.employees);
        setActiveCount(res.data.activeCount);
      } catch (err) {
        console.error('Fetch user data error:', err);
      }
    };
    fetchData();
  }, [username]);

  return (
    <div className="user-container">
      <div className="nav">
        <div className="algoleap-image">
          <img src={algoleapLogo} alt="Algoleap" />
        </div>
        <div className="asset-management-title">Asset Management</div>
        <div className="profile">
          <img src={userImage} alt="User" className="user-image" />
          <div className="name">{username}</div>
        </div>
      </div>
      <div className="home">
        <Link to={`/`}><img src={home} alt='home'/></Link>
      </div>
      <div className="inactive">
        {/* <a>Show Inactive Employees</a> */}
        <Link to={`/algoleap/inactive/${username}`}><a>Show Inactive Employees</a></Link>
      </div>
      <div className="main-content-container">
        <div className="main-content">
          <table className="table">
            <thead>
              <tr className="headings">
                <th className="e-id">Employee ID</th>
                <th className="e-name">Employee Name</th>
                <th className="ph-no">Contact Number</th>
                <th className="e-type">Employee Type</th>
                <th className="rep-manager">Reporting Manager</th>
                <th className="status">Status</th>
                <th className="asset-space"></th>
                <th id="count">Count:&nbsp;{activeCount}</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((employee, index) => (
                <tr className="emp-info" key={index}>
                  <td>{employee.employee_id}</td>
                  <td>{employee.employee_name}</td>
                  <td>{employee.contact_number}</td>
                  <td>{employee.employee_type}</td>
                  <td>{employee.reporting_manager}</td>
                  <td>{employee.status}</td>
                  <td><Link to={`/algoleap/${username}/${employee.employee_id}`}>View&nbsp;Assets</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="footer">
        <div className="footer-left">
          <FontAwesomeIcon icon={faCopyright} className='copyright' />&nbsp;
          <span>Algoleap 2022. All Rights Reserved.</span>
        </div>
        <div className="footer-right">
          <button className="privacy">Privacy Policy</button>
          <button className="cookie">Cookie Policy</button>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
