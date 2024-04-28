import {Pressable} from "react-native";
import {Text} from "react-native";
import {useNavigation} from "@react-navigation/native";

export default function VisitStoryButton(props) {
    const navigation = useNavigation()
    return (
        <Pressable>
            <Text style={{fontSize: 25, color: '#023020', backgroundColor: '#ECFFDC', borderWidth: 2,
                padding: 5, marginLeft: 20, borderRadius: 100, fontWeight: 'bold'}}
                  onPress={() => navigation.navigate('GPT')}>
                Story
            </Text>
        </Pressable>
    )
}