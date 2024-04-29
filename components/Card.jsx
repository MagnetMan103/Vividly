import { StyleSheet, Text, View, Dimensions } from 'react-native';
import VisitButton from "./VisitButton";
import {useEffect} from "react";
import {useState} from "react";
import {Image} from "react-native";
export default function Card(props) {
    const [image, setImage] = useState("");
    useEffect(() => {
        fetch(`http://34.145.192.60/api/events/${props.id}/`)
            .then((response) => response.json())
            .then((json) => {
                setImage(json.images.split(" ")[0])
                // setImages(event.images.split(" "))
            })
            .catch(error => console.error(error));

    }, []);
    if (image === "") {
        return (
            <View style={{width: Dimensions.get('window').width ,
                paddingBottom: 5, backgroundColor: 'white',
            }}>
                <View style={{flex: 1, flexDirection: 'row', backgroundColor:'blue'}}>
                    <Text style={{flex: 1, fontWeight: "bold", fontSize: 30
                        , color: 'white', marginLeft: 10}}>
                        {props.title}</Text>
                    <View style={{alignItems: "flex-end", justifyContent: "center"}}>
                        <Text style={{fontWeight: "bold", fontSize: 15, marginRight: 10
                            , color: 'white'}}>{props.date}</Text>
                    </View>
                </View>
                <View style={{alignItems: "center", flex:1}}>
                    <Text style={{fontSize: 25}}>{props.description}</Text>
                    <VisitButton id={props.id} navigation={props.navigation}/>
                </View>
            </View>
        )
    }
    return(
        <View style={{width: Dimensions.get('window').width ,
        paddingBottom: 5, backgroundColor: 'white',
             }}>
            <View style={{flex: 1, flexDirection: 'row', backgroundColor:'#1CAC78'}}>
            <Text style={{flex: 1, fontWeight: "bold", fontSize: 30
            , color: 'white', marginLeft: 10, fontFamily: 'monospace'}}>
                {props.title}</Text>
                <View style={{alignItems: "flex-end", justifyContent: "center"}}>
            <Text style={{fontWeight: "bold", fontSize: 15, marginRight: 10
                , color: 'white'}}>{props.date}</Text>
                </View>
            </View>
            <View style={{alignItems: "center", flex:1}}>

                <Image source={{ uri: image }} style={{ width: Dimensions.get('window').width - 20
                    , height: Dimensions.get('window').width - 20, marginTop: 10, borderRadius: 10}}/>
                <Text style={{fontSize: 25, color:'black', fontFamily: 'serif', padding: 4}}>{props.description}</Text>
            <VisitButton id={props.id} navigation={props.navigation}/>
            </View>
        </View>
    )

}

