import {Text, View, Image} from "react-native";
import {useEffect} from "react";
import {useState} from "react";
export default function EventScreen({route}) {
    const [event, setEvent] = useState('')

    useEffect(() => {
        fetch(`http://34.145.192.60/api/events/${route.params.id}/`)
            .then((response) => response.json())
            .then((json) => {
                setEvent(json);
            })
            .catch(error => console.error(error));

    }, []);
    return (
        <View style={{flex: 1}}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>{event.title}</Text>
            <Text style={{fontSize: 20}}>{event.time}</Text>
            <Text style={{fontSize: 30}}>{event.description}</Text>

        </View>
    );
}
