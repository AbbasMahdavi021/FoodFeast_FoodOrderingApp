import React, { useState } from 'react';
import axios from 'axios';

import AdminUsers from './AdminUsers';
import AdminRestaurants from './AdminRestaurants';
import AdminEnrollments from './AdminEnrollments';

import '../..//styles/AdminLayout.css';




const AdminTabs = ({ activeTab, handleTabClick }) => {
    const tabs = [
        { name: 'users', label: 'Users' },
        { name: 'restaurants', label: 'Restaurants' },
        { name: 'enrollments', label: 'Enrollments' }
    ];

    return (
        <div className='tabs'>
            <div>
                {tabs.map(tab => (
                    <div className={activeTab === tab.name ? 'tab active' : 'tab'} onClick={() => handleTabClick(tab.name)}>
                        {tab.label}
                    </div>
                ))}
            </div>

            <div className='tab-buttons'>
                <a href='/adminlogin' className='tab-button'>
                    Logout
                </a>
                <a href='/' className='tab-button'>
                    Exit
                </a>
            </div>
        </div>
    );
};



const AdminSideBoxes = ({ activeTab }) => {
    const tabs = {
        users: { left: <AdminUsers />, right: <div>AdminUsers INFO BOX</div> },
        restaurants: { left: <AdminRestaurants />, right: <div>AdminRestaurants INFO BOX</div> },
        enrollments: { left: <AdminEnrollments />, right: <div>AdminEnrollments INFO BOX</div> }
    };

    return (
        <div className='side-boxes'>
            <div className='top-boxes'>
                <div className='top-box left'>{tabs[activeTab]?.left}</div>
                <div className='top-box right'>{tabs[activeTab]?.right}</div>
            </div>
            <CMD />
        </div>
    );
};



const CMD = () => {

    const [content, setContent] = useState("");

    const [pastCommands, setPastCommands] = useState([]);

    const [lastCommandIndex, setLastCommandIndex] = useState(0);

    const [inputContent, setInputContent] = useState("");


    const handleCommand = async () => {




        //if input is not empty: 
        if (inputContent.length !== 0) {

            //push command to past Commands
            setPastCommands([...pastCommands, inputContent]);

            //update lastCommand to Pastcommands.lenght -1 
            setLastCommandIndex(pastCommands.length - 1);



            //check if command is 'clear'

            if (inputContent === 'clear') {
                setContent("");
                return;
            }

            try {

                const res = await axios.post("/admin/processQuery", { query: inputContent }, { withCredentials: true });
                console.log(res);

                setContent(content + "\n" + inputContent + "\n" + JSON.stringify(res.data));

            } catch (error) {
                console.log(error)
                setContent(content + "\n" + inputContent + "\n" + error);
            }

        };




    }

    const handleKeyInput = async (e) => {

        let keyPressed = e.which;

        //13 = Enter Key
        if (keyPressed === 13) {


            console.log("ENTERED");

            setContent(content + "\n" + inputContent);

            await handleCommand();



            setInputContent('');
            //38 = UpArrowKey
        } else if (keyPressed === 38) {

            console.log("UP");

            //
            setInputContent(pastCommands[lastCommandIndex]);
            setLastCommandIndex(lastCommandIndex === 0 ? 0 : lastCommandIndex - 1);

            //40 = DownArrowKey
        } else if (keyPressed === 40) {
            setLastCommandIndex(lastCommandIndex === pastCommands.length - 1 ? pastCommands.length - 1 : lastCommandIndex + 1);
            setInputContent(pastCommands[lastCommandIndex]);
            console.log("DOWN");

            //46 = BackSpace (delete char)
        }

        // else if ( keyPressed === 8) {

        //     if(inputContent.length > 0) {
        //         setInputContent(inputContent.slice(0, -1));
        //     }

        // } 

        // else {
        //     //users entered a normal key
        //     setInputContent(inputContent + String.fromCharCode((96 <= keyPressed && keyPressed <= 105) ? keyPressed - 48 : keyPressed));
        // }

    }


    return (

        <div className='cmd-box'>
            http://localhost:3000/admin/Admin1
            <textarea className='text-area' value={content} />

            <input
                className='cmd-input'
                type='text'
                value={inputContent}
                onKeyUp={handleKeyInput}
                onChange={e => setInputContent(e.target.value)}


            />
        </div>


    );
};



const AdminLayout = () => {

    const [activeTab, setActiveTab] = useState('users');

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <div className='admin-layout'>
            <div className='left-boxes'>
                <AdminTabs activeTab={activeTab} handleTabClick={handleTabClick} />
            </div>

            <div className='admin-side-boxes'>
                <AdminSideBoxes activeTab={activeTab} />
            </div>
        </div>
    );
};



export default AdminLayout;