import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Dimensions, ScrollView, FlatList} from 'react-native';
import Card from './components/Card';
import Header from './components/Header';
import NewButton from "./components/NewButton";
import {useState} from "react";
export default function App() {
    const [events, setEvents] = useState([]);
    const addEvent = (title, description) => {
        setEvents([...events, {title: title, description: description}])
    }
    return (
    <View style={{backgroundColor:'lightblue', flex: 1}}>
    <View>
      <Header/>
          <FlatList data={events} renderItem={({item}) =>
              <Card title ={item.title} description ={item.description}/>} />
        <NewButton hookEvent={addEvent}/>



    </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
