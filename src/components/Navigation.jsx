import React from 'react';
import { NavLink , useNavigate} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
    { name: 'Home', href: '/', current: false },
    { name: 'Login', href: '/login', current: false },
    { name: 'Register', href: '/register', current: false },
    { name: 'Start Exam', href: '/questions', current: false },
    { name: 'Dashboard', href: '/dashboard', current: true },
    { name: 'Exam Result', href: '/results', current: false },
    { name: 'Add Questions', href: '/add-question', current: false },
    { name: 'Manage Users', href: '/admin/users', current: false },
    { name: 'Reported Questions', href: '/admin/reported-questions', current: false },
    { name: 'Logout', href: '/', current: false },
  ];
  
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

const Navigation = () => {
    const { isLoggedIn, isAdmin , logout, user } = useAuth();
    const [userAvailable, setuserAvailable] = useState(false)
    const [admin, setAdmin] = useState(false)
    const navigate = useNavigate();




    useEffect(() => {
      const logInInfo = () => {

        if (isLoggedIn()) {
            setuserAvailable(true);
            // console.log(user)
            
            // console.log("userAvailable found")
            if (isAdmin()) {
                // console.log("is admin")
                setAdmin(true)
            }
        }
      }
      logInInfo()
    }, [isLoggedIn, isAdmin])
    const handleLogout = () => {
        console.log("Logging out")
        logout(); // Call the logout function provided by useAuth to clear token
        setuserAvailable(false);
        setAdmin(false);
        navigate('/'); // Redirect to Home ("/")
        toast.success('Logout successful!');
    };
    
 
    return (
        <>

            
<Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              {/* <span className="absolute -inset-0.5" /> */}
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto" 
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => {
                    if (userAvailable && item.name === 'Logout') {
                        return (<>
                        <button key={item.name}  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" onClick={handleLogout} >Logout</button></>)
                    }
                    if (!userAvailable && item.name == 'Logout') {
                      return null;
                    }
                    
                    if (!userAvailable && !admin && (item.name === 'Start Exam' || item.name === 'Dashboard' || item.name === 'Exam Result' || item.name === 'Add Questions' || item.name === 'Manage Users' || item.name === 'Reported Questions')) {
                        return null;
                    }
                    if (userAvailable && (item.name == 'Home' || item.name === 'Login' || item.name === 'Register')){
                        return null;
                    }
                    if (userAvailable && !admin && (item.name === 'Add Questions' || item.name === 'Manage Users' || item.name === 'Reported Questions')) {
                      return null;

                    }
                    return(
                  <NavLink
                    key={item.name}
                    to={item.href}
                    
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium active:text-blue-600',
                    )}
                  >
                    {item.name}
                  </NavLink>
                )})}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              {/* <span className="absolute -inset-1.5" /> */}
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="h-6 w-6" />
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  {/* <span className="absolute -inset-1.5" /> */}
                  <span className="sr-only m-1">Open Users menu</span>
                  {
                    userAvailable ? <img
                    alt=""
                    src={`https://ui-avatars.com/api/?name=${user.name}&background=random&rounded=true&size=250`}
                    className="h-8 w-8 rounded-full"
                  />  : <img
                  alt=""
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="h-8 w-8 rounded-full"
                />
                  }
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                 {user && <>
                <MenuItem>
                 <NavLink to="/profile" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                    {(user.name) ? user.name : ""}
                  </NavLink>
                </MenuItem>
                    
                <MenuItem>
                  <NavLink to="/profile" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                    {(user.email) ? user.email : ""}
                  </NavLink>
                </MenuItem> </>
                 } 
                <MenuItem>
                  <NavLink to="/" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                    Settings                    (Comming soon...)
                  </NavLink>
                </MenuItem>
                {user && 
                <MenuItem>
                  <button onClick={()=> handleLogout()}  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                    Logout
                  </button>
                </MenuItem>
                }
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => {
            if (!userAvailable && item.name === 'Logout') {
                // console.log(item);
                return null;
            }
            if (userAvailable && item.name ==='Logout') {
              return (<>
                <button href="/register" key={item.name} className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" onClick={handleLogout} >Logout</button></>)
            }
            if (!userAvailable && (item.name === 'Start Exam' || item.name === 'Dashboard' || item.name === 'Exam Result' || item.name === 'Add Questions' || item.name === 'Manage Users' || item.name === 'Reported Questions')) {
                return null;
            }
            if (userAvailable && (item.name == 'Home' || item.name === 'Login' || item.name === 'Register')){
                return null;
            }
            if (!isAdmin  && (item.name ==='Add Questions' || item.name === 'Manage Users' || item.name === 'Reported Questions'))
                return null;

            if (userAvailable && !admin && (item.name === 'Add Questions' || item.name === 'Manage Users' || item.name === 'Reported Questions')) {
              return null;

            }
            return (
            <NavLink
              key={item.name}
              as="NavLink"
              to={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            > 
              {item.name}
            </NavLink>
          )})}
        </div>
      </DisclosurePanel>
    </Disclosure>
    


    </>
    );
};

export default Navigation;
