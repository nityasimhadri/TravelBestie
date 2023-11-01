import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import the JSON data
import categoriesData from './categories.json';

// Extract the travel interests array from the imported data
const travelInterests = categoriesData.travelInterests;

export default function TagBox() {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(travelInterests);

  // Load selected tags from AsyncStorage when the component mounts
  useEffect(() => {
    const loadSelectedTags = async () => {
      try {
        const savedTags = await AsyncStorage.getItem('selectedTags');
        if (savedTags) {
          setSelectedTags(JSON.parse(savedTags));
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
        await AsyncStorage.setItem('selectedTags', JSON.stringify(selectedTags));
      } catch (error) {
        console.error("Error saving selected tags: " + error);
      }
    };

    saveSelectedTags();
  }, [selectedTags]);

  const addTag = () => {
    if (tagInput.trim() !== '' && travelInterests.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
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
    const filtered = travelInterests.filter(category =>
      category.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchText]);

  // Clear search text when opening the modal
  useEffect(() => {
    if (isModalVisible) {
      setSearchText('');
    }
  }, [isModalVisible]);

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared successfully');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };
  
  // Call the function to clear AsyncStorage
//   clearAsyncStorage();

  return (
    <View>
      <ScrollView contentContainerStyle={styles.tagBox} onTouchEnd={() => setModalVisible(true)}>
        {selectedTags.length > 0 ? (
          selectedTags.map((tag, index) => (
            <View key={index} style={styles.selectedTag}>
              <Text>{tag}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.placeholder}>Pick some interests</Text>
        )}
        {tags.map((tag, index) => (
          <TouchableOpacity key={index} onPress={() => removeTag(index)}>
            <View style={styles.tag}>
              <Text>{tag}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.activities}>
        <TextInput
          style={styles.input}
          value={tagInput}
          onChangeText={(text) => setTagInput(text)}
          placeholder="Add activities from predefined list"
        />
        <TouchableOpacity onPress={addTag}>
          <View style={styles.addButton}>
            <Text>Add</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Modal isVisible={isModalVisible} style={styles.modal}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCloseButton}>
            <Icon name="close" size={30} color="#007BFF" />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            placeholder="Search interests"
          />
          {filteredCategories.map((category, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => toggleTag(category)}
            >
              <Text style={[styles.modalTag, selectedTags.includes(category) && styles.selectedTag]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  tagBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: 5,
    margin: 5,
    borderRadius: 5,
  },
  selectedTag: {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: 5,
    margin: 5,
    borderRadius: 5,
  },
  activities: {
    marginTop: 10,
  },
  input: {
    padding: 5,
  },
  addButton: {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: 10,
  },
  modal: {
    flex: 1,
    margin: 0,
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  modalTag: {
    padding: 10,
    fontSize: 16,
  },
  placeholder: {
    fontSize: 16,
    color: '#999',
  },
  searchInput: {
    padding: 10,
    marginBottom: 10,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
});