import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

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
         
          </div>
    </div>
  )
}

export default Navbar