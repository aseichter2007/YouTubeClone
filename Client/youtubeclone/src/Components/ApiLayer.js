import React, { Component } from 'react';
import axios from 'axios';
import Container from './Container.js';
import apiKeys from '../apiKey/googlekeys';

export default class ApiLayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeVideo: null,
            allComments: null,
            oneComment: null,
            currentComments: null,
            youtubeCurrent: null,
            apiFunctions: null,
            ytWorking: false,
            myAPIworking: false,
            ytReady: false,
            videosReady: false,
            ready: false,
            previousSearch: null,
            searchValue: null,
            newCommentTitle: null,
            newCommentText: null,
            loadedSubcommentParents: []
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    componentDidMount() {
        console.log("didmount")
        //console.log(apiKeys);
        //this.getYoutube("welding");//was working
        // if (this.state.videos == null && this.state.myAPIworking === false) {
        //     this.getVideos();
        //     this.setState({ myAPIworking: true });
        // }
        if (this.state.allComments == null && this.state.myAPIworking === false) {
            // this.getComments();
            //this.setState({ myAPIworking: true });
        }
        this.setState({
            ready: true,
            apiFunctions: {
                setActiveVideo: this.setActiveVideo.bind(this),
                apiSetState: this.setState.bind(this),
                getYoutube: this.getYoutube.bind(this),
                getComments: this.getComment.bind(this),
                getComment: this.getComment.bind(this),
                likeComment: this.likeComment.bind(this),
                postComment: this.postComment.bind(this),
                handleCommentTitleInputChange: this.handleCommentTitleInputChange.bind(this),
                handleCommentTextInputChange: this.handleCommentTextInputChange.bind(this),
                handleSubmit: this.handleCommentSubmit.bind(this)
            }
        })
        console.log("/didmount")
    }
    getYoutube() {
        //console.log();
        console.log(this.state.ytWorking);
        console.log(this.state.previousSearch);
        if (!this.state.ytWorking && this.state.previousSearch !== this.state.searchValue) {
            this.setState({
                previousSearch: this.state.searchValue,
                ytWorking: true
            })
            try {
                axios.get(
                    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${this.state.searchValue}&type=video&${apiKeys.googleApiKey}`
                ).then((response) => {
                    console.log(response);
                    this.setState({
                        ytWorking: false,
                        ytReady: true,
                        youtubeCurrent: response.data
                    });
                    console.log({ message: "inside getYoutube", data: this.state.youtubeCurrent });
                });

            } catch (error) {
                console.log(error)
                this.setState({
                    ytWorking: false
                });
            }
        } else {
            console.log("working or previoussearch")
        }
    }

 

    setActiveVideo(video) {
        console.log({ loc: "setActiveVideo", video: video })
        this.setState({ 
            activeVideo: this.state.youtubeCurrent.items[video]
        });
        //console.log("activeVideoinSetActive")
        //console.log(this.state.youtubeCurrent.items[video].id.videoId )
        this.getComment(this.state.youtubeCurrent.items[video].id.videoId )

    }
    // getComments() {//no.
    //     axios.get(
    //         'http://localhost:5000/api/comments/',
    //     ).then((response) => {
    //         this.setState({
    //             myAPIworking: false,
    //             comments: response.data
    //         });          
    //         console.log(this.state.allComments);
    //     });
    // }
    getComment(id) {
        axios.get(
            'http://localhost:5000/api/comments/' + id,
        ).then((response) => {
            this.setState({ currentComments: response.data });
            console.log(this.state.allComments);
        });
    }
    postComment() {
        console.log("postComment");
        //console.log(data.parent);
        console.log(this.state.activeVideo.id.videoId)
        console.log(this.state.newCommentText);
        console.log(this.state.newCommentTitle);


        axios.post('http://localhost:5000/api/comments/'+this.state.activeVideo.id.videoId, 
        {
            parent: this.state.activeVideo.id.videoId,
            title: this.state.newCommentTitle,
            description: this.state.newCommentText
        }).then((response) => {
            this.setState({ currentComments: response.data });
            console.log(this.state.allComments);
        });
    }
    likeComment(id) {
        console.log("like")
        let comment = this.state.currentComments.filter((comment) => {
            console.log(id + " : " + comment._id);
            if (id === comment._id) {
                return false;
            } else {
                return true;
            }
        });
        console.log(comment);
            axios.put('http://localhost:5000/api/comments/like/'+id,{likes:comment[0].likes}).then((response) => {
                console.log(response.data)
            this.setState({
                comments: response.data
            });
            console.log(this.state.comments);
        });
    }
   

    deleteComment(id) {
        axios.delete(
            'http://localhost:5000/api/comments/' + id,
        ).then((response) => {
            this.setState({ oneComment: response.data });
            console.log(this.state.allComments);
        });
    }
    searchState(searchValue){
        this.setState({ 
            searchValue: searchValue
        })
    }
    handleInputChange(event) {
        console.log("handleChange")
        console.log(event.target)
        this.setState({ 
            searchValue: event.target.value
        })
    }
    handleCommentTitleInputChange(event) {
        console.log("handleChange")
        console.log(event.target)
        this.setState({ 
            newCommentTitle: event.target.value
        });
        event.preventDefault();

    }
    handleCommentTextInputChange(event) {
        console.log("handleChange")
        console.log(event.target)
        this.setState({ 
            newCommentText: event.target.value
        });
        event.preventDefault();

    }
    handleCommentSubmit(event){
       // console.log("commentSubmit")
        //console.log(this.state.newCommentText);
        //console.log(this.state.newCommentTitle);
        this.postComment();
        event.preventDefault();


    }
    handleSubmit(event) {
        console.log("submit");
        console.log(event);
        this.getYoutube()
        event.preventDefault();
    }
    render() {
        console.log("renderAPIlayer");
        if (this.state.ready) {
            return (
                <div>
                    <div>Search Youtube:</div>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Name:
                            <input type="text" value={this.state.SearchValue} onChange={this.handleInputChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>                   
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
