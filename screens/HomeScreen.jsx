import {FlatList, View, ScrollView, Text} from "react-native";
import Card from "../components/Card";
import NewButton from "../components/NewButton";
import VisitStoryButton from "../components/VisitStoryButton";
import NavigationBar from 'react-native-navbar';
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
            <View style={{flex:1}}>

                <FlatList data={events} renderItem={({item}) =>
                    <Card title={item.title} description={item.description} date={item.time}
                          id={item.id}/>}/>
                <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: "#98FB98", borderTopWidth: 2,

                }}>
                    <View style={{}}>
                    <VisitStoryButton navigation={navigation}/>
                    </View>
                    <View style={{flex: 3, alignItems: 'flex-end', marginRight: 10}}>
                        <Text style={{
                            fontSize: 40, fontWeight: 'bold', color:'#023020'
                        }}>Vividly</Text>
                    </View>

                    <View style={{flex: 2, alignItems: 'flex-end', marginRight: 10}}>
                    <NewButton hookEvent={addEvent}/>
                    </View>
                </View>
            </View>
        </View>

    );
}