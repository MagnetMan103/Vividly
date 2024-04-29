import {Pressable, Text, View, Modal, TextInput, Button, Image, FlatList} from "react-native";
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImageSelector from "./ImageSelector";


export default function NewButton(props){
    const [modalVisible, setModalVisible] = useState(false);
    const [title, onChangeText] =useState("")
    const [description, onChangeDescription] =useState("")
    const [date, setDate] =useState(new Date())
    const [dateShown, setDateShown] = useState(false)
    const [images, setImages] = useState([])


    const createEvent = () => {
        if (title === "" || description === "") {
            alert("Please fill out title and description")
            return
        }
        props.hookEvent(title, description, date.toLocaleDateString())
        setModalVisible(false)
        onChangeText("")
        onChangeDescription("")
        setDate(new Date())
        setImages([])
    }

    const addImage = (image) => {
        setImages([...images, image])
    }

    const closeTrigger = () => {
        setModalVisible(false)
        onChangeText("")
        onChangeDescription("")
        setDate(new Date())
        setImages([])
    }
    const onChangeDate= (event, selectedDate) => {
        const currentDate = selectedDate;
        setDateShown(false);
        setDate(currentDate);
    };
    return(
        <View style={{alignItems: 'center'}}>
            <Pressable style={{borderWidth: 3, borderColor: 'gray', width: 200,
                justifyContent: 'center', alignItems: 'center', borderRadius: 100,
                backgroundColor: 'lightgray', height: 50, marginTop: 20, marginBottom: 20,
                position: 'absolute'}}
                       onPress={() => setModalVisible(true)}>
                <Text style={{fontSize: 30, fontWeight: "bold", color: 'gray'}}>
                    Add Event</Text>
            </Pressable>


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <Text style={{backgroundColor: 'lightgray', fontSize: 50}}>Event Name:</Text>
                <TextInput style={{backgroundColor: 'lightgray', borderBottomWidth: 2, borderColor: 'gray', fontSize: 25}}
                           placeholder="Type Here"
                           multiline={true}
                           onChangeText={onChangeText}
                           value={title}

                />
                <Text style={{backgroundColor: 'lightgray', fontSize: 50}}>Description:</Text>
                <TextInput style={{backgroundColor: 'lightgray', borderBottomWidth: 2, borderColor: 'gray', fontSize: 25}}
                           placeholder="Type Here"
                           multiline={true}
                           onChangeText={onChangeDescription}
                           value={description}

                />
                <Pressable onPress={() => setDateShown(true)}>
                    <Text style={{fontSize:50, backgroundColor: 'lightgray'}}>Date:</Text>
                    <Text style={{fontSize: 30, backgroundColor: 'lightgray', borderBottomWidth: 2, borderColor: 'gray'
                    }}>{date.toLocaleDateString()}</Text>
                </Pressable>
                {dateShown && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={'date'}
                        is24Hour={true}
                        display={"spinner"}
                        onChange={onChangeDate}
                    />
                )}
                <ImageSelector setImage={addImage}/>
                <FlatList horizontal={true}
                          data={images} renderItem={({item}) => <Image source={{ uri: item }} style={{ width: 75, height: 75 }}/>}/>

                <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end',
                    justifyContent: 'center', columnGap: 50, marginBottom: 20,
                    backgroundColor: 'white'}}>
                    <Pressable style={{height: 70, width: 70, borderRadius: 100,
                        justifyContent: 'center', alignItems: 'center',
                        backgroundColor: 'lightgreen', borderWidth: 1}}
                               onPress={createEvent}>
                        <Text style={{fontWeight: 'bold', fontSize: 20}}>Create</Text>
                    </Pressable>
                    <Pressable style={{height: 70, width: 70, borderRadius: 100,
                        justifyContent: 'center', alignItems: 'center',
                        backgroundColor: 'red', borderWidth: 1}}
                               onPress={closeTrigger}>
                        <Text style={{fontWeight: 'bold', fontSize: 20}}>Cancel</Text>
                    </Pressable>
                </View>
            </Modal>
        </View>


    )
}