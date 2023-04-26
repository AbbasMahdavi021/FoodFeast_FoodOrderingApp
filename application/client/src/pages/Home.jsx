/* The main home component that renders the two child components:
The home-header, containing featured restaurants, and header txt/img,

as well as the browse page, with search, dropdown, and all restaurants"

By; Abbas M

*/

import React from 'react';
import HomeHeader from '../components/HomeHeader';
import Browse from '../components/Browse';
import '../styles/Home.css';


function Home() {

    const scrollToSecondPage = () => {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    };

    return (
        <div className="home-container">
            <div className="header-page">
                <HomeHeader scrollToSecondPage={scrollToSecondPage}/>
            </div>
            <Browse/>
        </div>
    );
}

export default Home;