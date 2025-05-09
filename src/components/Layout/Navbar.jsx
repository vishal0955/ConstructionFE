//upATE CODE WITH DYNAMIC NAME AND EMAIL BASED ON ROLE 

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css";
// import { useSelector } from "react-redux";
// const Navbar = ({ toggleSidebar }) => {


//   const [showPassword, setShowPassword] = useState(false); 

//   //when logi api is called, the user data is stored in local storage
//   // const [roledata, setRoleData] = useState(() => {
//   //   const storedRole = localStorage.getItem("userRole");
//   //   return storedRole ? JSON.parse(storedRole) : null;
//   // });
  
  
//   // useEffect(() => {
//   //   const stored = localStorage.getItem("user");
//   //   if (stored) {
//   //     const parsed = JSON.parse(stored);
//   //     console.log("Role", parsed.email);
//   //     setRoleData(parsed);
//   //   } else {
//   //     setRoleData(null);
//   //   }
//   // }, []);

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };
  

//   // console.log(roledata)
//   // console.log("email",roledata.email)
  

//   return (
//     <>
//       <nav className="navbar pe-5 d-flex justify-content-end">
//         <div className="navbar-left">
//           <div className="navbar-logo">
//             <span className="logo-text">Contruction</span>
//           </div>
//           <button onClick={toggleSidebar} className="toggle-button d-block d-md-none">
//             <i className="fas fa-bars"></i>
//           </button>
//         </div>

//         <div className="navbar-right">
//           <div className="dropdown profile-dropdown d-none d-md-block">
//             <div className="profile-trigger" data-bs-toggle="dropdown" aria-expanded="false">
//               <div className="profile-info">
//                    <span className="profile-name">Admin</span>
//                 {/* <span className="profile-role">{roledata?.email}</span> */}
//                 {/* <span className="profile-name">{roledata?.firstName}</span>
//                 <span className="profile-role">{roledata?.email}</span> */}
//                 <span className="profile-role">Admin</span>
//               </div>
//               <div className="profile-avatar">
//                 <img src="https://i.ibb.co/6Jc9g6jF/user-11.jpg" alt="profile" />
//               </div>
//             </div>

//             <ul className="dropdown-menu dropdown-menu-end profile-menu">
//               <li>
//                 <Link  className="dropdown-item">
//                   <i className="fas fa-user"></i>
//                   <span>My Profile</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link  className="dropdown-item">
//                   <i className="fas fa-edit"></i>
//                   <span>Update Profile</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link  className="dropdown-item">
//                   <i className="fas fa-lock"></i>
//                   <span>Change Password</span>
//                 </Link>
//               </li>
//               <li><hr className="dropdown-divider"/></li>
//               <li onClick={()=>localStorage.clear()}>
//                 <Link to="/" className="dropdown-item text-danger" >
//                   <i className="fas fa-sign-out-alt"></i>
//                   <span>Logout</span>
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;  



import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useTheme } from "../../context/ThemeContext";
// import { useTheme } from "../../context/ThemeContext";

const Navbar = ({ toggleSidebar }) => {


  const { theme, toggleTheme } = useTheme();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [roledata, setRoleData]= useState("")
    // console.log(roledata)
  useEffect(()=>{
    const Role= localStorage.getItem("userRole")
     if(Role){
     setRoleData(Role)
     }else{
      setRoleData()
     }
  },[])
   const handleropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <>
      <nav className="navbar pe-5 d-flex justify-content-end">
        <div className="navbar-left">
          <div className="navbar-logo">
            {/* <span className="logo-text">Contruction</span> */}
            <img src="hhttps://i.ibb.co/NnWcJ8D7/image.png" alt="logo" />
          </div>
          <button onClick={toggleSidebar} className="toggle-button d-block d-md-none">
            <i className="fas fa-bars"></i>
          </button>
        </div>

 
           
   
        <div className="navbar-right ">
        

          <div className="dropdown profile-dropdown d-none d-md-block d-flex justify-content-between align-items-center">
         
       <div className="d-flex align-items-center">
          
       <button onClick={toggleTheme} className="mr-2">
          <i className={`fas fa-${theme === "light" ? "sun" : "moon"}`}></i>
        
          </button> 
            <div className="profile-trigger" data-bs-toggle="dropdown" aria-expanded="false" onClick={handleropdown}>
              <div className="profile-info">
                <span className="profile-name">admin</span>
                <span className="profile-role">admin@gmail.com</span>
              </div>
              <div className="profile-avatar">
                <img src="https://i.ibb.co/6Jc9g6jF/user-11.jpg" alt="profile" />
              </div>
            </div>

            </div>

          {dropdownOpen &&  <ul className="dropdown-menu dropdown-menu-end profile-menu show">
              <li>
                <Link  className="dropdown-item">
                  <i className="fas fa-user"></i>
                  <span>My Profile</span>
                </Link>
              </li>
              <li>
                <Link  className="dropdown-item">
                  <i className="fas fa-edit"></i>
                  <span>Update Profile</span>
                </Link>
              </li>
              <li>
                <Link  className="dropdown-item">
                  <i className="fas fa-lock"></i>
                  <span>Change Password</span>
                </Link>
              </li>
              <li><hr className="dropdown-divider"/></li>
              <li>
                <Link to="/" className="dropdown-item text-danger">
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Logout</span>
                </Link>
              </li>
            </ul>}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;  