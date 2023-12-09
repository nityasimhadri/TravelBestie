import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Ionicons";
import { Button } from "react-native-paper";

export default function Travelers() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [travelerNumber, setTravelerNumber] = useState(1);
  const [travelerAge, setTravelerAge] = useState("");
  const [travelers, setTravelers] = useState([
    {
      number: 1,
      age: "",
      room: 1,
    },
  ]);

  const [roomNumber, setRoomNumber] = useState(1);
  const [rooms, setRooms] = useState([
    {
      number: 1,
      guests: 1,
      travelers: [{ number: 1, age: "", room: roomNumber }],
    },
  ]);

  const addTraveler = (roomNum) => {
    // Find the room corresponding to the provided roomNum
    const selectedRoom = rooms.find((room) => room.number === roomNum);

    if (selectedRoom) {
      const newTraveler = {
        number: selectedRoom.guests + 1, // Set number to the next available guest number
        age: travelerAge,
        room: roomNum,
      };

      setTravelers([...travelers, newTraveler]);
      setTravelerNumber(travelerNumber + 1);
      setTravelerAge("");

      // Update room travelers
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.number === roomNum
            ? {
                ...room,
                guests: room.guests + 1,
                travelers: [...room.travelers, newTraveler],
              }
            : room
        )
      );

      // console.log("rooms", rooms);
    }
  };

  const updateTravelerAge = (number, newAge) => {
    setTravelers((prevTravelers) =>
      prevTravelers.map((traveler) =>
        traveler.number === number ? { ...traveler, age: newAge } : traveler
      )
    );
  };

  const deleteTraveler = (roomNum, number) => {
    {console.log(roomNum,number)}
    setTravelers((prevTravelers) =>
      prevTravelers.filter(
        (traveler) => traveler.number !== number || traveler.room !== roomNum
      )
    );

    setTravelerNumber(travelerNumber - 1);

    // Update room travelers and guests count
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.number === roomNum
          ? {
              ...room,
              guests: room.guests - 1,
              travelers: room.travelers.filter(
                (traveler) => traveler.number !== number
              ),
            }
          : room
      )
    );

    // console.log("after delete", rooms);
  };

  const addRoom = () => {
    // console.log("before room", travelers);
    const newRoom = {
      number: roomNumber + 1,
      guests: 1,
      travelers: [{ number: 1, age: "", room: roomNumber + 1 }],
    };

    setRooms([...rooms, newRoom]);
    setRoomNumber(roomNumber + 1);
    setTravelers([...travelers, newRoom.travelers[0]]);
    // addTraveler(roomNumber + 1)
    // console.log("after room", travelers);
    // console.log(rooms);
  };

    const deleteRoom = (roomNum) => {
    console.log(travelers)
    travelers.forEach((traveler) => {
      console.log("traveler", traveler)
      if (traveler.room === roomNum) {
        deleteTraveler(roomNum, traveler.number);
      }
    });

    // Remove the room from rooms and decrement the room number for each room
    setRooms((prevRooms) =>
      prevRooms
        .filter((room) => room.number !== roomNum)
        .map((room) => ({
          ...room,
          number: room.number > roomNum ? room.number - 1 : room.number,
        }))
    );
    setRoomNumber(roomNumber - 1);

    console.log("HERE", travelers)
  };

  return (
    <View>
      <ScrollView contentContainerStyle={styles.tagBox}>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text>
            Travelers:{"\n"}
            {travelers.length}{" "}
            {travelers.length === 1 ? "Traveler, " : "Travelers, "}
            {rooms.length} {rooms.length === 1 ? "Room" : "Rooms"}
          </Text>
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
              <Text style={styles.modalHeaderText}>
                Total Travelers: {travelers.length}
              </Text>
            </View>
          </View>
          <ScrollView contentContainerStyle={styles.rooms}>
            
            {rooms.map((room) => (
              <View key={room.number} style={styles.rooms}>
                <View style={styles.roomsHeader}>
                <Text style={styles.roomText}>
                  {" "}
                  Room {room.number}{" "}
                  {room.number > 1 ? (
                    <>
                      {" "}
                      <TouchableOpacity onPress={() => deleteRoom(room.number)}>
                        <Icon
                          name="trash"
                          size={20}
                          color="#8ecae6"
                          style={styles.deleteIcon}
                        />
                      </TouchableOpacity>{" "}
                    </>
                  ) : null}
                </Text>
                </View>
                <View style={styles.travelers}>
                  {room.travelers.map((filteredTraveler) => (
                    <View
                      key={filteredTraveler.number}
                      style={styles.travelerTag}
                    >
                      <Text>
                        {filteredTraveler.number > 1 &&
                        filteredTraveler.number !== room.travelers[0].number ? (
                          <>
                            <TouchableOpacity
                              onPress={() =>
                                deleteTraveler(
                                  room.number,
                                  filteredTraveler.number
                                )
                              }
                            >
                              <Icon
                                name="trash"
                                size={20}
                                color="black"
                                style={styles.deleteIcon}
                              />
                            </TouchableOpacity>{" "}
                          </>
                        ) : null}
                        Traveler {filteredTraveler.number}
                      </Text>
                      <TextInput
                        style={styles.ageInput}
                        placeholder="Enter Age"
                        onChangeText={(text) =>
                          updateTravelerAge(filteredTraveler.number, text)
                        }
                      />
                    </View>
                  ))}
                </View>
                <TouchableOpacity
                  style={styles.addTravelerButton}
                  onPress={() => addTraveler(room.number)}
                >
                  <Text style={styles.addButtonText}>Add Traveler</Text>
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity style={styles.addButton} onPress={addRoom}>
              <Text style={styles.addButtonText}>Add Room</Text>
            </TouchableOpacity>
          </ScrollView>

          <View style={styles.modalFooter}>
            <Button
              onPress={() => {
                setModalVisible(false);
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
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
// } from "react-native";
// import Modal from "react-native-modal";
// import Icon from "react-native-vector-icons/Ionicons";
// import { Button } from "react-native-paper";

// export default function Travelers() {
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [travelerNumber, setTravelerNumber] = useState(1);
//   const [travelerAge, setTravelerAge] = useState("");
//   const [travelers, setTravelers] = useState([
//     {
//       number: 1,
//       age: "",
//       room: 1,
//     },
//   ]);

//   const [roomNumber, setRoomNumber] = useState(1);
//   const [rooms, setRooms] = useState([
//     {
//       number: 1,
//       guests: 1,
//       roomTravelers: [1],
//     },
//   ]);

//   const addTraveler = (roomNum) => {
//     const newTraveler = {
//       number: travelerNumber + 1,
//       age: travelerAge,
//       room: roomNum,
//     };

//     setTravelers([...travelers, newTraveler]);
//     setTravelerNumber(travelerNumber + 1);
//     setTravelerAge("");
//     updateRoomGuests(roomNumber, travelerNumber + 1)
//     console.log("rooms",rooms);
//   };

//   const updateTravelerAge = (number, newAge) => {
//     setTravelers((prevTravelers) =>
//       prevTravelers.map((traveler) =>
//         traveler.number === number ? { ...traveler, age: newAge } : traveler
//       )
//     );
//   };

//   const deleteTraveler = (roomNum, number) => {
//     setTravelers((prevTravelers) =>
//       prevTravelers.filter((traveler) => traveler.number !== number)
//     );

//     setTravelerNumber(travelerNumber - 1);

//     // console.log("before", travelers)

//     // Decrement the number of travelers greater than the input number
//     setTravelers((prevTravelers) =>
//       prevTravelers.map((traveler) =>
//         traveler.number > number
//           ? { ...traveler, number: traveler.number - 1 }
//           : traveler
//       )

//     );

//     deleteRoomGuest(number)

//     setRooms((prevRooms) =>
//     prevRooms.map((room) =>
//       room.number === roomNum ? { ...room, guests: room.guests - 1} : room
//     )
//   );

//     console.log("after delete", rooms);
//   };

//   const addRoom = () => {
//     const newRoom = {
//       number: roomNumber + 1,
//       guests: 1,
//       roomTravelers: []
//     };

//     setRooms([...rooms, newRoom]);
//     setRoomNumber(roomNumber + 1);
//     addTraveler(roomNumber + 1)
//     console.log(rooms);
//   };

//   const updateRoomGuests = (number, travelNumber) => {
//     setRooms((prevRooms) =>
//       prevRooms.map((room) =>
//         room.number === number ? { ...room, guests: room.guests + 1, roomTravelers: [...room.roomTravelers, travelNumber] } : room
//       )
//     );
//   };

//   const deleteRoomGuest = (number) => {
//     setRooms((prevRooms) =>
//       prevRooms.map((room) => ({
//         ...room,
//         roomTravelers: room.roomTravelers.map((val) =>
//           val > number ? val - 1 : val
//         ),
//       }))
//     );
//   };

//   const deleteRoom = (roomNum) => {
//     console.log("HERE1", rooms)
//     // Iterate through travelers in the given room and call deleteTraveler on each one
//     travelers.forEach((traveler) => {
//       if (traveler.room === roomNum) {
//         deleteTraveler(roomNum, traveler.number);
//       }
//     });

//     // Remove the room from rooms and decrement the room number for each room
//     setRooms((prevRooms) =>
//       prevRooms
//         .filter((room) => room.number !== roomNum)
//         .map((room) => ({
//           ...room,
//           number: room.number > roomNum ? room.number - 1 : room.number,
//         }))
//     );
//     setRoomNumber(roomNumber - 1);

//     console.log("HERE", rooms)
//   };

//   return (
//     <View>
//       <ScrollView contentContainerStyle={styles.tagBox}>
//         <TouchableOpacity
//           style={styles.searchButton}
//           onPress={() => {
//             setModalVisible(true);
//           }}
//         >
//           <Text>
//             Travelers:{"\n"}
//             {travelers.length}{" "}
//             {travelers.length === 1 ? "Traveler, " : "Travelers, "}
//             {rooms.length} {rooms.length === 1 ? "Room" : "Rooms"}
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>

//       <Modal isVisible={isModalVisible} style={styles.modal}>
//         <View style={styles.modalContent}>
//           <View style={styles.modalHeader}>
//             <TouchableOpacity
//               onPress={() => setModalVisible(false)}
//               style={styles.modalCloseButton}
//             >
//               <Icon name="close" size={30} color="#8ecae6" />
//             </TouchableOpacity>
//             <View style={styles.modalSubheader}>
//               <Text style={styles.modalHeaderText}>Travelers</Text>
//             </View>
//           </View>
//           <ScrollView>
//             {rooms.map((room) => (
//               <View key={room.number} style={styles.roomContainer}>
//                 <Text style={styles.roomText}>   Room {room.number} { room.number > 1 ? (<> <TouchableOpacity
//                                 onPress={() =>
//                                   deleteRoom(room.number)
//                                 }
//                               >
//                                 <Icon
//                                   name="trash"
//                                   size={20}
//                                   color="#8ecae6"
//                                   style={styles.deleteIcon}
//                                 />
//                               </TouchableOpacity>{" "} </> ) : null}
//                               </Text>
//                 <View style={styles.travelers}>

//                   {travelers
//                     .filter((traveler) => traveler.room === room.number)
//                     .map((filteredTraveler) => (
//                       <View
//                         key={filteredTraveler.number}
//                         style={styles.travelerTag}
//                       >
//                         <Text>
//                           {
//                           filteredTraveler.number > 1  && filteredTraveler.number !== room.roomTravelers[0] ? (
//                             <>
//                               <TouchableOpacity
//                                 onPress={() =>
//                                   deleteTraveler(room.number, filteredTraveler.number)
//                                 }
//                               >
//                                 <Icon
//                                   name="trash"
//                                   size={20}
//                                   color="black"
//                                   style={styles.deleteIcon}
//                                 />
//                               </TouchableOpacity>{" "}
//                             </>
//                           ) : null}
//                           Traveler {filteredTraveler.number}
//                         </Text>
//                         <TextInput
//                           style={styles.ageInput}
//                           placeholder="Enter Age"
//                           onChangeText={(text) =>
//                             updateTravelerAge(
//                               filteredTraveler.number,
//                               text
//                             )
//                           }
//                         />
//                       </View>
//                     ))}
//                 </View>
//                 <TouchableOpacity
//                   style={styles.addButton}
//                   onPress={() => addTraveler(room.number)}
//                 >
//                   <Text style={styles.addButtonText}>Add Traveler</Text>
//                 </TouchableOpacity>
//               </View>
//             ))}
//             <TouchableOpacity style={styles.addButton} onPress={addRoom}>
//               <Text style={styles.addButtonText}>Add Room</Text>
//             </TouchableOpacity>
//           </ScrollView>

//           <View style={styles.modalFooter}>
//             <Button
//               onPress={() => {
//                 setModalVisible(false), console.log(travelers);
//               }}
//               mode="contained"
//               buttonColor="#8ecae6"
//               style={{
//                 borderWidth: 1,
//                 paddingHorizontal: 20,
//                 width: "60%",
//                 borderRadius: 15,
//               }}
//             >
//               Save
//             </Button>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  tagBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 10,
  },
  selectedTag: {
    backgroundColor: "#634490",
    color: "black",
    padding: 7,
    margin: 5,
    // borderRadius: 15,
    // borderColor: '#FED9A2',
    borderWidth: 1,
    overflow: "hidden",
  },
  addTagButton: {
    backgroundColor: "#FE4E4E",
    color: "white",
    padding: 7,
    margin: 5,
    // borderRadius: 15,
    // borderColor: '#023047',
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
    // borderColor: 'gray',
    // borderWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    // overflow: 'hidden',
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
  searchButton: {
    flex: 1,
    backgroundColor: "white",
    // backgroundColor: '#023047',
    padding: 10,
    margin: 3,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 0.4,
    alignItems: "left",
  },
  addButton: {
    backgroundColor: "#023047",
    // backgroundColor: "#FE4E4E",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center'
  },
  addTravelerButton: {
    // backgroundColor: "#023047",
    backgroundColor: "#FE4E4E",
    padding: 10,
    width: '30%',
    borderRadius: 10,
    marginBottom: 20,
  },
  addButtonText: {
    color: "white",
    // fontSize: 18,
  },
  roomText: {
    color: "#023047",
    fontSize: 18,
  },

  travelerTag: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f2e3e5",
    // backgroundColor: "#E6E8E3",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  ageInput: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#023047",
    borderRadius: 5,
    padding: 8,
    marginLeft: 10,
  },
  rooms: {
    flexDirection: "column",
    rowGap: 10,
    // paddingTop: 10,
  },
  travelers: {
    flexDirection: "column",
    rowGap: 10,
  },
  roomsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1, // Add this line to create a border
    borderBottomColor: "#ccc",
    paddingBottom: 10
  },
});
