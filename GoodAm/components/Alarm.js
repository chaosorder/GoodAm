import React from "react";
import {View, Text, StyleSheet, Switch} from 'react-native';
import {COLORS} from '../assets/colors';

export const Alarm = (props) => {

    const toggle = () => {
        props.toggle(props.alarmId);
    }

    return (
        <View style={style.alarm}>
            <Text style={style.time}>{props.data.time}</Text>
            <Switch value={props.data.active} onValueChange={toggle}/>
        </View>);
}

const style = StyleSheet.create({
    alarm: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 10,
        padding: 15,
        height: 70,
        margin: 5,
        marginBottom: 7,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: "#fef6c966"
    },
    time: {
        fontSize: 35,
        fontWeight: "200",
    }
});