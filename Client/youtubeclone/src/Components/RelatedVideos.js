import React from "react";

export default function RelatedVideos(props) {

    var videos = [];
    props.api.youtubeCurrent.forEach(video => {
        videos.push(
            <div>
                
            </div>
        );
    });

}
