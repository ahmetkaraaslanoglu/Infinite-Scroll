import React, { useEffect, useState } from "react";
import {View, Text, FlatList, Image, StyleSheet, ActivityIndicator, StatusBar, TextInput} from 'react-native';
import axios from "axios";

const App = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [search,setSearch] = useState('');

    const getUsers = () => {
        setIsLoading(true);
        axios.get(`https://randomuser.me/api/?page=${currentPage}&results=10`)
            .then(res => {
                //setUsers(res.data.results);
                setUsers([...users, ...res.data.results]);
                setIsLoading(false);
            });
    };

    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemWrapperStyle}>
                <Image style={styles.itemImageStyle} source={{ uri: item.picture.large }} />
                <View style={styles.contentWrapperStyle}>
                    <Text style={styles.txtNameStyle}>{`${item.name.title} ${item.name.first} ${item.name.last}`}</Text>
                    <Text style={styles.txtEmailStyle}>{item.email}</Text>
                </View>
            </View>
        );
    };

    const renderLoader = () => {
        return (
            isLoading ?
                <View style={styles.loaderStyle}>
                    <ActivityIndicator size="large" color="#aaa" />
                </View> : null
        );
    };

    const loadMoreItem = () => {
        setCurrentPage(currentPage + 1);
    };

    useEffect(() => {
        getUsers();
    }, [currentPage]);

    return (
        <>
            <StatusBar backgroundColor="#000" />

            <TextInput
                style={{height:50,borderWidth:1,paddingLeft:20,margin:5,borderColor:'#009688',backgroundColor:'white'}}
                placeholder="Ara..."
                underlineColorAndroid="transparent"
            />

            <FlatList
                data={users}
                renderItem={renderItem}
                keyExtractor={item => item.email}
                ListFooterComponent={renderLoader}
                onEndReached={loadMoreItem}
                onEndReachedThreshold={0}
            />
        </>
    );
};

const styles = StyleSheet.create({
    itemWrapperStyle: {
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },
    itemImageStyle: {
        width: 50,
        height: 50,
        marginRight: 16,
    },
    contentWrapperStyle: {
        justifyContent: "space-around",
    },
    txtNameStyle: {
        fontSize: 16,
    },
    txtEmailStyle: {
        color: "#777",
    },
    loaderStyle: {
        marginVertical: 16,
        alignItems: "center",
    },
});

export default App;
