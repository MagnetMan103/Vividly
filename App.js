import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Dimensions, ScrollView, FlatList} from 'react-native';
import Card from './components/Card';
import Header from './components/Header';
import NewButton from "./components/NewButton";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useState} from "react";
import HomeScreen from "./screens/HomeScreen";
import EventScreen from "./screens/EventScreen";
import createNativeBottomTabNavigator from "@react-navigation/bottom-tabs/src/navigators/createBottomTabNavigator";
import GPTScreen from "./screens/GPTScreen";

const Stack = createNativeStackNavigator();
const Tab = createNativeBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="GPT" component={GPTScreen} />
        </Tab.Navigator>
    );
}
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name={"Event"} component={EventScreen}/>
                <Stack.Screen name={"GPT"} component={GPTScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}



