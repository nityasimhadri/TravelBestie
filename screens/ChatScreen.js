import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "react-native-paper";
import TagBox from "./TagBox";
import QuizScreen from "./QuizScreen";

export default function ChatScreen({ navigation }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [responses, setResponses] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [index, setIndex] = useState(0);
  const [selectedResponse, setSelectedResponse] = useState([]);
  const [userResponse, setUserResponse] = useState();
  const [chatMessages, setChatMessages] = useState([
      "Hi! Its your travel bestie here! Im so excited to help you build your dream vacation. With just a few more questions, I can help craft the perfect itinerary for your travel needs!",
  "Will you have access to your own car?", "What is your preferred mode of transport?", "How many activities would you like per day"]
  );
  const [responseOptions, setResponseOptions] = useState([["Lets do it!", "Im ready!"],
["Yes", "No but I can use rideshare", "Not at all"],["Walking", "Public Transport", "Car"], ["0-1","2-4","4+"]]
  );

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const displayMessage = async (index) => {
    let message = chatMessages[index]
    let responseOpt = responseOptions[index]
    setClicked(false);
    try {
      let concatenatedResponse = "";

      for (let i = 0; i < message.length; i++) {
        await sleep(40); // Adjust the delay time (in milliseconds) to control typing speed
        concatenatedResponse = message.slice(0, i + 1);
    
        setMessages([...messages, { user: false, text: concatenatedResponse , responses: responseOpt}]);
      }
    } catch (error) {
      console.error("Chatbot API Error:", error.message);
    }

    await sleep(200);

  
  };


  const handleResponseClick = (response) => {
    console.log(response)
    setClicked(!clicked);
    setSelectedResponse([...selectedResponse, response]);
    setUserResponse(response);
    setIndex(index+1)
    console.log(selectedResponse)

    if((index+1) < chatMessages.length){

      displayMessage(index+1);
    }
  };

  useEffect(() => {
    displayMessage(0);
  }, []); // Run only once when the component mounts

  return (
    <View>
    {messages.map((msg, index) => (
      <View key={index} style={styles.container}>
        <View style={styles.messageContainer}>
    
          {!msg.user && (
              <Avatar.Image
              size={65}
              source={require("../assets/planegirl.jpeg")}
              style={styles.profilePicture}
            />
        
          )}
          <View style={msg.user ? styles.userMessage : styles.chatbotMessage}>
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
         
          
          </View>

          
  
          {msg.text === chatMessages[index] ? (
  <>
    <TouchableOpacity
      style={[
        styles.userMessage,
        selectedResponse[0] === msg.responses[0] && styles.selectedResponseTag,
      ]}
      onPress={() => handleResponseClick(msg.responses[0])}
    >
      <Text style={styles.responseText}>Let's do it!</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[
        styles.userMessage,
        selectedResponse[1] === msg.responses[1] && styles.selectedResponseTag,
      ]}
     onPress={()=> navigation.navigate("Dashboard")}
    >
      <Text style={styles.responseText}>I don't need an itinerary</Text>
    </TouchableOpacity>
  </>
) : (
  ""
)}
       
      </View>
    ))}
    <TagBox></TagBox>
  </View>
  );
};

const styles = StyleSheet.create({
  userMessage: {
    padding: 10,
    marginLeft: '30%',
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderWidth: 0.4,
    borderColor: "gray",
    borderBottomRightRadius: 0,
    position: "relative",
    // alignSelf: "flex-end", // Align the user message to the start (left)
  },
  chatbotMessage: {
    padding: 10,
    margin: 5,
    marginLeft: 30,
    marginRight: '10%',
    backgroundColor: "#FDD",
    borderRadius: 10,
    borderBottomLeftRadius: 0, // Removes border radius at the bottom left
    position: "relative",
   alignSelf: "flex-end", // Align the user message to the start (left)
  },
  tail: {
    position: "absolute",
    width: 0,
    height: 0,
    bottom: -5, // Adjust the value based on the desired position
    zIndex: 1,
  },
  tailUser: {
    right: 10,
    borderBottomWidth: 8,
    borderBottomColor: "#DDF",
    borderLeftWidth: 8,
    borderLeftColor: "transparent",
  },
  tailChatbot: {
    left: 10,
    borderBottomWidth: 8,
    borderBottomColor: "#FDD",
    borderRightWidth: 8,
    borderRightColor: "transparent",
  },
  messageText: {
    fontSize: 16,
  },
  messageContainer: {
    flex: 1,
    flexDirection: "row",
    columnGap: -12,
    // // alignItems: "flex-start", // Align the avatar and chat bubble at the bottom
    // marginVertical: 5,
    // marginHorizontal: 10,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    rowGap: 10,
  
    // alignItems: "flex-start", // Align the avatar and chat bubble at the bottom
    marginVertical: 5,
    marginHorizontal: 10,
  },

  profilePicture: {
    marginTop: 50,
  },
  responseContainer: {
    flexDirection: "column",
    rowGap: 10,
    marginHorizontal: "20%",
  },
  selectedResponseTag: {
    padding: 10,
    marginLeft: '30%',
    backgroundColor: "#FE4E4E",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FE4E4E",
    borderBottomRightRadius: 0,
    position: "relative",

  },
  responseText: {
    // color: "white",
    fontSize: 16,
  },
});


