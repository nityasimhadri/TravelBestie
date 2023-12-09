import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";

export default function BudgetRangeSlider () {
  const [budgetRange, setBudgetRange] = useState([50, 1000]);
  const [sliderValue, setSliderValue] = useState("");

  const handleValuesChange = (values) => {
    setBudgetRange(values);
    onValuesChange(values);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.budgetButton} >
      <Text>
         Budget Per Day:{'\n'}
         ${sliderValue}
          </Text>
        </TouchableOpacity>
       
      <View style={styles.sliderContainer}>
    
        <Slider
          style={{ width: "100%", height: 40}}
          minimumValue={0}
          maximumValue={1000}
          step={10}
          values={budgetRange}
          onValuesChange={handleValuesChange}
          minimumTrackTintColor="#EE5397"
          maximumTrackTintColor="#FFB668"
          value={sliderValue}
          onValueChange={
            (sliderValue) => setSliderValue(sliderValue)
          }
        />
        <View style={styles.sliderLabels}>
          <Text>${budgetRange[0]}</Text>
          <Text>${budgetRange[1]}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sliderContainer: {
    paddingHorizontal: 20,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  budgetButton: {
    flex: 1,
    backgroundColor: 'white',
    // backgroundColor: '#023047',
    padding: 10,
    margin: 3,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 0.4,
    alignItems: 'left',
    width: '50%'
  },
});

