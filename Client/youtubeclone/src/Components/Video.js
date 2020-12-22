import React from "react";

export default function Video(props) {
  //console.log({ Loc: "Video.js", props: props });
  //console.log("id");
  //console.log(props.video.id.videoId);
  if (props.video === null) {
    return (
      <div>
        Video.Js
      </div>
    );
  } else {
    return (
      <div>
        Video.js-Render
        <div>
          <iframe
            title='YouTube Player'
            id='videoPlayer'
            type='text/html'
            width='900'
            height='600'
    src={`https://www.youtube.com/embed/${props.video.id.videoId}`}
            frameBorder='0'></iframe>
          <h4>{ }</h4>
          <p>{ }</p>
          <p>{ }</p>
        </div>
      </div>
    );
  }

}
