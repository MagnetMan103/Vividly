import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native';
import Card from './components/Card';
import Header from './components/Header';
import NewButton from "./components/NewButton";
export default function App() {
  return (

    <View style={styles.container}>
      <Header/>
      <ScrollView>
        <NewButton/>
      </ScrollView>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
