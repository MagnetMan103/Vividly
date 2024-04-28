import {View, Text, Pressable} from "react-native";
import {useState} from "react";
import {useEffect} from "react";
import {ScrollView} from "react-native";
import * as Speech from 'expo-speech';

export default function GPTScreen() {
    const [responsed, setResponse] = useState("Response from GPT will appear here.")
    const [user_input, setUserInput] = useState("")
    const [isPressable, setIsPressable] = useState(false)
    const [opacit, setOpacit] = useState(1)
    const [opacitw, setOpacitw] = useState(0)
    const system_input = "You are designed to generate a short 'story of my life' from " +
        "given information for alzheimer's patients. Give a creative story told in 2nd person. " +
        "Use months instead of dates."
    useEffect(() => {
        fetch('http://34.145.192.60/api/events/')
            .then((response) => response.json())
            .then((json) => {
                setUserInput(createGPTInput(json));
                console.log(user_input)
                console.log('tried')
            })
            .catch(error => console.error(error));

    }, []);
    const readGPT = () => {
        Speech.speak(responsed)
    }
    const callGPT = () => {
        console.log('will send')
        console.log(user_input)
        if (user_input === "") {
            alert('Please try again')
            return
        }
        setIsPressable(true)
        setOpacit(0)
        setOpacitw(1)
        const GPTData = {
            system_input: system_input,
            user_input: user_input,

        };
        fetch('http://34.145.192.60/api/ai/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(GPTData)
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                setResponse(json.result)
            })
            .catch(error => console.error(error));
    }
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#B9D9EB'}}>
            <Pressable onPress={callGPT} disabled={isPressable}
            style={{backgroundColor:'#1F75FE', opacity:opacit, marginTop: 10,
            padding: 10, borderRadius: 100}}>
                <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'
                }}>Generate Story</Text>
            </Pressable>
            <Pressable onPress={readGPT} disabled={!isPressable}
                       style={{backgroundColor:'#1F75FE', opacity:opacitw,
                           padding: 10, borderRadius: 100}}>
                <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                    Read Text</Text>
            </Pressable>
            <ScrollView>
                <Text style={{fontSize: 30, fontWeight: 'bold', paddingLeft: 3, paddingRight: 3
                }}>Your Story</Text>
                <Text style={{fontSize: 20, paddingLeft: 3, paddingRight: 3}}>
                    {responsed}</Text>
            </ScrollView>

        </View>
        )
}

function createGPTInput(data) {
    let finalString = ""
    let number = 1
    data.events.forEach(event => {
        finalString += `Date:${event.time} Title:${event.title} Description:${event.description}. `
        number++
        console.log(number)
    })
    console.log(finalString)
    return finalString
}