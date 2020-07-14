import React,{Component} from 'react';
import { TextInput, StyleSheet, Text, View, Button } from 'react-native';
import io from 'socket.io-client';

export default class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      chatMessage:'',
      chatMessages:[],
      username: "Client: "
    };
  }

  componentDidMount(){
    this.socket = io("http://192.168.1.106:3000");
    this.socket.on("Chat Message",msg => {
      this.setState({chatMessages:[...this.state.chatMessages,msg]});
    });
  }

  sendMessage(){    
    this.socket.emit("Chat Message",this.state.chatMessage);
    this.setState({chatMessage:''});
  }

  render(){

    const chatM = this.state.chatMessages.map(chatMes => <Text>{chatMes}</Text>);

    return(
      <View style={{paddingTop:50}}>
        <TextInput 
          placeholder='Enter Message' 
          onChangeText={chatMessage => {this.setState({chatMessage});}}
          value = {this.state.chatMessage}
        />
        <Button title='Send' onPress={() => this.sendMessage()}/>

        <Text>{chatM}</Text>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 2,
//     borderColor: 'rgb(0,0,0)',
//   },
// });
