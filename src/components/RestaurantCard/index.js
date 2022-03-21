import React from 'react';
import ReactStars from 'react-rating-stars-component';

import restaurante from '../../assets/sem-foto.jpeg';

import { Adress, Name, Restaurant, RestaurantImage, RestaurantInfo } from './styles';

const RestaurantCard = ({ restaurant, onClick }) => (
  <Restaurant onClick={onClick}>
    <RestaurantInfo>
      <Name>{restaurant.name}</Name>
      <ReactStars count={5} value={restaurant.rating} isHalf edit={false} activeColor="#e7711c" />
      <Adress>{restaurant.vicinity || restaurant.formatted_address}</Adress>
    </RestaurantInfo>
    <RestaurantImage
      src={restaurant.photos ? restaurant.photos[0].getUrl() : restaurante}
      alt="Imagem restaurante"
    />
  </Restaurant>
);

export default RestaurantCard;
