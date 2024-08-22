import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../slices/cartSlice';

const CheckoutScreen = ({ navigation }) => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');

  const handleOrderConfirmation = () => {
    if (name && address && city && zipCode) {
      Alert.alert('Order Confirmed', 'Your order has been placed successfully!', [
        { text: 'OK', onPress: () => {
          dispatch(clearCart());
          navigation.navigate('ProductList');
        }},
      ]);
    } else {
      Alert.alert('Error', 'Please fill in all the fields.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shipping Details</Text>
      <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Address" value={address} onChangeText={setAddress} />
      <TextInput style={styles.input} placeholder="City" value={city} onChangeText={setCity} />
      <TextInput style={styles.input} placeholder="Zip Code" value={zipCode} onChangeText={setZipCode} />
      <Text style={styles.title}>Order Summary</Text>
      {cartItems.map((item, index) => (
        <View key={index} style={styles.orderItem}>
          <Text>{item.name}</Text>
          <Text>${item.price}</Text>
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={handleOrderConfirmation}>
        <Text style={styles.buttonText}>Confirm Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#28a745', // Green background color
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;
