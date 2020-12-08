import React, {useState, useEffect} from 'react';
import axios from 'axios';
const apikeys = require('../apiKey/googlekeys');

function Container(props) {
    const [videos, setVideos] = useState(null);
    const [selectedVideo, setSelectVideo] = useState(null);
    const [comments, setComments] = useState(null);
    let render;
    useEffect(async () => {
        if (videos == null) {     
            const result = await axios(
            'http://localhost:5000/api/videos/',
            );
            setVideos(result.data);
            console.log(videos);
        }
        console.log(videos);
    });
    console.log(videos);
    // if (props.videos) {
    //     setVideos(props.videos);
    // }
    
    if (videos != null) {
        for (let index = 0; index < videos.length; index++) {
            const element = videos[index];
            
            render = (
                <div>
                    {apikeys.apikey}
                </div>
            );
        }
    }else{
        render = (
            <div>
                {apikeys.apikey}
            </div>
        )
    }
    return render;
}

export default Container;

