import {Pressable, Text, View, Modal, TextInput} from "react-native";
import React, {useState} from 'react';

export default function NewButton(){
    const [modalVisible, setModalVisible] = useState(false);
    const [text, onChangeText] =useState("")
    const [description, onChangeDescription] =useState("")

    const onPress = () => {
        setModalVisible(true)
    }
    return(
        <View style={{alignItems: 'center'}}>
        <Pressable style={{borderWidth: 3, borderColor: 'gray', width: 200,
            justifyContent: 'center', alignItems: 'center', borderRadius: 100,
        backgroundColor: 'lightgray', height: 50, marginTop: 20, marginBottom: 20}}
                   onPress={onPress}>
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
                       value={text}

            />
            <Text style={{backgroundColor: 'lightgray', fontSize: 50}}>Description:</Text>
            <TextInput style={{backgroundColor: 'lightgray', borderBottomWidth: 2, borderColor: 'gray', fontSize: 25}}
                       placeholder="Type Here"
                       multiline={true}
                       onChangeText={onChangeDescription}
                       value={description}

            />
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end',
                justifyContent: 'center', columnGap: 50, marginBottom: 20}}>
            <Pressable style={{height: 70, width: 70, borderRadius: 100,
                justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgreen'}}
                       onPress={() => alert('Pressed!')}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>Create</Text>
            </Pressable>
            <Pressable style={{height: 70, width: 70, borderRadius: 100,
                justifyContent: 'center', alignItems: 'center', backgroundColor: 'red'}}
                       onPress={() => setModalVisible(false)}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>Cancel</Text>
            </Pressable>
            </View>
        </Modal>
        </View>


    )
}