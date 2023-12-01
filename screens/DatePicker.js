import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-paper';
import CalendarPicker from 'react-native-calendar-picker';

export default function DatePicker() {
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const openDatePicker = (input) => {
    setCalendarVisible(true);
    // Add logic to handle start and end date selection
    // Use the 'input' parameter to distinguish between start and end date
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

  const saveDates = () => {
    // Add logic to save start and end dates
    console.log('Selected Start Date:', selectedStartDate ? selectedStartDate.toString() : 'Not Selected');
    console.log('Selected End Date:', selectedEndDate ? selectedEndDate.toString() : 'Not Selected');

    // Close the calendar after saving dates
    setCalendarVisible(false);
  };

  const resetDates = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    // setCalendarVisible(false);
  };

  return (
    <View>
      <View style={styles.tagBoxHeader}>
        <Text style={styles.headerText}>Dates</Text>
      </View>
      
      <View style={styles.dateButtonsContainer}>
      <TouchableOpacity style={styles.dateButton} onPress={() => openDatePicker('start')}>
      <Text>
         Start Date:{'\n'}
            {selectedStartDate
              ? `${selectedStartDate.format('DD MMM YYYY')}`
              : 'DD MM YYYY'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.dateButton} onPress={() => openDatePicker('end')}>
        <Text>
          End Date:{'\n'}
            {selectedEndDate ? `${selectedEndDate.format('DD MMM YYYY')}` : 'DD MM YYYY'}
          </Text>
        </TouchableOpacity>
        <View style={styles.divider} />
       
      </View>

        {/* {isCalendarVisible && ( */}
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
        </View>

          <View style={styles.modalFooter}>
            {/* <Button onPress={saveDates} mode="contained" color="#8ecae6" style={styles.saveButton}>
              Save
            </Button> */}
             <Button onPress={resetDates}mode="contained" buttonColor="#8ecae6"  style={{   borderWidth: 1, paddingHorizontal: 8 }} >
                Reset
            </Button>
          
          </View>
      
      {/* // )} */}

    
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
    borderColor: '#023047',
    borderWidth: 1,
    alignItems: 'center',
  },

  modalFooter: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
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

