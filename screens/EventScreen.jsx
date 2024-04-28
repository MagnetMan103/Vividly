import {Text, View, Image, FlatList, Pressable} from "react-native";
import {useEffect} from "react";
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";
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
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>{event.title}</Text>
                <Text style={{fontSize: 20}}>{event.time}</Text>
                <Text style={{fontSize: 30}}>{event.description}</Text>
                <Pressable style={{borderWidth: 3, borderColor: 'gray', backgroundColor: 'red'}}
                onPress={deleteMemory}>
                    <Text style={{fontSize: 30, fontWeight: "bold"}}>
                        Delete Memory</Text>
                </Pressable>
            </View>
        )
    }
    return (
        <View style={{flex: 1}}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>{event.title}</Text>
            <Text style={{fontSize: 20}}>{event.time}</Text>
            <Text style={{fontSize: 30}}>{event.description}</Text>
            <FlatList vertical={true}
                      data={images} renderItem={({item}) =>
                <Image source={{ uri: item }} style={{ width: 150, height: 150 }}/>}/>
            <Pressable style={{borderWidth: 3, borderColor: 'gray', backgroundColor: 'red'}}
            onPress={deleteMemory}>
                <Text style={{fontSize: 30, fontWeight: "bold"}}>
                    Delete Memory</Text>
            </Pressable>



        </View>
    );
}
