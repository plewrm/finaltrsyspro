import React, { useState } from 'react';

import { NavLink } from "react-router-dom";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,FaAngleRight,
  FaAngleLeft
}from 'react-icons/fa';


const Sidebar = ({ children,onClick}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen)
    onClick()};
  const menuItem = [
    {
      path: "/",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/candidatelist",
      name: "CandidateList",
      icon: <FaUserAlt />,
    },
    {
      path: "/joblist",
      name: "JobList",
      icon: <FaRegChartBar />,
    },
    {
      path: "/clientlist",
      name: "ClientList",
      icon: <FaCommentAlt />,
    },
    // {
    //   path: "/",
    //   name:"Dashboard",
    //   icon:<FaTh/>
    // },
    // {
    //   path: "/",
    //   name:"Dashboard",
    //   icon:<FaTh/>
    // },
  ];
  return (
    <>
      {/* <!-- ======= Sidebar ======= --> */}
      <div className="container"
      //  style={{zIndex:-99999, position:"relative"}}
       >
           <div style={{width: isOpen ? "300px" : "100px"}} className="sidebar">
               <div className="top_section">
                   {/* <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1> */}
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                    { isOpen ?
                      <FaAngleLeft onClick={toggle} />
                      :
                      <FaAngleRight  onClick={toggle}/>
                    }
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           
           <main>{children}</main>
        </div>
      {/* <!-- End Sidebar--> */}
    </>
  );
};

export default Sidebar;





// import React from "react";
// import { NavLink } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <>
//       {/* <!-- ======= Sidebar ======= --> */}
//       <aside id="sidebar" class="sidebar">
//         <ul class="sidebar-nav" id="sidebar-nav">
//           <li class="nav-item">
//             <a class="nav-link " href="index.html">
//               <i class="bi bi-grid"></i>
//               <span>Dashboard</span>
//             </a>
//           </li>
//           <li class="nav-item">
//             <NavLink className="nav-link" to="/candidatelist">
//               <i class="bi bi-person-plus"></i>
//               <span>Candidates</span>
//             </NavLink>
//           </li>
//           <li class="nav-item">
//             <NavLink className="nav-link" to="/joblist">
//               <i class="bi bi-person-plus"></i>
//               <span>Jobs</span>
//             </NavLink>
//           </li>
//           <li class="nav-item">
//             <NavLink className="nav-link" to="/clientlist">
//               <i class="bi bi-person-plus"></i>
//               <span>Clients</span>
//             </NavLink>
//           </li>
//           {/* <!-- End Dashboard Nav --> */}

//           {/* <!-- End Blank Page Nav --> */}
//         </ul>
//       </aside>
//       {/* <!-- End Sidebar--> */}
//     </>
//   );
// };

// export default Sidebar;
