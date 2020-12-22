import React from 'react';

export default function VideoSelection(props) {
    console.log("VideoList");
    console.log(props.api.youtubeCurrent.items);
    var videoList = []
    function setVideo(video){props.api.apiFunctions.setActiveVideo(video);}
    for (let index = 0; index < props.api.youtubeCurrent.items.length; index++) {
        const video = props.api.youtubeCurrent.items[index];
        videoList.push(
            <div>
                <button onClick={() => setVideo(index)}>
                    <img src={video.snippet.thumbnails.default.url} height="90" width="120" />
                    <div>
                        title: <span>{video.snippet.title}</span><br></br>
                        description: <span>{video.snippet.description}</span>
                    </div>
                </button>
            </div>
        );
    }
    return (
        <div>
            VideoSelection
            <div>{videoList}</div>
        </div>
    );
}
