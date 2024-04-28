import {Text, View, Image, FlatList} from "react-native";
import {useEffect} from "react";
import {useState} from "react";
export default function EventScreen({route}) {
    const [event, setEvent] = useState('')
    const [images, setImages] = useState([])

    useEffect(() => {
        fetch(`http://34.145.192.60/api/events/${route.params.id}/`)
            .then((response) => response.json())
            .then((json) => {
                setEvent(json);
                setImages(json.images.split(" "))
                // setImages(event.images.split(" "))
            })
            .catch(error => console.error(error));

    }, []);
    return (
        <View style={{flex: 1}}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>{event.title}</Text>
            <Text style={{fontSize: 20}}>{event.time}</Text>
            <Text style={{fontSize: 30}}>{event.description}</Text>
            <FlatList vertical={true}
                      data={images} renderItem={({item}) => <Image source={{ uri: item }} style={{ width: 150, height: 150 }}/>}/>



        </View>
    );
}
