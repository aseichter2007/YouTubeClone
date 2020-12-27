import React from 'react';
import Video from './Video.js';
import VideoSelection from './VideoSelection.js';
import Comment from './Comment.js';

export default function Container(props) {
    //console.log(props);
    //console.log("requestYoutube");
    //props.api.apiFunctions.getYoutube("welding metal");
    //console.log(props.api.currentComments);
    var comments = []
    if(props.api.currentComments != null && props.api.currentComments.length > 0){
        props.api.currentComments.forEach(comment => {
            comments.push(<div>
                <Comment id={comment._id} title={comment.title} text={comment.description} date={comment.dateModified} likes={comment.likes} like={props.api.apiFunctions.likeComment} ></Comment>
            </div>)
        });
    }
    if(props.api.youtubeCurrent===null && props.api.activeVideo===null){
        return(
            <div>
                no search entered
            </div>
        )
    } else if (props.api.activeVideo === null){
        return(
            <div>
                 <VideoSelection api={props.api}></VideoSelection>
            </div>
        )
    } else {

        return (
            <div>
                <div>
                    <Video video={props.api.activeVideo}></Video>
                    <VideoSelection api={props.api}></VideoSelection>
                </div>
                <div>
                <form onSubmit={props.api.apiFunctions.handleSubmit}>
                        <label>
                            Title: <input type="text" value={props.api.newCommentTitle} onChange={props.api.apiFunctions.handleCommentTitleInputChange} />
                            <br></br>
                            Text: <input type="text" value={props.api.newCommentText} onChange={props.api.apiFunctions.handleCommentTextInputChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form> 
                </div>
                <div>
                    {comments}
                </div>
            </div>
        );
    }
}
