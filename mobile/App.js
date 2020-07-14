import React from "react";
import Client from 'socket.io-client';
import {Text,View,StyleSheet,TextInput,Button} from 'react-native';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);
export default class Sock extends React.Component
{

    componentDidMount()
    {
         this.sock = Client('http://192.168.1.6:3000');
        this.sock.addEventListener("recieve"+this.state.room,(val)=>{
            this.state.chats.push(val);
            console.log(val)
            this.forceUpdate()
        })
    }


    constructor(props)
    {
        super(props);
        this.state = {
            room:"random",
            user:'test',
            msg:'',
            chats:[],
        };
    }

    render()
    {
        return(
            <View style = {style.container}>
                <TextInput value={this.state.room} onChangeText={(room)=>{
                    this.sock.addEventListener("recieve"+room,(val)=>{
                        this.state.chats.push(val);
                        console.log(val)
                        this.forceUpdate()
                    });
                    this.setState({room})}}
                />
                <TextInput value={this.state.user} onChangeText={(user)=>{this.setState({user})}}/>
                <TextInput  onChangeText={(msg)=>{this.setState({msg})}}/>
                <Button title="SEND" onPress={()=>{
                    console.log("sending.." + {user:this.state.user,msg:this.state.msg});
                    this.sock.emit("msg",{user:this.state.user,msg:this.state.msg},this.state.room);
                }}/>
                {this.state.chats.map((val,key)=>{
                    return(<Text key={key}> {val.id} {val.user}:{val.msg} </Text>)
                })}
            </View>
        );
    }
}

const style = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
          },
    }
);