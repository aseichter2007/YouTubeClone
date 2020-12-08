import React from 'react';

export default function Container(props){
    console.log(props)
    console.log("requestYoutube")
    props.api.apiFunctions.getYoutube("welding")
    return(
        <div>
            VIDEO
        </div>
    );
}
