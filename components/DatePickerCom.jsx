import DateTimePicker from "@react-native-community/datetimepicker";
import {useState} from "react";
import {Pressable, Text, View} from "react-native";

export default function DatePickerCom() {
    const [date, setDate] = useState(new Date())
    const [dateShown, setDateShown] = useState(false)
    const onChangeDate= (event, selectedDate) => {
        console.log(selectedDate)
        const currentDate = selectedDate;
        setDateShown(false)
        setDate(currentDate);
    };
    return (
        <View>
            <Pressable onPress={() => setDateShown(true)}>
                <Text style={{fontSize:50, backgroundColor: 'lightgray'}}>Date:</Text>
                <Text style={{fontSize: 30, backgroundColor: 'lightgray', borderBottomWidth: 2, borderColor: 'gray'
                }}>{date.toLocaleDateString()}</Text>
            </Pressable>
            {dateShown && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode='date'
                    is24Hour={true}
                    display="default"
                    onChange={onChangeDate}
                />
            )}
        </View>
    )
}