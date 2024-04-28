import * as ImagePicker from "expo-image-picker";
import {Button, Pressable, Text} from "react-native";
export default function ImageSelector(props) {
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });
        if (!result.canceled) {
            props.setImage(result.assets[0].uri)
        }

    };
    return (
        <Pressable onPress={pickImage} >
            <Text style={{fontSize:50, backgroundColor: 'blue', color: 'white', textAlign: 'center',
                borderBottomWidth: 3, borderColor: 'gray'}}>
                Add Images
            </Text>
        </Pressable>
    );
}