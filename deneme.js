import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Image, Text, View} from 'react-native';
import axios from 'axios';

const  deneme = () => {
    const [users,setUsers] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [isLoading,setIsLoading] = useState(false);

    const getUsers = () => {
        setIsLoading(true);
        axios.get(`http://192.168.62.200:8000/api/departments?page=${currentPage}`)
            // axios.get(`https://randomuser.me/api/?page=${currentPage}&results=10`)
            .then((response) => {
                setUsers([...users,...response.data.results]);
                setIsLoading(false);
            })
    }

    const renderItem = ({item}) => {
        return(
            <View style={{flexDirection:'row',paddingHorizontal:16,paddingVertical:16,borderBottomWidth:1}}>
                <Image source={{uri: item.picture.large}}
                       style={{width:50,height:50,marginRight:16}}/>
                <View style={{justifyContent:'space-around',}}>
                    <Text style={{fontSize:16}}>{`${item.name.title} ${item.name.first} ${item.name.last}`}</Text>
                    <Text style={{color:'#777'}}>{item.email}</Text>
                </View>
            </View>
        );
    }

    const renderLoader = () => {
        return(
            isLoading ?
                <View style={{marginVertical:16,alignItems:'center'}}>
                    <ActivityIndicator size="large" color="#aaa"/>
                </View> : null
        );
    }

    const loadMoreItem = () => {
        setCurrentPage(currentPage+1);
    }

    useEffect(() => {
        getUsers();
    },[currentPage])


    return(
        <FlatList data={users}
                  renderItem={renderItem}
                  keyExtractor={item => item.email}
                  ListFooterComponent={renderLoader}
                  onEndReached={loadMoreItem}
                  onEndReachedThreshold={0}
        />
    );

}
export default deneme();
