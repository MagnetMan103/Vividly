import { StyleSheet, Text, View, Dimensions } from 'react-native';
import VisitButton from "./VisitButton";

export default function Card(props) {
    return(
        <View style={{width: Dimensions.get('window').width ,
        paddingBottom: 5, backgroundColor: 'lightblue',
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

