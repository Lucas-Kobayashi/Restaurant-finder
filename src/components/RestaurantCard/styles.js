import styled from 'styled-components';

export const Restaurant = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  margin-top: 5px;
  margin-right: 5px;
  margin-left: 5px;
  padding: 16px;
  background-color: #ffffff;
  border: 1.5px solid transparent;
  border-radius: 4px;
  :hover {
    background-color: ${(props) => props.theme.colors.background};
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

export const RestaurantInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Name = styled.span`
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.text};
  font-size: 24px;
  font-weight: bold;
  line-height: 29px;
  margin-bottom: 10px;
`;

export const Adress = styled.span`
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.text};
  font-size: 16px;
  line-height: 19px;
  margin: 10px 0;
`;

export const RestaurantImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
`;
