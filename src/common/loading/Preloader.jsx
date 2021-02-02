import React from 'react';
import loading from '../../assets/images/loading.gif';

let Preloader = (props) => {
   return <div>
            <img src = {loading} style ={{width: '150px', height: '100px'}} />
         </div>
}

export default Preloader;