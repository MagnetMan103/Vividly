import {Text, View, Image, FlatList, Pressable, Dimensions, ScrollView} from "react-native";
import {useEffect} from "react";
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import * as Speech from 'expo-speech';

export default function EventScreen({route}) {
    const [event, setEvent] = useState('')
    const [images, setImages] = useState([])
    const navigation = useNavigation()
    const [isOn, setOn] = useState(true)
    const [btnText, setBtnText] = useState('Read Aloud')
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
    const speakAloud = () => {
        if (isOn) {
            Speech.speak(event.description)
            setBtnText('Stop')
        } else {
            Speech.stop()
            setBtnText('Read Aloud')
        }

        setOn(!isOn)
    }
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
                <Pressable onPress={speakAloud}>
                    <Text style={{fontSize: 30, fontWeight: "bold", color: 'white', textAlign: 'center',
                        backgroundColor: '#32CD32'}}>
                        {btnText}</Text>
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
    // TODO fix condition rendering for no image case
    return (

        <View style={{flex: 1}}>
            <ScrollView>
            <View style={{flex: 1, flexDirection: 'row', backgroundColor:'#228B22', alignItems: 'center'}}>
                <Text style={{flex: 1, fontWeight: "bold", fontSize: 30
                    , color: 'white', marginLeft: 10}}>
                    {event.title}</Text>
                <View style={{alignItems: "flex-end", justifyContent: "center"}}>
                    <Text style={{fontWeight: "bold", fontSize: 15, marginRight: 10
                        , color: 'white'}}>{event.time}</Text>
                </View>
            </View>


            <View style={{flex: 8, backgroundColor: 'white'}}>
                <View>

            <FlatList vertical={true}
                      data={images} renderItem={({item}) =>
                <Image source={{ uri: item }} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').width }}/>}/>
                </View>
                <Pressable onPress={speakAloud}>
                    <Text style={{fontSize: 30, fontWeight: "bold", color: 'white', textAlign: 'center',
                        backgroundColor: '#32CD32'}}>
                        {btnText}</Text>
                </Pressable>

                <Text style={{fontSize: 30, marginLeft: 10,
                    fontFamily: 'serif'
                }}>{event.description}</Text>

            </View>
            </ScrollView>


            <Pressable style={{borderWidth: 3, borderColor: 'gray', backgroundColor: 'red', alignItems: 'center'}}
            onPress={deleteMemory}>
                <Text style={{fontSize: 30, fontWeight: "bold"}}>
                    Delete Memory</Text>
            </Pressable>



        </View>
    );
}
