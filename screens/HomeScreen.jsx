import {FlatList, View} from "react-native";
import Card from "../components/Card";
import NewButton from "../components/NewButton";
import {useState} from "react";
import {useEffect} from "react";
export default function HomeScreen({navigation}) {
    const [events, setEvents] = useState([]);
    const addEvent = (title, description, date, images) => {
        console.log('hi');

        const eventData = {
            title: title,
            time: date,
            description: description,
            images: images
        };

        fetch('http://34.145.192.60/api/events/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Event added:', data);
            })
            .catch(error => {
                console.error('Error adding event:', error);
            });
    }
    useEffect(() => {
        fetch('http://34.145.192.60/api/events/')
            .then((response) => response.json())
            .then((json) => {
                setEvents(json.events);
            })
            .catch(error => console.error(error));

    }, [events]);

    return (
        <View style={{backgroundColor: 'lightblue', flex: 1}}>
            <View>

                <FlatList data={events} renderItem={({item}) =>
                    <Card title={item.title} description={item.description} date={item.time}
                          id={item.id}/>}/>
                <NewButton hookEvent={addEvent}/>
            </View>
        </View>

    );
}