import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import EstablishmentsService from './src/services/establishmentsService';

import imgPin from './src/images/my-location-pin.png';

import Establishment from './src/components/Establishment';

export default function App() {
	const [latitude, setLatitude] = useState(0);
	const [longitude, setLongitude] = useState(0);
	const [locations, setLocations] = useState([]);
	const [selected, setSelected] = useState(null);

	useEffect(() => {
		(async () => {
			let {status} = await Location.requestPermissionsAsync();

			if(status !== 'granted') {
				Alert.alert('Ative as permissões de uso do GPS para acessar o APP');
			} else {
				let location = await Location.getCurrentPositionAsync({});
				setLatitude(location.coords.latitude);
				setLongitude(location.coords.longitude);
			}
		 })();
		 
		 loadCoffeeShops();
	}, []);

	async function loadCoffeeShops() {
		try {
			const response = await EstablishmentsService.index(latitude, longitude);
			setLocations(response.data.results);
	   } catch (error) {
			setLocations([]);
	   }
   }

	return (
		<View style={styles.container}>
			{(selected) && <Establishment place={selected} />}

			<MapView 
				style={styles.map}
				region = {{
					latitude: latitude,
					longitude: longitude,
					latitudeDelta: 0.03,
					longitudeDelta: 0.03
				}}
			>
				<Marker
					title="Seu local"
					icon={imgPin}
					coordinate={{
						latitude: latitude,
						longitude: longitude
					}}
				/>

				{locations.map(item => {
                   	return (
						 <Marker key={item.place_id}
						 	icon={require('./src/images/coffee-big-pin.png')}
                       		coordinate={{
                               	latitude: item.geometry.location.lat,
                              	 longitude: item.geometry.location.lng
                          	}}
							title={item.name}
							onPress={() => setSelected(item)}
                     	/>
                  	);
              	})}
			</MapView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		zIndex: 0
	},
	map: {
		height: '100%',
		width: '100%'
	}
});
