import React, {useState} from 'react';
import { View, FlatList, StyleSheet, ScrollView, Modal } from 'react-native';
import { Button, Searchbar, Text, Icon, Card, IconButton  } from 'react-native-paper';
import QuizScreen from './QuizScreen';
import TagBox from './TagBox';

export default function DashboardScreen({ navigation }) {

  const likedPlaces = require('./LikedPlaces.json');
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const toggleFilterModal = () => {
    setFilterModalVisible(!isFilterModalVisible);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.header}>Your Adventure Dashboard!</Text>
        <View style = {styles.searchContainer}>
          <Searchbar
            placeholder="Enter a location"
            style={styles.searchBar}
          />
          <IconButton
            icon="filter"
            iconColor="white"  // Set the color to white
            size={24}
            style={styles.filterButton}
            onPress={toggleFilterModal}
            // onPress={() => {
            //   // Handle filter button press
            //   console.log('Filter button pressed');
            // }}
          />
       
            </View>
            <Modal
              visible={isFilterModalVisible}
              animationType="slide"
              transparent={true}
              onRequestClose={toggleFilterModal}
            >
              <View style={styles.modalContainer}>
              <IconButton
                icon="close"
                color="black"
                size={24}
                style={styles.closeButton}
                onPress={toggleFilterModal}
              />
                <View style={styles.modalContent}>
                  <TagBox></TagBox>
                  {/* <QuizScreen/> */}

                </View>
              </View>
            </Modal>
        </View>
        <View style={styles.subtextContainer}>
           <Text style={styles.sectionHeader}>Recommended Places For You</Text>
          <FlatList
            horizontal={true}
            data={likedPlaces}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Card mode="contained" style={styles.card} elevation={0}>
                <Card.Cover source={require("../assets/snorkeling.avif")} style={styles.cardCover} />
                <Card.Content style={styles.cardContent}>
                  <Text style={styles.cardText}>{item.name}</Text>
                </Card.Content>
              </Card>
            )}
          />
        </View>
      

      <View style={styles.subtextContainer}>
           <Text style={styles.sectionHeader}>Browse by Category</Text>
          <FlatList
            horizontal={true}
            data={likedPlaces}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Card mode="contained" style={styles.card} elevation={0}>
                <Card.Cover source={require("../assets/sunbathing.jpeg")} style={styles.cardCover} />
                <Card.Content style={styles.cardContent}>
                  <Text style={styles.cardText}>{item.name}</Text>
                </Card.Content>
              </Card>
            )}
          />
        </View>

     
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  textContainer: {
    top: 30,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'top',
    alignItems: 'left',
    paddingHorizontal: 30
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems:'center'
  },
  header: {
    fontSize: 40,
    fontFamily: 'AppleSDGothicNeo-Regular',
    fontWeight: '100',
    color: 'black',
  },
    subtextContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start', // Change 'left' to 'flex-start'
    paddingTop: 50,
    justifyContent: 'flex-start', // Change 'top' to 'flex-start'
    alignItems: 'flex-start', // Change 'left' to 'flex-start'
    paddingLeft: 30
  },
  section: {
    backgroundColor: 'white',
    borderTopRightRadius: 20,  
    borderTopLeftRadius: 20,  
    padding: 16,
    top: 40,
    borderColor: '#fb8500',
    borderWidth: 1
  },
  filterButton: {
    backgroundColor: '#FFB668',
    borderRadius: 10,
    height: 50,
    width: 50
  },
  sectionHeader: {
    fontFamily: 'AppleSDGothicNeo-Regular',
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  sectionText: {
    fontFamily: 'AppleSDGothicNeo-Regular',
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'white',
  },
   searchBar: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: '85%',
    borderWidth: 0.3,
    borderColor: 'gray',
    height: 50
  },
  card: {
    width: 140,
    margin: 10,
    height: 180,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  cardCover: {
    height: 160,
  },
  cardContent: {
    paddingTop: 10,
    flexDirection: 'column',
    alignItems: 'flex-start', // Change 'left' to 'flex-start'
  },
  cardText: {
    fontFamily: 'AppleSDGothicNeo-Regular',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent backdrop
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  

});
