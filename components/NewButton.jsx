import {Pressable, Text, View, Modal, TextInput, Button, Image, FlatList, ScrollView, Dimensions} from "react-native";
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePickerCom from "./DatePickerCom";
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
        props.hookEvent(title, description, date.toLocaleDateString(), ImageList(images))
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
        console.log('hi')
        const currentDate = selectedDate;
        setDateShown(false)
        setDate(currentDate);
    };
    return(
        <View style={{alignItems: 'center'}}>
        <Pressable style={{borderColor: 'black', padding: 3,
            justifyContent: 'center', alignItems: 'center', borderRadius: 100,
        backgroundColor: '#00563B', marginRight: 20}}
                   onPress={() => setModalVisible(true)}>
            <Text style={{fontSize: 25, fontWeight: "bold", color: 'white',
                padding: 5}}>
                  Add</Text>
        </Pressable>


        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}

        >
            <View style={{flex:9}}>
            <ScrollView>
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
                <DatePickerCom/>

            <ImageSelector setImage={addImage}/>
            <FlatList horizontal={true}
                      data={images} renderItem={({item}) => <Image source={{ uri: item }} style={{ width: 75, height: 75 }}/>}/>
            </ScrollView>
            </View>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end',
                justifyContent: 'center', columnGap: 50, marginBottom: 20,
            backgroundColor: 'white'}}>
            <Pressable style={{height: 50, width:70, borderRadius: 20,
                justifyContent: 'center', alignItems: 'center',
                backgroundColor: '#00563B'}}
                       onPress={createEvent}>
                <Text style={{fontWeight: 'bold', fontSize: 20, color:'white'}}>Create</Text>
            </Pressable>
            <Pressable style={{height: 50, width: 70, borderRadius: 20,
                justifyContent: 'center', alignItems: 'center',
                backgroundColor: '#A52A2A'}}
                       onPress={closeTrigger}>
                <Text style={{fontWeight: 'bold', fontSize: 20, color:'white'}}>Cancel</Text>
            </Pressable>
            </View>

        </Modal>
        </View>


    )
}

function ImageList(images) {
    let imageString = ''
    for (let i = 0; i < images.length; i++) {
        imageString += images[i] + ' '
    }
    imageString = imageString.slice(0, -1);
    return imageString
}