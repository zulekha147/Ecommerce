import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addItem } from '../slices/cartSlice';

const products = [
  { id: 1, name: 'Hp Laptop', price: 1000, image: require('../../assets/images/laptop2.webp') },
  { id: 2, name: 'Dell Laptop', price: 500, image: require('../../assets/images/laptop1.jpeg') },
  { id: 3, name: ' Shirt', price: 10, image: require('../../assets/images/shirt1.jpeg') },
  { id: 4, name: ' Shirt', price: 7, image: require('../../assets/images/shirt2.jpeg') },
  { id: 5, name: 'Hodi', price: 7, image: require('../../assets/images/hodi1.jpg') },
  { id: 6, name: 'Shoe', price: 5, image: require('../../assets/images/shoe1.jpeg') },
  { id: 7, name: 'Shoe', price: 3, image: require('../../assets/images/shoe2.jpeg') },
  { id: 8, name: 'Shoe', price: 5, image: require('../../assets/images/shoe3.webp') },
];

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleAddToCart = (item) => {
    dispatch(addItem(item));
    navigation.navigate('Cart');
  };

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleAddToCart(item)}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        numColumns={2} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  productContainer: {
    flex: 1,
    margin: 5,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  image: {
    width: Dimensions.get('window').width / 2 - 40, 
    height: Dimensions.get('window').width / 2 - 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  price: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProductListScreen;
