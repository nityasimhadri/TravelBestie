import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-paper';
import CalendarPicker from 'react-native-calendar-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DatePicker() {
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  // useEffect(() => {
  //   const loadDates = async () => {
  //     try {
  //       const startDate = await AsyncStorage.getItem('startDate');
  //       const endDate = await AsyncStorage.getItem('endDate');
  
  //       if (startDate) {
  //         setSelectedStartDate(new Date(JSON.parse(startDate)));
  //       }
  //       if (endDate) {
  //         setSelectedEndDate(new Date(JSON.parse(endDate)));
  //       }
  //     } catch (error) {
  //       console.error("Error loading selected dates: " + error);
  //     }
  //   };
  //   loadDates();
  // }, []);
  
  // useEffect(() => {
  //   const saveStartDates = async () => {
  //     try {
  //       if (selectedStartDate) {
  //         await AsyncStorage.setItem('startDate', JSON.stringify(selectedStartDate));
  //       }
  //     } catch (error) {
  //       console.error("Error saving selected start date: " + error);
  //     }
  //   };
  
  //   saveStartDates();
  // }, [selectedStartDate]);
  
  // useEffect(() => {
  //   const saveEndDates = async () => {
  //     try {
  //       if (selectedEndDate) {
  //         await AsyncStorage.setItem('endDate', JSON.stringify(selectedEndDate));
  //       }
  //     } catch (error) {
  //       console.error("Error saving selected end date: " + error);
  //     }
  //   };
  
  //   saveEndDates();
  // }, [selectedEndDate]);
  
  const resetDates = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };







  const openDatePicker = (input) => {
    setCalendarVisible(true);
  };

const onDateChange = (date, type) => {
  //function to handle the date change
  if (type === "END_DATE") {
    setSelectedEndDate(date);
    
  } else {
    setSelectedEndDate(null);
    setSelectedStartDate(date);
    
  }
};

  const saveDates = async() => {
    // Add logic to save start and end dates
    console.log('Selected Start Date:', selectedStartDate ? selectedStartDate.toString() : 'Not Selected');
    console.log('Selected End Date:', selectedEndDate ? selectedEndDate.toString() : 'Not Selected');
    await AsyncStorage.setItem('startDate', JSON.stringify(selectedStartDate));
    await AsyncStorage.setItem('endDate', JSON.stringify(selectedEndDate));

    // Close the calendar after saving dates
    setCalendarVisible(false);
  };


  return (
    <View>
    
      
      <View style={styles.dateButtonsContainer}>
      <TouchableOpacity style={styles.dateButton} onPress={() => openDatePicker('start')}>
      <Text>
        {console.log("herplze",selectedStartDate,selectedEndDate)}
         Start Date:{'\n'}
            {selectedStartDate
              ? `${selectedStartDate.format('DD MMM YYYY')}`
              : 'DD MM YYYY'}
          </Text>
        </TouchableOpacity>
        <Icon name="arrow-forward" size={24} color="#000" style={styles.arrowIcon} />
        <TouchableOpacity style={styles.dateButton} onPress={() => openDatePicker('end')}>
        <Text>
          End Date:{'\n'}
            {selectedEndDate ? `${selectedEndDate.format('DD MMM YYYY')}` : 'DD MM YYYY'}
          </Text>
        </TouchableOpacity>
        <View style={styles.divider} />
       
      </View>

      {isCalendarVisible && (
  <View style={styles.calendar}>
    <CalendarPicker
      onDateChange={onDateChange}
      selectedStartDate={selectedStartDate}
      selectedEndDate={selectedEndDate}
      minDate={new Date()}
      allowRangeSelection={true}
      selectedDayColor='#FFC0CB'
      selectedDayTextColor="#FFFFFF"
      width={Dimensions.get('window').width * 0.9}
    />
 
  <View style={styles.modalFooter}>

  <Button onPress={resetDates} mode="contained" buttonColor="#8ecae6" style={{ borderWidth: 1, paddingHorizontal: 8 }}>
    Reset
  </Button>
  <Button onPress={saveDates} mode="contained" buttonColor='#023047' style={{ borderWidth: 1, paddingHorizontal: 8 }}>
    Save
  </Button>
</View>
</View>
)}



    
    </View>
  );
}

const styles = StyleSheet.create({
  dateButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10
  },
  calendar: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    // width: '80%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateButton: {
    flex: 1,
    backgroundColor: 'white',
    // backgroundColor: '#023047',
    padding: 10,
    margin: 3,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 0.4,
    alignItems: 'left',
  },

  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    columnGap: 10
  },
  headerText: {
    fontSize: 18,
    fontWeight: 800,
    color: 'black',
  },

  tagBoxHeader: {
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,  // Add this line to create a border
    borderBottomColor: '#ccc', 
  },
});

