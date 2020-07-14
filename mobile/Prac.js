import React, {Component} from 'react';
import {Text,View,Image} from 'react-native';
import io from 'socket.io-client';

class App extends Component{

    constructor(props){
        super(props);
        this.state={
            chatMessage:'',
            username:'Client',
            chatMessages:[]
        }
    }

    sendMessage(){
        this.socket = io("http://192.168.1.106:3000");
        this.socket.on("Chat Message", msg => {
            this.setState({chatMessages:[...this.state.chatMessage,msg]})
        });
    }

    render(){

    }

}