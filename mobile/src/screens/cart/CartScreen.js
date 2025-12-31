// ============================================
// mobile/src/screens/cart/CartScreen.js
// PREMIUM STYLING VERSION
// ============================================
import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, updateCartItem, removeFromCart } from '../../redux/slices/cartSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../../styling/screens/cart/CartPremiumStyles';

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { items, totalItems, totalPrice } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  const handleUpdateQuantity = (itemId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) return;
    dispatch(updateCartItem({ itemId, quantity: newQuantity }));
  };

  const handleRemoveItem = (itemId) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => dispatch(removeFromCart(itemId))
        }
      ]
    );
  };

  const renderCartItem = ({ item }) => (
    <View style={styles['cart-premium-item-card']}>
      <Image 
        source={{ uri: item.product.images[0] }} 
        style={styles['cart-premium-item-image']}
      />

      <View style={styles['cart-premium-item-details']}>
        <View style={styles['cart-premium-item-header']}>
          <Text 
            style={styles['cart-premium-item-title']} 
            numberOfLines={2}
          >
            {item.product.title}
          </Text>
          <TouchableOpacity 
            onPress={() => handleRemoveItem(item._id)}
            hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
          >
            <Icon name="trash-outline" size={20} color="#FF3B30" />
          </TouchableOpacity>
        </View>

        <Text style={styles['cart-premium-item-price']}>
          ₹{item.price}
        </Text>

        {item.reseller && (
          <View style={styles['cart-premium-reseller-tag']}>
            <Icon name="cash-outline" size={12} color="#0A84FF" />
            <Text style={styles['cart-premium-reseller-text']}>
              Via Reseller (+{item.resellerMargin}%)
            </Text>
          </View>
        )}

        <View style={styles['cart-premium-item-actions']}>
          <View style={styles['cart-premium-quantity-controls']}>
            <TouchableOpacity
              style={styles['cart-premium-qty-btn-small']}
              onPress={() => handleUpdateQuantity(item._id, item.quantity, -1)}
            >
              <Icon name="remove" size={14} color="#0A84FF" />
            </TouchableOpacity>
            <Text style={styles['cart-premium-quantity-text']}>
              {item.quantity}
            </Text>
            <TouchableOpacity
              style={styles['cart-premium-qty-btn-small']}
              onPress={() => handleUpdateQuantity(item._id, item.quantity, 1)}
            >
              <Icon name="add" size={14} color="#0A84FF" />
            </TouchableOpacity>
          </View>

          <View style={styles['cart-premium-item-subtotal']}>
            <Text style={styles['cart-premium-subtotal-label']}>Subtotal</Text>
            <Text style={styles['cart-premium-subtotal-value']}>
              ₹{(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  if (items.length === 0) {
    return (
      <View style={styles['cart-premium-empty-container']}>
        <View style={styles['cart-premium-empty-icon-bg']}>
          <Icon name="cart-outline" size={64} color="#0A84FF" />
        </View>
        <Text style={styles['cart-premium-empty-title']}>
          Your cart is empty
        </Text>
        <Text style={styles['cart-premium-empty-subtitle']}>
          Add some products to get started
        </Text>
        <TouchableOpacity
          style={styles['cart-premium-empty-btn']}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.8}
        >
          <Icon name="arrow-back" size={18} color="#fff" />
          <Text style={styles['cart-premium-empty-btn-text']}>
            Start Shopping
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles['cart-premium-container']}>
      {/* Header */}
      <View style={styles['cart-premium-header']}>
        <Text style={styles['cart-premium-header-title']}>Shopping Cart</Text>
        <View style={styles['cart-premium-item-count-badge']}>
          <Text style={styles['cart-premium-item-count-text']}>
            {items.length}
          </Text>
        </View>
      </View>

      {/* Items List */}
      <FlatList
        data={items}
        renderItem={renderCartItem}
        keyExtractor={(item) => item._id}
        scrollEnabled={false}
        contentContainerStyle={styles['cart-premium-items-container']}
      />

      {/* Summary Section */}
      <View style={styles['cart-premium-summary-section']}>
        <View style={styles['cart-premium-summary-row']}>
          <Text style={styles['cart-premium-summary-label']}>Subtotal</Text>
          <Text style={styles['cart-premium-summary-value']}>
            ₹{totalPrice?.toFixed(2)}
          </Text>
        </View>

        <View style={styles['cart-premium-summary-row']}>
          <Text style={styles['cart-premium-summary-label']}>Shipping</Text>
          <Text style={styles['cart-premium-summary-value-free']}>
            Free
          </Text>
        </View>

        <View style={styles['cart-premium-divider']} />

        <View style={styles['cart-premium-summary-row-total']}>
          <Text style={styles['cart-premium-total-label']}>Total</Text>
          <Text style={styles['cart-premium-total-value']}>
            ₹{totalPrice?.toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Checkout Button */}
      <View style={styles['cart-premium-footer']}>
        <TouchableOpacity
          style={styles['cart-premium-checkout-btn']}
          onPress={() => navigation.navigate('Checkout')}
          activeOpacity={0.8}
        >
          <Text style={styles['cart-premium-checkout-btn-text']}>
            Proceed to Checkout
          </Text>
          <Icon name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;