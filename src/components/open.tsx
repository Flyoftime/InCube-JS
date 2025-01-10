    // import React, { useState, useEffect } from 'react';
    // import Image from 'next/image';
    // import {
    //     User,
    //     Gauge,
    //     ChevronUp,
    //     ChevronDown,
    //     Building,
    //     BriefcaseBusiness,
    //     ClipboardList,
    //     MessagesSquare,
    //     Activity,
    // } from 'lucide-react';
    // import Link from 'next/link';
    // import { useRouter } from 'next/router';

    // const Sidebar = ({ isOpen }) => {
    //     const [expandedMenus, setExpandedMenus] = useState({});
    //     const router = useRouter();

    //     const toggleSubmenu = (menu) => {
    //         const updatedExpandedMenus = {
    //             ...expandedMenus,
    //             [menu]: !expandedMenus[menu],
    //         };
    //         setExpandedMenus(updatedExpandedMenus);
    //         localStorage.setItem('expandedMenus', JSON.stringify(updatedExpandedMenus));
    //     };

    //     useEffect(() => {
    //         const storedExpandedMenus = localStorage.getItem('expandedMenus');
    //         if (storedExpandedMenus) {
    //             setExpandedMenus(JSON.parse(storedExpandedMenus));
    //         }
    //     }, []);

    //     const handleMenuClick = (link) => {
    //         router.push(link);
    //     };

    //     const menuItems = [
    //         {
    //             name: 'Dashboard',
    //             icon: Gauge,
    //             link: '/admin/dashboard',
    //             exact: true,
    //         },
    //         {
    //             name: 'Crew',
    //             icon: User,
    //             submenus: [
    //                 { name: 'Active Crew', link: '/admin/dashboard/crew/active-crew' },
    //                 { name: 'Request Crew', link: '/admin/dashboard/crew/request-crew' },
    //                 { name: 'List Crew', link: '/admin/dashboard/crew/list-crew' },
    //                 {
    //                     name: 'Blacklist Crew',
    //                     link: '/admin/dashboard/crew/blacklist-crew',
    //                 },
    //             ],
    //         },
    //         {
    //             name: 'Employer',
    //             icon: Building,
    //             submenus: [
    //                 {
    //                     name: 'Active Employer',
    //                     link: '/admin/dashboard/employer/active-employer',
    //                 },
    //                 {
    //                     name: 'Request Employer',
    //                     link: '/admin/dashboard/employer/request-employer',
    //                 },
    //                 {
    //                     name: 'List Employer',
    //                     link: '/admin/dashboard/employer/list-employer',
    //                 },
    //                 {
    //                     name: 'Blacklist Employer',
    //                     link: '/admin/dashboard/employer/blacklist-employer',
    //                 },
    //             ],
    //         },
    //         {
    //             name: 'Job',
    //             icon: BriefcaseBusiness,
    //             submenus: [
    //                 {
    //                     name: 'Active Job',
    //                     link: '/admin/dashboard/job/active-job',
    //                 },
    //                 {
    //                     name: 'Request Job',
    //                     link: '/admin/dashboard/job/request-job',
    //                 },
    //                 {
    //                     name: 'List Job',
    //                     link: '/admin/dashboard/job/list-job',
    //                 },
    //                 {
    //                     name: 'Finish Job',
    //                     link: '/admin/dashboard/job/finish-job',
    //                 },
    //             ],
    //         },
    //         {
    //             name: 'Report',
    //             icon: ClipboardList,
    //             link: '/admin/report',
    //             exact: true,
    //         },
    //         {
    //             name: 'Message',
    //             icon: MessagesSquare,
    //             link: '/admin/message',
    //             exact: true,
    //         },
    //         {
    //             name: 'Account',
    //             icon: User,
    //             link: '/admin/account',
    //             exact: true,
    //         },
    //         {
    //             name: 'Log System',
    //             icon: Activity,
    //             link: '/admin/logsys',
    //             exact: true,
    //         },
    //     ];

    //     const isActiveSubmenu = (submenus) => {
    //         return submenus.some((submenu) => router.pathname === submenu.link);
    //     };

    //     const renderMenu = (item, index) => {
    //         const isActive = router.pathname === item.link;
    //         const isExpanded = expandedMenus[item.name];
    //         const isSubmenuActive = item.submenus && isActiveSubmenu(item.submenus);

    //         return (
    //             <li key={index}>
    //                 <Link href={item.link || '#'}>
    //                     <div
    //                         className={`flex items-center gap-1 pl-4 pr-2 font-medium py-2 rounded-[15px] text-customColor w-[200px] ${isActive || isSubmenuActive
    //                                 ? 'bg-customColor text-white'
    //                                 : 'hover:bg-customColor hover:text-white'
    //                             } group mb-[10px]`}
    //                         onClick={
    //                             item.submenus
    //                                 ? () => toggleSubmenu(item.name)
    //                                 : () => handleMenuClick(item.link)
    //                         }
    //                     >
    //                         {item.icon && <item.icon size={20} className="flex-shrink-0" />}
    //                         <span>{item.name}</span>
    //                         {item.submenus &&
    //                             (isExpanded ? (
    //                                 <ChevronUp
    //                                     className="ml-auto"
    //                                     onClick={(e) => {
    //                                         e.stopPropagation();
    //                                         toggleSubmenu(item.name);
    //                                     }}
    //                                 />
    //                             ) : (
    //                                 <ChevronDown
    //                                     className="ml-auto"
    //                                     onClick={(e) => {
    //                                         e.stopPropagation();
    //                                         toggleSubmenu(item.name);
    //                                     }}
    //                                 />
    //                             ))}
    //                     </div>
    //                 </Link>
    //                 {item.submenus && (
    //                     <ul className={`pl-4 ${isExpanded ? '' : 'hidden'}`}>
    //                         {item.submenus.map((submenu, subIndex) => (
    //                             <li key={subIndex}>
    //                                 <Link href={submenu.link}>
    //                                     <div
    //                                         className={`block py-2 px-4 text-customColor rounded-[15px] ${router.pathname === submenu.link
    //                                                 ? 'bg-[#3A97A9CC] text-white'
    //                                                 : 'hover:bg-customColor hover:text-white'
    //                                             } mb-[10px]`}
    //                                     >
    //                                         {submenu.name}
    //                                     </div>
    //                                 </Link>
    //                             </li>
    //                         ))}
    //                     </ul>
    //                 )}
    //             </li>
    //         );
    //     };

    //     return (
    //         <aside
    //             className={`w-[250px] max-w-xs h-screen fixed left-0 top-0 z-40 border-r overflow-x-hidden no-scrollbar bg-white shadow-md ${isOpen ? 'flex' : 'hidden'}`}
    //         >
    //             <div className="h-full px-3 py-4">
    //                 <div className="flex items-center justify-between mb-5">
    //                     <a className="flex flex-grow justify-center pt-[40px]">
    //                         <Image
    //                             src={`/assets/images/logo.png`}
    //                             alt=""
    //                             loading="lazy"
    //                             width={85}
    //                             height={85}
    //                         />
    //                     </a>
    //                 </div>
    //                 <ul className="space-y-2 pt-3 pb-3">{menuItems.map(renderMenu)}</ul>
    //             </div>
    //         </aside>
    //     );
    // };

    // export default Sidebar;

