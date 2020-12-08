import React from 'react';

export default function Container(props){
    console.log(props)
    console.log("requestYoutube")
    //props.api.apiFunctions.getYoutube("welding")//uncaught promise error, I should probaly catch and print. 
    return(
        <div>
            VIDEO
        </div>
    );
}
