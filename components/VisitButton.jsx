import {Pressable} from "react-native";
import {Text} from "react-native";
import {useNavigation} from "@react-navigation/native";

export default function VisitButton(props) {
    const navigation = useNavigation()
    return (
        <Pressable>
            <Text style={{fontSize: 20, color: 'white', backgroundColor: 'black',
                padding: 10, margin: 10, borderRadius: 10}}
                  onPress={() => navigation.navigate('Event', {id: props.id})}>
                Visit Memory
            </Text>
        </Pressable>
    )
}