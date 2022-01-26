import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import anything from '../anything'

const MapContainer = ({tripList, creating, setCreating, tripData, setTripData}) => {
    const mapStyles = {
        height: '600px',
        width: '100%',
    };

    const defaultCenter = {
        lat: 42.2787,
        lng: -83.7485,
    };

    const logMap = (e) => {
        setTripData({...tripData, latitude: e.latLng.lat(), longitude: e.latLng.lng()})
        setCreating(true)
    }

    return (
        <LoadScript googleMapsApiKey={anything}>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={8}
                center={defaultCenter}
                onClick = {(e) => logMap(e)}
            >
                {/* {tripList.map((trip) => {
                let position = {lat: trip.latitude, lng: trip.longitude}
                return <Marker position = {position} />})} */}
                {tripList.map(trip => <Marker position = {{lat: trip.latitude, lng: trip.longitude}} /> )}
                {/* <Marker position = {{lat: 40.4406, lng: -79.9959,}} /> */}
            </GoogleMap>
        </LoadScript>
    );
};
export default MapContainer