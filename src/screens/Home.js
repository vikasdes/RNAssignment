import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native'
import styles from '../common/Styles'
let clonedArray = []

function Home(props) {
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState("")
    const [text, setText] = useState("")

    useEffect((e) => {
        return () => {
            clonedArray = []
        }
    }, [])

    /**
     * Add item in array
     */
    const addItem = e => {
        let date = new Date()
        let strDate = ""
        if (date !== null) {
            strDate = date.getFullYear() + "-" + date.getMonth() + 1 + "-" + date.getDate() + " "
                + date.getHours() + ":" + date.getMinutes()
        }
        setData([{ title: e.nativeEvent.text, date: strDate }, ...data])
        setText("")
    }

    /**
     * Clone data array  
     */
    const cloneItemArray = () => {
        if (clonedArray.length < data.length) {
            clonedArray = JSON.parse(JSON.stringify(data))
        }
    }

    /**
     * Handle Search 
     */
    const handleSearch = text => {
        cloneItemArray()
        setSearchText(text)
        const searchResult = clonedArray.filter((e) => e.title.includes(text) || e.date.includes(text))
        setData(searchResult)
    };

    /**
     * Reset Data 
     */
    const resetData = () => {
        cloneItemArray()
        setSearchText("")
        setData(clonedArray)
    }

    const Item = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.date}</Text>
        </View>
    );

    const renderItem = ({ item }) => (
        <Item item={item} />
    );

    return (
        <View style={styles.container}>
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="always"
                placeholder="Add Item"
                value={text}
                maxLength={30}
                onChange={(e) => setText(e.target.value)}
                onSubmitEditing={addItem}
                style={styles.addInput}
            />

            <View
                style={styles.searchInputView}
            >
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    clearButtonMode="always"
                    onChangeText={queryText => handleSearch(queryText)}
                    placeholder="Search"
                    value={searchText}
                    style={styles.searchInput}
                />

            </View>

            <TouchableOpacity
                onPress={resetData}
                style={styles.resetParent}
            ><Text style={styles.reset} >Reset</Text></TouchableOpacity>

            <Text style={styles.listData} >List Data</Text>

            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default Home