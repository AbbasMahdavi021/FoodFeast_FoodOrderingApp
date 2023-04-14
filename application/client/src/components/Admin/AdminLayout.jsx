import React, { useState } from 'react';
import '../..//styles/AdminLayout.css';
import AdminUsers from './AdminUsers'
import axios from 'axios';



const AdminTabs = () => {

    return (
        <div className='tabs'>

            <div >
                <div className='tab active'> Users </div>
                <div className='tab'> Restaurants </div>
                <div className='tab'> Entrollments </div>
            </div>

            <div className='tab-buttons'>
                <a href="/adminlogin" className="tab-button"> Logout</a>
                <a href="/" className="tab-button"> Exit </a>
            </div>

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
            setPastCommands( [...pastCommands, inputContent]);

            //update lastCommand to Pastcommands.lenght -1 
            setLastCommandIndex(pastCommands.length -1);

            

            //check if command is 'clear'

            if (inputContent === 'clear') {
                setContent("");
                return;
            }

            try {

                const res = await axios.get("/restaurants/getAllRestaurants", {query: inputContent}, {withCredentials: true}); 
                console.log(res);

                setContent(content + "\n"  + inputContent + "\n" + JSON.stringify(res.data) );

            } catch (error) {
                console.log(error)
                setContent( content + "\n"  + inputContent + "\n" + error);
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

        <div className='user-box'>
            C:\Users\abbas\OneDrive\Desktop\648\csc648-03-sp23-team01\application\server

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


const AdminSideBoxes = () => {

    return (

        <div className='side-boxes'>
            <div className='top-boxes'>
                <div className='top-box left'>

                    <AdminUsers />

                </div>
                <div className='top-box right'> FAKE INFO BOX </div>
            </div>
            <CMD />

        </div>
    );
};


const AdminLayout = () => {

    return (

        <div className='admin-layout'>
            <div className='left-boxes'>
                <AdminTabs />

            </div>

            <div className='admin-side-boxes'>
                <AdminSideBoxes />
            </div>
        </div>
    );
};

export default AdminLayout;