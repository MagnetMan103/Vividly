import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Dimensions, ScrollView, FlatList} from 'react-native';
import Card from './components/Card';
import Header from './components/Header';
import NewButton from "./components/NewButton";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useState} from "react";
const Stack = createNativeStackNavigator();

function HomeScreen({navigation}) {
    const [events, setEvents] = useState([]);
    const addEvent = (title, description, date) => {
        const id = "id" + Math.random().toString(16).slice(2)
        setEvents([...events, {title: title, description: description,
            date: date, id:id}])
    }
    return (
            <View style={{backgroundColor:'lightblue', flex: 1}}>
                <View>

                    <FlatList data={events} renderItem={({item}) =>
                        <Card title ={item.title} description ={item.description} date={item.date}
                        id={item.id}/>} />
                    <NewButton hookEvent={addEvent}/>
                </View>
            </View>

    );
}
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: true,
            }}>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name={"Event"} component={EventScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

function EventScreen({route}) {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 30}}>Event ID: {route.params.id}</Text>
        </View>
    );
}


