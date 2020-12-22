import React from 'react';
import SubComment from './SubComment'
import axios from 'axios'

export default function Comment(props){
    const [subComments, setSubComments] = React.useState(null);
    const [reply, setReply] = React.useState(null);
    console.log("commentBeforeGet")
    console.log(subComments);
    // let fakesubcomments = [{text:"this"}, {text: "comments"}, {text:"are"}, {text:"fake"}]
    axios.get('http://localhost:5000/api/subcomments/'+props.id).then((res)=>{
        console.log({subcommentGet: res.data});
        setSubComments(res.data);
        
    })
    function handleInput(event){

        setReply(event.target.value)
        event.preventDefault();

    }
    
    function postSubComment(event){
        console.log(props.id);
        console.log(reply)
        axios.post('http://localhost:5000/api/subcomments/', {parent: props.id, text: reply}).then((res)=> {console.log(res)})
        event.preventDefault();
    }
    var renderSubComments =[];
    if (subComments !==null &&subComments.length > 0) {
            subComments.forEach(subComment => {
            renderSubComments.push(
                <div>
                    <SubComment text ={subComment.text}></SubComment>
                </div>
            )
        });
        return(
            <div>
                <div>{props.title}</div>
                <div>{props.text}</div>
                <div>{props.likes}</div>
                <button onClick={() => props.like(props.id)}>like</button>
                <form onSubmit={postSubComment}>
                    <label>
                        Reply:  <input type="text" value={reply} onChange={handleInput} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>  
                <div>
                    {renderSubComments}
                </div> 
            </div>
        )

    } else {
        
        return(
            <div>
                <div>{props.title}</div>
                <div>{props.text}</div>
                <div>{props.likes}</div>
                <button onClick={() => props.like(props.id)}>like</button>
                <form onSubmit={postSubComment}>
                        <label>
                           Reply: <input type="text" value={reply} onChange={handleInput} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>   
            </div>
        )
    }
}