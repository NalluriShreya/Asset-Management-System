import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import algoleapLogo from '../assets/algoleap.png';
import userImage from '../assets/user-image.png';
import { Link } from 'react-router-dom';
import home from '../assets/home.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import '../styles/user-style.css';

const AssetPage = () => {
  const { username, employee_id } = useParams();
  const [employee, setEmployee] = useState({});
  const [assets, setAssets] = useState([]);
  const [allotDate, setAllotDate] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/algoleap/${username}/${employee_id}`);
        const { employee, assetResult, allot_date } = response.data;

        setEmployee(employee);
        setAssets(assetResult);
        setAllotDate(allot_date);
      } catch (error) {
        console.error('Fetch asset data error:', error);
      }
    };

    fetchData();
  }, [username, employee_id]);

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
        {/* <img src={home} alt='home' onClick={handleHomeClick}/> */}
        {/* <img src={home} alt='home'/> */}
        <Link to={`/`}><img src={home} alt='home'/></Link>
      </div>

      <div className="asset-allocation-title">Asset Allocation</div>

      <table className="asset-table">
        <tbody>
          <tr className="asset1-tr">
            <th className="asset1-th">Employee Name</th>
            <td className="asset1-td">{employee.employee_name}</td>
          </tr>

          <tr className="asset1-tr">
            <th className="asset1-th">Employee ID</th>
            <td className="bg asset1-td">{employee.employee_id}</td>
          </tr>

          <tr className="asset1-tr">
            <th className="asset1-th">Contact Number</th>
            <td className="bg asset1-td">{employee.contact_number}</td>
          </tr>

          <tr className="asset1-tr">
            <th className="asset1-th"><span style={{ color: 'red' }}>*</span>&nbsp;&nbsp;Department</th>
            <td className="bg asset1-td">{employee.department}</td>
          </tr>
        </tbody>
      </table>

      <div className="assets">
        <table className="asset-table-2">
          <thead>
            <tr className="asset-headings">
              <th className="a-e-id asset2-th"></th>
              <th className="a-e-name asset2-th">Asset Name</th>
              <th className="a-ph-no asset2-th">Asset Brand</th>
              <th className="a-e-type asset2-th">Asset ID</th>
              <th className="a-rep-manager asset2-th">Asset Allocated Date</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset, index) => (
              <tr key={index} className="asset-emp-info">
                <td className="asset2-td">{index+1}</td>
                <td className="asset2-td">
                  <div>{asset.asset_name}</div>
                </td>
                <td className="asset2-td">
                  <div>{asset.asset_brand}</div>
                </td>
                <td className="asset2-td">
                  <div>{asset.asset_id}</div>
                </td>
                <td className="asset2-td">
                  <div>{allotDate[index]}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='cancel-btn'>
            <Link to={`/algoleap/${username}`}>Cancel</Link>
            {/* <a>Cancel</a> */}
      </div>

      <div className="footer">
        <div className="footer-left">
          <FontAwesomeIcon icon={faCopyright} />&nbsp;
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

export default AssetPage;
