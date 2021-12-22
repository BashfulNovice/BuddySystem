import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = ({tripList}) => {
    const mapStyles = {
        height: '600px',
        width: '100%',
    };

    const defaultCenter = {
        lat: 40.4406,
        lng: -79.9959,
    };

    return (
        <LoadScript googleMapsApiKey={''}>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={14}
                center={defaultCenter}
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