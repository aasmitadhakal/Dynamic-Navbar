import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import img from '../asstes/logo.png'
function Navbar() {
    const [menu, setMenu] = useState([]);
    const fetchMenuData = async () => {
        try {
          const response = await axios.get("https://sungavacms.paradiseit.com.np/api/menus/1");
          setMenu(response.data.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      useEffect(() => {
        fetchMenuData();
        
      }, []);
  return (
    <header
    className={` bg-white font-[karla] shadow-xl w-full `}
    style={{ zIndex: 1000, transition: "all 0.5s" }}
  >
    <div className="flex justify-between items-center  px-4 md:px-0 p-1  container mx-auto">
      <Link to="/">
        <img src={img} className="h-20" alt="Logo" />
      </Link>
    <div>
        <div className="md:flex hidden items-center gap-11">
          <div className="flex md:flex-row flex-col md:items-center gap-x-11">
            {/* Render menu items */}
            {menu.map((menuItem) => (
              <div
                key={menuItem.id}
                style={{ display: "inline-block", position: "relative" }}
              
              >
                <Link to={menuItem.slug} className="flex mb-2">
                <span> {menuItem.title}</span> 
                
                </Link>
               
                 
                
              </div>
            ))}
          </div>
          <div className="md:flex hidden items-center gap-8 pr-4">
          <Link to="/contact ">
            <button className="bg-[#012EA6] text-white px-5 py-2 rounded-full hover:bg-red-700">
              Contact Us
            </button>
          </Link>
        </div>
          </div>
    </div>
    </div>
    </header>
  )
}

export default Navbar