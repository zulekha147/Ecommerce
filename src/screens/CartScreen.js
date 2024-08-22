import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../slices/cartSlice';

const CartScreen = ({ navigation }) => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <View style={styles.container}>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Text>{item.name}</Text>
                <Text>${item.price}</Text>
              </View>
            )}
          />
          <View style={styles.summary}>
            <Text style={styles.totalAmount}>Total: ${totalAmount.toFixed(2)}</Text>

            {/* Proceed to Checkout Button */}
            <TouchableOpacity
              style={[styles.button, styles.checkoutButton]}
              onPress={() => navigation.navigate('Checkout')}
            >
              <Text style={styles.buttonText}>Proceed to Checkout</Text>
            </TouchableOpacity>

            {/* Clear Cart Button */}
            <TouchableOpacity
              style={[styles.button, styles.clearCartButton]}
              onPress={() => dispatch(clearCart())}
            >
              <Text style={styles.buttonText}>Clear Cart</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  summary: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 2,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    marginLeft:25,
    marginRight:25,
  },
  checkoutButton: {
    backgroundColor: '#28a745',
   
  },
  clearCartButton: {
    backgroundColor: '#d9534f', },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    
  },
});

export default CartScreen;
