import {Pressable} from "react-native";
import {Text} from "react-native";
import {useNavigation} from "@react-navigation/native";

export default function VisitStoryButton(props) {
    const navigation = useNavigation()
    return (
        <Pressable>
            <Text style={{fontSize: 25, color: 'white', backgroundColor: '#00563B',
                padding: 8, marginLeft: 20, borderRadius: 100, fontWeight: 'bold'}}
                  onPress={() => navigation.navigate('GPT')}>
                Story
            </Text>
        </Pressable>
    )
}