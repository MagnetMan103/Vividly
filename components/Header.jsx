import { StyleSheet, Text, View, Dimensions } from 'react-native';


export default function Header() {
    return(
        <View style={{width: Dimensions.get('window').width,
            height: 75, backgroundColor: 'green', alignItems: 'center',
            justifyContent: 'center', borderTopWidth: 5, borderColor: 'black'}}>
            <Text style={{fontSize: 40, fontWeight: "bold", color: 'lightgreen'}}>
                Vividly</Text>
        </View>
    )

}