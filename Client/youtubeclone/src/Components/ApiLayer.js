import React, {Component} from 'react';
import axios from 'axios';
import Container from './Container.js';
import apiKeys from '../apiKey/googlekeys';

export default class ApiLayer extends Component {
    state = {
        videos: null,
        activeVideo: null,
        allComments: null,
        oneComment:null,
        currentComments: null,
        youtubeCurrent: null,
        apiFunctions: null,
        ytWorking : false,
        myAPIworking: false,
        ytReady: false,
        videosReady: false,
        ready: false
    }
    componentDidMount(){
        console.log("didmount")
        //console.log(apiKeys);
       // this.getYoutube("welding");//was working
        // if(this.state.videos == null && this.state.myAPIworking === false){
        //     this.getVideos();
        //     this.setState({myAPIworking: true});
        // }
        // while(this.state.myAPIworking === false){
        //     //This is probably a shit idea. I wonder how this will behave.
        //     console.log("myapiworking")
        // }
        // if(this.state.allComments == null && this.state.myAPIworking === false){
        //    // this.getComments();
        //     this.setState({myAPIworking: true});
        // }
        // this.setState({
        //     ready: true,
        //     apiFunctions: {
        //         getYoutube: this.getYoutube.bind(this),
        //         getVideos: this.getVideos.bind(this),
        //         getComments: this.getComment.bind(this),
        //         getComment: this.getComment.bind(this),
        //     }
        // })
        console.log("/didmount")
    }
    getYoutube(search){
        if (!this.state.ytWorking) {
            //this.setState({ytWorking: true});
            try {
                axios.get(
                  `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search}&type=video&${apiKeys.googleApiKey}`
                ).then((response) =>{
                    console.log(response);
                    this.setState({
                        ytWorking: false,
                        ytReady:true,
                        youtubeCurrent: response.data
                    });
                    console.log({message: "inside getYoutube", data: this.state.youtubeCurrent});
                });
                
            } catch (error) {
                console.log(error)
            }
        }
    } 
    postYoutube(){
        //don't think I need this. 
    }
    getVideos(){
        console.log("getVideos")
        try {
            
            axios.get(
            'http://localhost:5000/api/videos/',
            ).then((response) => {
                this.setState({
                    myAPIworking: false,
                    videosReady:true,
                    videos : response.data
                });
                console.log({message: "inside getvideos", data: this.state.videos});
            });
        } catch (error) {
            console.log(error)
        }
        
    }

    responseSetVideos(response){
      
    }
    getComments(){
        axios.get(
        'http://localhost:5000/api/comments/',
        ).then((response) => {
            this.setState({
                myAPIworking: false,
                comments : response.data
            });
            console.log(this.state.allComments);
        });
    }
    getComment(id){
        axios.get(
            'http://localhost:5000/api/comments/'+id,
            ).then((response) => {
                this.setState({oneComment : response.data});
                console.log(this.state.allComments);
            });
    }
    postVideo(data){
        axios.post()
    }
    postComment(data){
    
    }
    putVideo(id, data){

    }
    putComment(id, data){

    }
    deleteVideo(id){
        axios.delete(
            'http://localhost:5000/api/videos/'+id,
            ).then((response) => {
                this.setState({oneComment : response.data});
                console.log(this.state.allComments);
            });
    }
    deleteComment(id){
        axios.delete(
            'http://localhost:5000/api/comments/'+id,
            ).then((response) => {
                this.setState({oneComment : response.data});
                console.log(this.state.allComments);
            });
    }
    render(){
        console.log("renderAPIlayer");
        if(false){
            return (
                <div>
                    loaded.
                    <Container api={this.state}></Container>
                </div>
            )
        } else {
            return (
                <div>loading...</div>
            )
        }

    }
}
