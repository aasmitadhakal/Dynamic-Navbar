import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import img from '../asstes/logo.png';
import './nav.css'
// import { logDOM } from '@testing-library/react';
import { MdMenu, MdClose } from "react-icons/md";
import { AnimatePresence,motion } from 'framer-motion';
import { IoIosArrowDown } from "react-icons/io";
function Navbar() {
  const [menu, setMenu] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchMenuData = async () => {
    try {
      const response = await axios.get("https://sungavacms.paradiseit.com.np/api/menus/1");
      setMenu(response.data.data);
      console.log("data", response?.data?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchMenuData();

  }, []);

  const [hoveredItem, setHoveredItem] = useState("");
  const [hoveredItem2, setHoveredItem2] = useState("");

  const handleHover = (title) => {
    setHoveredItem(title);

  };

  const handleHoverOut = (title) => {
    setHoveredItem("");

  };
  const handleHover2 = (title) => {
    setHoveredItem2(title);

  };

  const handleHoverOut2 = (title) => {
    setHoveredItem2("");

  };

  return (
    <header
      className={` bg-white font-[karla] shadow-xl w-full ${
        isScrolled ? "sicky-nav " : ""
      }`}
    >
      <div className="flex justify-between items-center  px-4 md:px-0 p-1  container mx-auto">
        <Link to="/">
          <img src={img} className="h-20" alt="Logo" />
        </Link>
       
          <div className="md:flex hidden items-center gap-11">
            <div className="flex md:flex-row flex-col md:items-center gap-x-11">
              {/* Render menu items */}
              {menu.map((menuItem, index) => (
                <div
                  key={menuItem.id}

                  onMouseEnter={() => handleHover(menuItem.title)}
                  onMouseLeave={() => handleHoverOut(menuItem.title)}
                  style={{ display: "inline-block", position: "relative" }}

                >
                  <Link to={menuItem.slug} className="flex relative mb-2 z-10 ">
                    <span> {menuItem.title}</span>
                    {menuItem.children && (
                    <span
                      className="text-gray-500  flex items-center"
                     
                    >
                      {hoveredItem === menuItem.id ? (
                        <MdOutlineKeyboardArrowUp />
                      ) : (
                        <IoIosArrowDown />
                      )}
                    </span>
                  )}
                  </Link>
                  {((hoveredItem === menuItem?.title) && menuItem?.children)
                    &&
                    <div className=' absolute -top-6 left-1/2 transform -translate-x-1/2  -z-1  '>
                      <div className='h-[59px] bg-transparent  '> </div>
                      <div className='bg-white border-t-2 border-blue-600 flex gap-4'>
                        {/* left-1/2 transform -translate-x-1/2  */}
                        {
                          menuItem?.children?.map((mainChild, index) => {
                            return (
                              <div className='w-44   '>

                                <ul>
                                  {
                                    mainChild?.map((child, index) => {
                                      return (
                                        <li key={child?.id}
                                          onMouseEnter={() => handleHover2(child?.title)}
                                          onMouseLeave={() => handleHoverOut2(child?.title)}
                                          className=' px-3 cursor-pointer relative hover:bg-gray-200 py-2 '>
                                          <Link to={child?.slug} className="">
                                            <span> {child?.title }</span>

                                            {(hoveredItem2 === child?.title) &&
                                              <div className='absolute  left-44 w-44 top-[-5px] bg-white '>
                                                <ul> 

                                                  {  (child  &&  child?.children && child?.children[0]) &&
                                                    child?.children[0]?.map((subChild, index) => {
                                                      return (
                                                        <li className='py-2 px-2 hover:bg-gray-200'>
                                                          <Link to={subChild?.slug} className="">
                                                            <span> {subChild?.title}</span>
                                                          </Link>
                                                        </li>
                                                      )
                                                    })
                                                  }
                                                </ul>
                                              </div>
                                            }

                                          </Link>

                                        </li>
                                      )
                                    })
                                  }

                                </ul>
                              </div>
                            )

                          })
                        }


                      </div>
                    </div>
                  }

                </div>
              ))}
            </div>
            </div>
            <div className="md:hidden">
          {showMenu ? (
            <MdClose onClick={toggleMenu} className="text-3xl cursor-pointer"></MdClose>
          ) : (
            <MdMenu onClick={toggleMenu} className="text-3xl cursor-pointer"></MdMenu>
          )}
        </div>
        <AnimatePresence>
        {showMenu && (
        <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden absolute top-16 left-0 w-full mt-4 bg-white py-4 px-2"
              style={{ zIndex: 1000}}
            >
              <div className="flex flex-col items-center gap-4">
        {menu.map((menuItem, index) => (
                <div
                  key={menuItem.id}

                  onMouseEnter={() => handleHover(menuItem.title)}
                  onMouseLeave={() => handleHoverOut(menuItem.title)}
                  style={{ display: "inline-block", position: "relative" }}

                >
                  <Link to={menuItem.slug} className="flex relative mb-2 z-10 ">
                    <span> {menuItem.title}</span>

                  </Link>
                  {((hoveredItem === menuItem?.title) && menuItem?.children)
                    &&
                    <div className=' absolute top-10 left-1/2 transform -translate-x-1/2  -z-1  '>
                      <div className='h-[59px] bg-transparent  '> </div>
                      <div className='bg-white flex gap-4'>
                        {/* left-1/2 transform -translate-x-1/2  */}
                        {
                          menuItem?.children?.map((mainChild, index) => {
                            return (
                              <div className='w-44   '>

                                <ul>
                                  {
                                    mainChild?.map((child, index) => {
                                      return (
                                        <li key={child?.id}
                                          onMouseEnter={() => handleHover2(child?.title)}
                                          onMouseLeave={() => handleHoverOut2(child?.title)}
                                          className=' px-3 cursor-pointer relative hover:bg-gray-200 py-2 '>
                                          <Link to={child?.slug} className="">
                                            <span> {child?.title }</span>

                                            {(hoveredItem2 === child?.title) &&
                                              <div className='absolute  left-44 w-44 top-[-5px] bg-white '>
                                                <ul> 

                                                  {  (child  &&  child?.children && child?.children[0]) &&
                                                    child?.children[0]?.map((subChild, index) => {
                                                      return (
                                                        <li className='py-2 px-2 hover:bg-gray-200'>
                                                          <Link to={subChild?.slug} className="">
                                                            <span> {subChild?.title}</span>
                                                          </Link>
                                                        </li>
                                                      )
                                                    })
                                                  }
                                                </ul>
                                              </div>
                                            }

                                          </Link>

                                        </li>
                                      )
                                    })
                                  }

                                </ul>
                              </div>
                            )

                          })
                        }


                      </div>
                    </div>
                  }

                </div>
              ))}
              </div>
              </motion.div>
        )}
        </AnimatePresence>
            <div className="md:flex hidden items-center gap-8 pr-4">
              <Link to="/contact ">
                <button className="bg-[#012EA6] text-white px-5 py-2 rounded-full hover:bg-red-700">
                  Contact Us
                </button>
              </Link>
            </div>
         
        </div>
      
    </header>
  )
}

export default Navbar
