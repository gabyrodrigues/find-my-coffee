import React, { useEffect, useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import EstablishmentService from '../../services/establishmentsService';

import ListRatings from './ListRatings';

const Separator = () => (
    <View style={styles.separator} />
);

const Establishment = (props) => {
    const [establishment, setEstablishment] = useState(null);


    useEffect(() => {
        getEstablishmentInformation();
    }, [props.place]);

    async function getEstablishmentInformation() {
        try {
            const response = await EstablishmentService.show(props.place.place_id);
            setEstablishment(response.data.result);
        } catch (error) {
            setEstablishment([]);
        }
    }

    return (
        <View style={styles.container}>
            {establishment != null &&
                <View style={styles.background}>
                    <ScrollView style={{ height: 500 }}>
                        <View style={{ marginHorizontal: 30 }}>
                            <View style={{ alignSelf: 'flex-end' }}>
                                <Button title="X" color="black" onPress={() => setEstablishment(null)} />
                            </View>

                            {(establishment.photos) ?
                                <Image
                                    style={styles.photo}
                                    source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${establishment.photos[0].photo_reference}&sensor=false&key=AIzaSyBZIpKwl-c2fuxBskmls8PaGBQZnOun4pM` }}
                                    alt="Store perfil"
                                />
                                :
                                <Image
                                    style={styles.photo}
                                    source={require('../../images/no_photo.jpg')}
                                />
                            }

                            <Text style={styles.title}>
                                {props.place.name}
                            </Text>

                            {(establishment.opening_hours) ?
                                <View>
                                    {(establishment.opening_hours.open_now === true) ?
                                        <Text style={{ color: 'white', fontWeight: 'bold', marginTop: 10 }}>Aberto</Text> :
                                        <Text style={{ color: 'white', fontWeight: 'bold', marginTop: 10 }}>Fechado</Text>
                                    }

                                    <Separator />

                                    {establishment.opening_hours.weekday_text.map(schedule => {
                                        return (
                                            <Text key={schedule} style={{ color: 'white' }}>{schedule}</Text>
                                        );
                                    })}
                                </View>
                                :
                                <View>
                                    <Separator />

                                    <Text style={{ color: 'white' }}>Não há cadastros de horário de funcionamento.</Text>
                                </View>
                            }

                            <Separator />

                            <Text style={{ color: 'white' }}>{establishment.formatted_address}</Text>

                            <Separator />

                            <ListRatings place={props.place} />
                        </View>
                    </ScrollView>

                    <View style={styles.rodape}>
                        <Text style={{color: 'white', marginLeft: 10, fontSize: 11}}>Café selecionado</Text>
                    </View>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        flex: 1,
        position: 'absolute',
        top: 40,
        width: '80%',
        zIndex: 2
    },
    background: {
        backgroundColor: 'black',
        borderRadius: 20,
        paddingTop: 20
    },
    photo: {
        height: 200,
        width: 200
    },
    title: {
        color: '#F56D50',
        fontSize: 17,
        marginTop: 10
    },
    separator: {
        borderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: 8
    },
    rodape: {
        backgroundColor: '#393939',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        flexDirection: 'row',
        padding: 10,
        paddingLeft: 20,
        marginTop: 20
    }
});

export default Establishment;