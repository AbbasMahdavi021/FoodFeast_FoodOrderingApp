import react, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import '../../styles/Cart.css';
import { UserContext } from '../../context'

const BecomeDriver = () => {

    const navigate = useNavigate();

    const { user } = useContext(UserContext);
    const [popUp, setPopUp] = useState(false);

    const user_id = user ? user.id : null;

    const togglePopup = () => {
        setPopUp(!popUp);
        setTimeout(() => {
            setPopUp(false);
            navigate('/login')
        }, 3000);
    };

    const handleClick = async () => {

        try {
            const res = await axios.post('/driver/becomeDriver', { userId: user_id });

            const resMessage = res.data.message
            console.log(resMessage)
            if (resMessage === 'becameDriver') {
                togglePopup();
                console.log("becameDriver");
            } else {
                console.log(resMessage)
            }

        } catch (error) {
            console.error('Error during becomeDriver:', error);
        }
    }
return (

        <div className="cart-container">

            <div>
                <h1>Welcome! This page is exclusively for our valued drivers.<br /><br /></h1>
                <h3>We couldn't find a driver account associated with your profile.</h3>
                <h3>Would you like to join our driver community and start earning with us?<br /><br /></h3>
                <h3>If you're ready, simply click the button below to register your account as a driver.</h3>
                <h3>Please note: A valid driver's license is required to proceed.<br /><br /><br /></h3>
                <h3>If you prefer, you can also log out and create a new account when you return to this page.<br /><br /><br /></h3>
                <h3>Feel free to explore other areas of our platform if this doesn't apply to you.<br /><br /><br /></h3>
                <h3>Register your account as a driver today and unlock earning opportunities!<br /><br /></h3>
            </div>


            <div className="shop-button">
                <button onClick={handleClick}>Become a Driver</button>
            </div>


            {popUp && (
                <div className='popUp'>
                    <div className="menuPopUpDiv">
                        <h3>Your account was successfully registered as a Driver</h3>
                        <h3>Thank you for enrolling with us!</h3>
                        <h3>We are now redirecting you to the login page</h3>                        <h3>We are now redirecting you to the login page</h3>
                        <h3>You must re-login with your Credentials,</h3>
                        <h3>after which you can see your dashboard, and start earning!</h3>

                    </div>
                </div>
            )}

        </div>
    )


}

export default BecomeDriver;