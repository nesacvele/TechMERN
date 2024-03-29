import { useState } from 'react';
import { adminSidebarConfig } from '../../config/adminSidebarConfig';
import './Sidebar.scss';

function Sidebar() {
    const [activeItem, setActiveItem] = useState(adminSidebarConfig[0].name);

    const changeView = (name) => {
        setActiveItem(name);
        // todo Naviguj nas/Menjaj View
    };

    const displayNavigation = () => {
        return adminSidebarConfig.map((item, index) => {
            return (
                <li key={index} className={activeItem === item.name ? 'active' : null} onClick={() => changeView(item.name)}>
                    <i className={item.icon}></i>
                    <span>{item.name}</span>
                </li>
            );
        });
    };

    return (
        <>
            <div className='sidebar-wrapper'>
                <div className='sidebar'>
                    <div className='header'>
                        <h3>Admin Dashboard</h3>
                    </div>
                    <div className='navigation'>
                        <nav>
                            <ul>{displayNavigation()}</ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
