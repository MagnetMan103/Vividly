import { StyleSheet, Text, View, Dimensions } from 'react-native';


export default function Header() {
    return(
        <View style={{
            height: 70, backgroundColor: 'green', alignItems: 'left', paddingLeft: 50,
            justifyContent: 'center', borderBottomWidth: 3, borderColor: '#006400'}}>
            <Text style={{fontSize: 30, fontWeight: "bold", color: 'lightgreen'}}>
                Vividly</Text>
        </View>
    )

}