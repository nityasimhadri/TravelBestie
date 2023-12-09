import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button, Searchbar, Text, Card, IconButton } from "react-native-paper";
import Modal from "react-native-modal";
import QuizScreen from "./QuizScreen";
import Icon from "react-native-vector-icons/Ionicons";
import TagBox from "./TagBox";
import DatePicker from "./DatePicker";
import LocationSearch from "./locationSearch";
import Travelers from "./Travelers";
import BudgetRangeSlider from "./BudgetPicker";
import ChatScreen from "./ChatScreen";

export default function Generate({ navigation }) {
  const likedPlaces = require("./LikedPlaces.json");
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [isChatModalVisible, setChatModalVisible] = useState(false);



  return (
    <ScrollView style={styles.container}>
  
            <ScrollView>
  
             <ChatScreen></ChatScreen>
            
            </ScrollView>

        
      
  

 
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  textContainer: {
    top: 30,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "top",
    alignItems: "left",
    paddingHorizontal: 30,
  },
  categoryHeader: {
    justifyContent: "space-between",
    // alignItems: 'center',
    alignContent: "center",
    paddingTop: 25,

    // borderBottomWidth: 1, // Add this line to create a border
    // borderBottomColor: "#ccc",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    fontSize: 21,
    fontFamily: "AppleSDGothicNeo-Regular",
    fontWeight: "250",
    color: "black",
  },
  subtextContainer: {
    flexDirection: "column",
    alignItems: "flex-start", // Change 'left' to 'flex-start'
    paddingTop: 50,
    justifyContent: "flex-start", // Change 'top' to 'flex-start'
    alignItems: "flex-start", // Change 'left' to 'flex-start'
    paddingLeft: 30,
  },
  section: {
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 16,
    top: 40,
    borderColor: "#fb8500",
    borderWidth: 1,
  },
  filterButton: {
    backgroundColor: "#FE4E4E",
    borderRadius: 10,
    height: 50,
    width: 50,
  },
  sectionHeader: {
    fontFamily: "AppleSDGothicNeo-Regular",
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  sectionText: {
    fontFamily: "AppleSDGothicNeo-Regular",
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    color: "white",
  },
  searchBar: {
    backgroundColor: "white",
    borderRadius: 8,
    width: "85%",
    borderWidth: 0.3,
    borderColor: "gray",
    height: 50,
  },
  card: {
    width: 140,
    margin: 10,
    height: 180,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  cardCover: {
    height: 160,
  },
  cardContent: {
    paddingTop: 10,
    flexDirection: "column",
    alignItems: "flex-start", // Change 'left' to 'flex-start'
  },
  cardText: {
    fontFamily: "AppleSDGothicNeo-Regular",
    fontWeight: "bold",
  },
  modal: {
    flex: 1,
    margin: 0,
  },

  modalContent: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 50,
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,  // Add this line to create a border
    borderBottomColor: '#ccc',
  },

  modalSubheader: {
    flex: 1,
    alignItems: "center",
  },

  modalHeaderText: {
    fontSize: 17,
    fontWeight: 500,
    color: "black",
  },
  modalFooter: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
});
