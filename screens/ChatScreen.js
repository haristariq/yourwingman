
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, FlatList, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Button, TextInput, Card, Title, Paragraph } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import SansFont from '../SansFont';
import { chatWithBot } from '../backend';
import { getIdToken } from '../firebase';


const ChatBotScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([{role: 'system', content: 'Your helpful assistant.'}]);
  const [isTyping, setIsTyping] = useState(false);
  const [idToken, setIdToken] = useState(null); 
  const flatListRef = useRef(null);


  useEffect(() => {
    async function fetchToken() {
      try {
        const token = await getIdToken();
        console.log('ChatScreen Token Windows' + token);
        setIdToken(token);
      } catch (error) {
        console.error("Error fetching ID token:", error);
      }
    }

    fetchToken();
  }, []);

  const sendMessage = async () => {
    if (!message) return;  // If the message is empty, do nothing
  
    // Update the messages state to include the user's message
    setMessages([...messages, { role: 'user', content: message }]);
  
    // Set the bot as "typing"
    setIsTyping(true);
  
    try {
      // Use the chatWithBot function to get the bot's response
      console.log(message);
      const botResponse = await chatWithBot(message, idToken);
      
      // Update the messages state to include the bot's response
      setMessages(prevMessages => [...prevMessages, { role: 'bot', content: botResponse }]);
      if (flatListRef.current) {
          flatListRef.current.scrollToEnd({ animated: true });
      }
    } catch (error) {
      console.error("Error while communicating with the bot:", error);
      // Optionally, you can update the messages state to show an error message to the user
      setMessages(prevMessages => [...prevMessages, { role: 'system', content: "Sorry, there was an error processing your message. Please try again later." }]);
    }
  
    // Set the bot as "not typing"
    setIsTyping(false);
  
    // Clear the message state to reset the input field
    setMessage('');
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
        ref={flatListRef}
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.chatBox}
        />

        {isTyping && <ActivityIndicator size="large" color="purple" />}

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
    height: 50,
  },
  sendButton: {
    marginLeft: 10,
  },
  sendButtonContent: {
    height: 50,
    width: 50,
    justifyContent: 'right',
    alignItems: 'center',
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
