import React, { useState } from 'react';

import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faAngleDown } from '@fortawesome/free-solid-svg-icons';

import ListCoffees from './ListCoffees';

const Separator = () => (
    <View style={styles.separator} />
);

const NearestCoffees = (props) => {
    const [showDropdownButton, setShowDropdownButton] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}
                onPress={() => (showDropdownButton == false) ?
                    setShowDropdownButton(true) :
                    setShowDropdownButton(false)}
            >

                <Text style={styles.text}>Find my Coffee</Text>

                <FontAwesomeIcon icon={faHeart} color='white' style={{ marginRight: 5 }} />
                <FontAwesomeIcon icon={faAngleDown} color='white' />
            </TouchableOpacity>

            {showDropdownButton == true &&
                <View style={styles.nearestCoffees}>
                    <Text style={styles.title}>Cafés mais amados próximos a você</Text>

                    <Separator />
                    
                    <ListCoffees latitude={props.latitude} longitude={props.longitude} />
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 50,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        flex: 1,
        width: 370
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'black',
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        height: 30,
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        marginRight: 20
    },
    nearestCoffees: {
        backgroundColor: 'black',
        borderRadius: 5,
        marginTop: 5,
        padding: 10,
        width: 190
    },
    title: {
        color: '#F56D50',
        fontWeight: 'bold'
    },
    separator: {
        borderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: 8
    }
});

export default NearestCoffees;