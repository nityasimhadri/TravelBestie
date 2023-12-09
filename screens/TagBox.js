import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Button } from "react-native-paper";
import Modal from "react-native-modal";
import CalendarPicker from "react-native-calendar-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import the JSON data
import categoriesData from "./categories.json";

// Extract the travel interests array from the imported data
const travelInterests = categoriesData.travelInterests;

export default function TagBox() {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedBoxTags, setSelectedBoxTags] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(travelInterests);

  // Load selected tags from AsyncStorage when the component mounts
  useEffect(() => {
    const loadSelectedTags = async () => {
      try {
        const savedTags = await AsyncStorage.getItem("selectedTags");
        if (savedTags) {
          setSelectedBoxTags(JSON.parse(savedTags));
        }
      } catch (error) {
        console.error("Error loading selected tags: " + error);
      }
    };

    loadSelectedTags();
  }, []);

  // Save selected tags to AsyncStorage when they change
  useEffect(() => {
    const saveSelectedTags = async () => {
      try {
        await AsyncStorage.setItem(
          "selectedTags",
          JSON.stringify(selectedBoxTags)
        );
      } catch (error) {
        console.error("Error saving selected tags: " + error);
      }
    };

    saveSelectedTags();
  }, [selectedBoxTags]);

  const addTag = () => {
    if (tagInput.trim() !== "" && travelInterests.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const removeTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
  };

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Filter the categories based on the search text
  useEffect(() => {
    const filtered = travelInterests.filter((category) =>
      category.toLowerCase().startsWith(searchText.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchText]);

  // Clear search text when opening the modal
  useEffect(() => {
    if (isModalVisible) {
      setSearchText("");
    }
  }, [isModalVisible]);

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log("AsyncStorage cleared successfully");
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
  };

  //Call the function to clear AsyncStorage
  // clearAsyncStorage();

  return (
    <View>
      <ScrollView contentContainerStyle={styles.tagBox}>
        {selectedBoxTags.map((tag, index) => (
          <TouchableOpacity key={index} onPress={() => removeTag(index)}>
            <View key={index} style={styles.selectedTag}>
              <Text>{tag}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true), setSelectedTags(selectedBoxTags);
          }}
        >
          <View style={styles.addTagButton}>
            <Text style={{ color: "white" }}>+ Add Interests</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <Modal isVisible={isModalVisible} style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.modalCloseButton}
            >
              <Icon name="close" size={30} color="#8ecae6" />
            </TouchableOpacity>
            <View style={styles.modalSubheader}>
              <Text style={styles.modalHeaderText}>Interests</Text>
            </View>
          </View>

          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            placeholder="Search interests"
          />
          <ScrollView>
            {filteredCategories.map((category, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  toggleTag(category), setSearchText("");
                }}
              >
                <Text
                  style={[
                    styles.modalTag,
                    selectedTags.includes(category) && styles.selectedTag,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.modalFooter}>
            <Button
              onPress={() => {
                setModalVisible(false), setSelectedBoxTags(selectedTags);
              }}
              mode="contained"
              buttonColor="#8ecae6"
              style={{
                borderWidth: 1,
                paddingHorizontal: 20,
                width: "60%",
                borderRadius: 15,
              }}
            >
              Save
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  tagBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 10,
  },
  selectedTag: {
    backgroundColor: "#f2e3e5",
    color: "black",
    padding: 7,
    margin: 5,
    borderRadius: 10,
    borderColor: "#f2e3e5",
    borderWidth: 1,
    overflow: "hidden",
  },
  addTagButton: {
    backgroundColor: "#023047",
    color: "white",
    padding: 7,
    margin: 5,
    borderRadius: 10,
    borderColor: "#023047",
    borderWidth: 1,
    overflow: "hidden",
  },
  saveButton: {
    backgroundColor: "white",
    color: "black",
    padding: 14,
    margin: 5,
    borderRadius: 15,
    borderColor: "#FE4E4E",
    borderWidth: 1,
    overflow: "hidden",
    width: "40%",
    alignItems: "center",
  },
  activities: {
    marginTop: 10,
  },
  input: {
    padding: 5,
  },
  addButton: {
    backgroundColor: "white",
    color: "black",
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  modal: {
    flex: 1,
    margin: 0,
  },
  tagBoxHeader: {
    justifyContent: "space-between",
    // alignItems: 'center',
    alignContent: "center",
    paddingVertical: 10,
    borderBottomWidth: 1, // Add this line to create a border
    borderBottomColor: "#ccc",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1, // Add this line to create a border
    borderBottomColor: "#ccc",
  },

  modalSubheader: {
    flex: 1,
    alignItems: "center",
  },

  modalHeaderText: {
    fontSize: 18,
    fontWeight: 800,
    color: "black",
  },
  modalContent: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    padding: 20,
  },
  modalTag: {
    backgroundColor: "white",
    color: "black",
    padding: 7,
    margin: 5,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    overflow: "hidden",
  },
  modalFooter: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  placeholder: {
    fontSize: 16,
    color: "#999",
  },
  searchInput: {
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
  },
  modalCloseButton: {
    color: "#8ecae6",
  },
});
