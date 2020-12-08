import React, {Component} from 'react';
import axios from 'axios';
import Container from './Containter.js';


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
        
        if(this.state.videos == null && this.state.myAPIworking === false){
            this.getVideos();
            this.setState({myAPIworking: true});
        }
        // while(this.state.myAPIworking === false){
        //     //This is probably a shit idea.
        //     console.log("myapiworking")
        // }
        if(this.state.allComments == null && this.state.myAPIworking === false){
           // this.getComments();
            this.setState({myAPIworking: true});
        }
        this.setState({
            ready: true,
            apiFunctions: {
                getYoutube: this.getYoutube.bind(this),
                getVideos: this.getVideos.bind(this),
                getComments: this.getComment.bind(this),
                getComment: this.getComment.bind(this),
            }
        })
        console.log("mounted")
    }
    getYoutube(search){
        if (!this.state.ytWorking) {
            this.setState({ytWorking: true});
            axios.get(
              `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search}&type=video&${apiKeys.googleApiKey}`
            ).then((response) =>{
                console.log(response);
                this.setState({
                    ytWorking: false,
                    ytReady:true,
                    youtubeCurrent: response.data
                });
                console.log(this.state.youtubeCurrent);
            });
        }
    } 
    postYoutube(){
        //don't think I need this. 
    }
    getVideos(){
        console.log("getVideos")
        axios.get(
        'http://localhost:5000/api/videos/',
        ).then((response) => {
            this.setState({
                myAPIworking: false,
                videosReady:true,
                videos : response.data
            });
            console.log({message: "hello", data: this.state.videos});
        });
        
    }

    responseSetVideos(response){
      
    }
    getComments(){
        axios.get(
        'http://localhost:5000/api/comments/',
        ).then((response) => {
            this.setState({
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
        if(this.state.ready){
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
