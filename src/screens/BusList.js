import React from "react";
import { StyleSheet,
    Button,
    View, 
    SafeAreaView, 
    Text, 
    FlatList,
    Alert } from "react-native";
import BusButton from "../component/BusButton";
const DATA = [
    {
        'id': 1,
        'busName': "মাতামুহুরি", 
    },
    {
        'id': 2,
        'busName': "সুরমা", 
    },
    {
        'id': 3,
        'busName': "হালদা", 
    },
    {
        'id': 4,
        'busName': "পদ্মা", 
    },
    {
        'id': 5,
        'busName': "মেঘনা", 
    },
    {
        'id': 6,
        'busName': "যমুনা", 
    },
    {
        'id': 7,
        'busName': "ব্রহ্মপুত্র", 
    },
    {
        'id': 8,
        'busName': "কুশিয়ারা", 
    },

]



const BusList = () => {
    return (
        <SafeAreaView>
            <FlatList
            data={DATA}
            renderItem={({item}) => (
                <View>
                    <BusButton title={item.busName}/>
                </View>
              )}
            numColumns={2}
            keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )   
}

export default BusList;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 5,
        alignments: 'right',
        fontSize: 20,
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    containerStyle: {
        fontSize: 30,
        backgroundColor: 'black'
    }
})
