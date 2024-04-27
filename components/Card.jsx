import { StyleSheet, Text, View, Dimensions } from 'react-native';


export default function Card(props) {
    return(
        <View style={{width: Dimensions.get('window').width ,
        height: 150, backgroundColor: 'lightblue', alignItems: 'center',
        justifyContent: 'center', borderBottomWidth: 3, borderColor: 'black'}}>
            <Text>{props.title}</Text>
            <Text>{props.description}</Text>
        </View>
    )

}

