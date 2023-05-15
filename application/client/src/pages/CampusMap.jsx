import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom'
 

 
 function CampusMap() {
 
     return (
         <div className='campus-map'
             style={{
                 backgroundImage: `url(${process.env.PUBLIC_URL}/images/brand/campusmap.png)`,
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 backgroundRepeat: 'no-repeat',
                 height: '200vh',
                 width: '100vw',
             }}
         >
         
         </div>
     );
 }
 
 export default CampusMap;