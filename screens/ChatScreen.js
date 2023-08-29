import React, { useState } from 'react';
import { View, StyleSheet, FlatList, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Button, TextInput, Card, Title, Paragraph } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import SansFont from '../SansFont';

const ChatBotScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([{role: 'system', content: 'Your helpful assistant.'}]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    const userMessage = message;
    setMessage(''); // Clear the input field immediately

    const newMessages = [...messages, {role: 'user', content: userMessage}];
    setIsTyping(true);

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-3.5-turbo",
        messages: newMessages
    }, {
        headers: {
            'Authorization': `Missing`,
            'Content-Type': 'application/json'
        }
    });

    const assistantMessage = response.data.choices[0].message.content;
    setMessages([...newMessages, {role: 'assistant', content: assistantMessage}]);
    setIsTyping(false);
};

const renderItem = ({ item }) => (
  <Card style={item.role === 'user' ? styles.userMessage : styles.botMessage}>
      <Card.Content>
          <Title style={item.role === 'user' ? styles.userTitle : styles.botTitle}>{item.role === 'user' ? 'You' : 'YourWingman'}</Title>
          <Paragraph style={item.role === 'user' ? styles.userContent : styles.botContent}>{item.content}</Paragraph>
      </Card.Content>
  </Card>
);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.container}>
        <FlatList
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.chatBox}
        />

        {isTyping && <ActivityIndicator size="large" color="#0000ff" />}

        <View style={styles.inputContainer}>
          <TextInput 
              value={message}
              onChangeText={setMessage}
              style={styles.input}
              placeholder="Type your message..."
          />
         <Button 
  icon={({color}) => <MaterialCommunityIcons name="send" size={30} color={color} />} 
  mode="contained" 
  onPress={sendMessage} 
  style={styles.sendButton} 
  contentStyle={styles.sendButtonContent} 
/>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  chatBox: {
    flexGrow: 1,
    justifyContent: 'flex-end'
    
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  input: {
    fontFamily: 'DM Sans Bold',
    flex: 1,
    marginBottom: 10,
    height: 50 // Adjust as needed for desired size,
  },
  sendButton: {
    marginLeft: 10,
  },
  sendButtonContent: {
    height: 50, // Matches height of input box
    width: 50, // Adjust as needed for desired size
    justifyContent: 'right', // centers icon vertically
    alignItems: 'center', // centers icon horizontally
  },
  userMessage: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    fontFamily: 'DM Sans Bold',
  },
  botMessage: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    backgroundColor: '#dddddd',
    fontFamily: 'DM Sans Bold',
    
  },

});

export default ChatBotScreen;