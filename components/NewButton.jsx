import {Pressable, Text, View, Modal, TextInput} from "react-native";
import React, {useState} from 'react';
import Card from "./Card";
export default function NewButton(props){
    const [modalVisible, setModalVisible] = useState(false);
    const [title, onChangeText] =useState("")
    const [description, onChangeDescription] =useState("")


    const createEvent = () => {
        props.hookEvent(title, description)
        setModalVisible(false)
        onChangeText("")
        onChangeDescription("")
    }

    const closeTrigger = () => {
        setModalVisible(false)
        onChangeText("")
        onChangeDescription("")
    }
    return(
        <View style={{alignItems: 'center'}}>
        <Pressable style={{borderWidth: 3, borderColor: 'gray', width: 200,
            justifyContent: 'center', alignItems: 'center', borderRadius: 100,
        backgroundColor: 'lightgray', height: 50, marginTop: 20, marginBottom: 20}}
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