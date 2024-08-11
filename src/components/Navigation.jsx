import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from "../assets/logo2.png";

const navigation = [
    // { name: 'Home', href: '/' },
    { name: 'Login', href: '/login' },
    { name: 'Register', href: '/register' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Practice Exam', href: '/questions' },
    { name: 'Practice Result', href: '/results' },
    { name: 'Exam', href: '/exam' },
    { name: 'Result', href: '/exam-results' },
    { name: 'Mock Results', href: '/admin/manage-results/mock' },
    { name: 'Add Questions', href: '/add-question' },
    { name: 'Manage Users', href: '/admin/users' },
    { name: 'Manage Questions', href: '/admin/manage-questions' },
    { name: 'Manage Exams', href: '/admin/manage-exams' },
    { name: 'Manage Results', href: '/admin/manage-results' },
    { name: 'Reported Questions', href: '/admin/reported-questions' },
    { name: 'Create Exam', href: '/admin/create-exam' },
    { name: 'Logout', href: '/' },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const Navigation = () => {
    const { isLoggedIn, isAdmin, logout, user } = useAuth();
    const [userAvailable, setUserAvailable] = useState(false);
    const [admin, setAdmin] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        const logInInfo = () => {
            if (isLoggedIn()) {
                setUserAvailable(true);
                if (isAdmin()) {
                    setAdmin(true);
                }
                
            }
        }
        logInInfo();
    }, [isLoggedIn, isAdmin]);

    const handleLogout = () => {
        logout();
        setUserAvailable(false);
        setAdmin(false);
        navigate('/');
        toast.success('Logout successful!');
    };

    return (
        <>
            <Disclosure as="nav" className="bg-gray-700 dark:bg-gray-800">
                <div className="mx-auto  px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                                <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                            </DisclosureButton>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start ">
                            <div className="flex flex-shrink-0 items-center">
                                <img
                                    alt="XaMawo"
                                    src={logo}
                                    className="h-16 w-16 m-4 my-2 rounded-3xl"
                                />
                                <h2 className='m-4 text-2xl tracking-wider'><NavLink to='/'>XaMawo</NavLink></h2>
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {navigation.map((item) => {
                                        // Conditionally render navigation items based on user role
                                        if (!userAvailable && (item.name === 'Dashboard' || item.name === 'Exam Result' || item.name === 'Add Questions' || item.name === 'Manage Users' || item.name === 'Reported Questions' || item.name === 'Logout'|| item.name === 'Start Exam'|| item.name === 'Practice Exam' || item.name === 'Practice Result' || item.name === 'Exam' || item.name === 'Result' || item.name === 'Create Exam' || item.name === 'Manage Exams' || item.name === 'Manage Results' || item.name =='Mock Results' || item.name =='Manage Questions')) {
                                            return null;
                                        }
                                        if (userAvailable && (item.name === 'Home' || item.name === 'Login' || item.name === 'Register'|| item.name === 'Logout')) {
                                            return null;
                                        }
                                        if (userAvailable && !admin && (item.name === 'Add Questions' || item.name === 'Manage Users' || item.name === 'Reported Questions' || item.name === 'Create Exam'  || item.name === 'Manage Exams' || item.name === 'Manage Results'|| item.name === 'Mock Results' || item.name =='Manage Questions')) {
                                            return null;
                                        }
                                        return (
                                            <NavLink
                                                key={item.name}
                                                to={item.href}
                                                className={classNames(
                                                    'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-5 py-3 m-2 text-sm font-medium ',
                                                    location.pathname === item.href && 'bg-gray-900 text-white'
                                                )}
                                            >
                                               {item.name}
                                            </NavLink>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <Menu as="div" className="relative ml-3">
                               <div>
                                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="sr-only m-1">Open Users menu</span>
                                        {userAvailable ? ( user.avatar ? <img
                                                alt=""
                                                src={`${user.avatar}`}
                                                className="h-8 w-8 rounded-full"
                                            /> : 
                                            <img
                                                alt=""
                                                src={`https://ui-avatars.com/api/?name=${user.name}&background=random&rounded=true&size=250`}
                                                className="h-8 w-8 rounded-full"
                                            />
                                        ) : (
                                            <img
                                                alt=""
                                                src="/login-img.jpeg"
                                                className="h-8 w-8 rounded-full"
                                            />
                                        )}
                                    </MenuButton>
                                </div>
                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    {user && (
                                        <>
                                            <MenuItem>
                                                <NavLink to="/profile" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                                    {user.name ? user.name : ""}
                                                </NavLink>
                                            </MenuItem>
                                            <MenuItem> 
                                                <NavLink to="/profile" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                                    {user.email ? user.email : ""}
                                                </NavLink>
                                            </MenuItem>
                                        </>
                                    )}
                                    <MenuItem>
                                        <NavLink to="/subscription" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                            Subscribe Us
                                        </NavLink>
                                    </MenuItem>
                                    <MenuItem>
                                        <NavLink to="/" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                            Settings (Coming soon...)
                                        </NavLink>
                                    </MenuItem>
                                    {user && (
                                        <MenuItem>
                                            <button onClick={() => handleLogout()} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 w-full">
                                                Logout
                                            </button>
                                        </MenuItem>
                                    )}
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>
                </div>
                <DisclosurePanel className="sm:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        {navigation.map((item) => {
                            // Conditionally render navigation items based on user role
                            if (!userAvailable && item.name === 'Logout') {
                                return null;
                            }
                            if (userAvailable && item.name === 'Logout') {
                                return (<button key={item.name} className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" onClick={handleLogout}>Logout</button>);
                            }
                            if (!userAvailable && (item.name === 'Start Exam' || item.name === 'Dashboard' || item.name === 'Exam Result' || item.name === 'Add Questions' || item.name === 'Manage Users' || item.name === 'Reported Questions' || item.name === 'Practical Exam' || item.name === 'Practice Exam' || item.name === 'Practice Result' || item.name === 'Exam' || item.name === 'Result' || item.name === 'Create Exam'  || item.name === 'Manage Exams' || item.name === 'Manage Results'|| item.name =='Manage Questions' )) {
                                return null;
                            }
                            if (userAvailable && (item.name === 'Home' || item.name === 'Login' || item.name === 'Register')) {
                                return null;
                            }
                            if (!isAdmin && (item.name === 'Add Questions' || item.name === 'Manage Users' || item.name === 'Reported Questions' )) {
                                return null;
                            }
                            if (userAvailable && !admin && (item.name === 'Add Questions' || item.name === 'Manage Users' || item.name === 'Reported Questions' || item.name === 'Create Exam'   || item.name === 'Manage Exams' || item.name === 'Manage Results' || item.name === 'Mock Results' || item.name =='Mock Questions' || item.name =='Manage Questions')) {
                                return null;
                            }
                            return (
                                <NavLink
                                    key={item.name}
                                    to={item.href}
                                    activeClassName="bg-gray-900 text-white"
                                    className={classNames(
                                        'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md block px-3 py-2 text-base font-medium',
                                        location.pathname === item.href && 'bg-gray-900 text-white'
                                    )}
                                >
                                    {item.name}
                                </NavLink>
                            );
                        })}
                    </div>
                </DisclosurePanel>
            </Disclosure>
        </>
    );
};

export default Navigation;
