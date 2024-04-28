import {Text, View, Image, FlatList, Pressable, Dimensions} from "react-native";
import {useEffect} from "react";
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import * as Speech from 'expo-speech';

export default function EventScreen({route}) {
    const [event, setEvent] = useState('')
    const [images, setImages] = useState([])
    const navigation = useNavigation()
    useEffect(() => {
        fetch(`http://34.145.192.60/api/events/${route.params.id}/`)
            .then((response) => response.json())
            .then((json) => {
                setEvent(json);
                if (json.images !== "") {
                    setImages(json.images.split(" "))
                }
                // setImages(event.images.split(" "))
            })
            .catch(error => console.error(error));

    }, []);
    const deleteMemory = () => {
        fetch(`http://34.145.192.60/api/events/${event.id}/`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete memory');
                }
                return response.json();
            })
            .then(data => {
                console.log('Memory deleted successfully:', data);
                navigation.navigate('Home')
                // Optionally, you can perform further actions after deletion
            })
            .catch(error => {
                console.error('Error deleting memory:', error);
            });
    }
    if (images === []) {
        alert('no images')
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1, flexDirection: 'row', backgroundColor:'blue', alignItems: 'center'}}>
                    <Text style={{flex: 1, fontWeight: "bold", fontSize: 30
                        , color: 'white', marginLeft: 10}}>
                        {event.title}</Text>
                    <View style={{alignItems: "flex-end", justifyContent: "center"}}>
                        <Text style={{fontWeight: "bold", fontSize: 15, marginRight: 10
                            , color: 'white'}}>{event.time}</Text>
                    </View>
                </View>
                <Pressable onPress={() => Speech.speak(event.description)}>
                    <Text style={{fontSize: 30, fontWeight: "bold", color: '#B9D9EB', textAlign: 'center', backgroundColor: '#318CE7'}}>
                        Read Description</Text>
                </Pressable>
                <Text style={{fontSize: 30}}>{event.description}</Text>
                <Pressable
                onPress={deleteMemory}>
                    <Text style={{fontSize: 30, fontWeight: "bold", borderWidth: 3, borderColor: 'gray', backgroundColor: 'blue', alignItems: 'center'}}>
                        Delete Memory</Text>
                </Pressable>
            </View>
        )
    }
    return (
        <View style={{flex: 1}}>
            <View style={{flex: 1, flexDirection: 'row', backgroundColor:'blue', alignItems: 'center'}}>
                <Text style={{flex: 1, fontWeight: "bold", fontSize: 30
                    , color: 'white', marginLeft: 10}}>
                    {event.title}</Text>
                <View style={{alignItems: "flex-end", justifyContent: "center"}}>
                    <Text style={{fontWeight: "bold", fontSize: 15, marginRight: 10
                        , color: 'white'}}>{event.time}</Text>
                </View>
            </View>
            <Pressable onPress={() => Speech.speak(event.description)}>
                <Text style={{fontSize: 30, fontWeight: "bold", color: '#B9D9EB', textAlign: 'center',
                    backgroundColor: '#318CE7'}}>
                    Read Description</Text>
            </Pressable>
            <View style={{flex: 8}}>
            <Text style={{fontSize: 30, marginLeft: 10, borderBottomWidth: 2
            }}>{event.description}</Text>
            <FlatList vertical={true}
                      data={images} renderItem={({item}) =>
                <Image source={{ uri: item }} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').width }}/>}/>
            </View>
            <Pressable style={{borderWidth: 3, borderColor: 'gray', backgroundColor: 'red', alignItems: 'center'}}
            onPress={deleteMemory}>
                <Text style={{fontSize: 30, fontWeight: "bold"}}>
                    Delete Memory</Text>
            </Pressable>



        </View>
    );
}
