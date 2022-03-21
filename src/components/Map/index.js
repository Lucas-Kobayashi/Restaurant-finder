import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';

import { setRestaurants, setRestaurant } from '../../redux/modules/restaurants';

export const MapContainer = (props) => {
  const { restaurants } = useSelector((state) => state.restaurants);
  const dispatch = useDispatch();
  const [map, setMap] = useState(null);
  const { google, query, placeId } = props;

  useEffect(() => {
    if (query) {
      // eslint-disable-next-line no-use-before-define
      searchByQuery(query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    if (placeId) {
      // eslint-disable-next-line no-use-before-define
      getRestaurantsById(placeId);
    }
  });

  function getRestaurantsById(placeId) {
    const service = new google.maps.places.PlacesService(map);

    const request = {
      placeId,
      fields: ['name', 'opening_hours', 'fotmatted_address', 'formatted_phone_number'],
    };

    service.textSearch(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        dispatch(setRestaurant(place));
      }
    });
  }

  function searchByQuery(query) {
    const service = new google.maps.places.PlacesService(map);

    const request = {
      location: map.center,
      radius: '5000',
      type: ['restaurant'],
      query,
    };

    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        dispatch(setRestaurants(results));
      }
    });
  }

  function serachNearBy(map, center) {
    const service = new google.maps.places.PlacesService(map);

    const request = {
      location: center,
      radius: '2000',
      type: ['restaurant'],
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        dispatch(setRestaurants(results));
      }
    });
  }

  function onMapReady(_, map) {
    setMap(map);
    serachNearBy(map, map.center);
  }

  return (
    <Map
      google={google}
      centerAroundCurrentLocation
      onReady={onMapReady}
      onRecenter={onMapReady}
      {...props}>
      {restaurants.map((restaurant) => (
        <Marker
          key={restaurant.places_id}
          name={restaurant.name}
          position={{
            lat: restaurant.geometry.location.lat(),
            lng: restaurant.geometry.location.lng(),
          }}
        />
      ))}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  language: 'pt-BR',
})(MapContainer);
