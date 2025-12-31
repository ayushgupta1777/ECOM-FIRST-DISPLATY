// ============================================
// mobile/src/screens/orders/OrderDetailsScreen.js
// ============================================
import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../../styling/screens/orders/OrderDetailsScreenPremiumStyles';

const OrderDetailsScreen = ({ route }) => {
  // Mock order data - fetch from API in real app
  const order = {
    orderNo: 'ORD123456',
    createdAt: '2024-01-15',
    orderStatus: 'shipped',
    trackingNumber: 'TRK123456',
    items: [
      {
        product: {
          title: 'Premium Cotton T-Shirt',
          images: ['https://via.placeholder.com/100']
        },
        quantity: 2,
        price: 499
      }
    ],
    shippingAddress: {
      name: 'John Doe',
      phone: '9876543210',
      addressLine1: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001'
    },
    subtotal: 998,
    shippingCost: 50,
    tax: 189,
    total: 1237,
    paymentMethod: 'online'
  };

  const statusSteps = [
    { status: 'pending', label: 'Pending', done: true },
    { status: 'confirmed', label: 'Confirmed', done: true },
    { status: 'packed', label: 'Packed', done: true },
    { status: 'shipped', label: 'Shipped', done: true },
    { status: 'delivered', label: 'Delivered', done: false }
  ];

  return (
    <ScrollView style={styles['order-details-premium-container']}>
      {/* Header Card */}
      <View style={styles['order-details-premium-header-card']}>
        <Text style={styles['order-details-premium-order-number']}>
          Order #{order.orderNo}
        </Text>
        <Text style={styles['order-details-premium-order-date']}>
          {new Date(order.createdAt).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </Text>
      </View>

      {/* Order Status Timeline */}
      <View style={styles['order-details-premium-timeline-card']}>
        <Text style={styles['order-details-premium-section-title']}>Order Status</Text>
        <View style={styles['order-details-premium-timeline-container']}>
          {statusSteps.map((step, index) => (
            <View key={step.status} style={styles['order-details-premium-timeline-step']}>
              <View style={styles['order-details-premium-timeline-left']}>
                <View style={[
                  styles['order-details-premium-timeline-dot'],
                  step.done && styles['order-details-premium-timeline-dot-done']
                ]}>
                  {step.done && <Icon name="checkmark" size={16} color="#fff" />}
                </View>
                {index < statusSteps.length - 1 && (
                  <View style={[
                    styles['order-details-premium-timeline-line'],
                    step.done && styles['order-details-premium-timeline-line-done']
                  ]} />
                )}
              </View>
              <View style={styles['order-details-premium-timeline-content']}>
                <Text style={[
                  styles['order-details-premium-timeline-label'],
                  step.done && styles['order-details-premium-timeline-label-done']
                ]}>
                  {step.label}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Tracking */}
      {order.trackingNumber && (
        <View style={styles['order-details-premium-tracking-card']}>
          <View style={styles['order-details-premium-tracking-icon-wrapper']}>
            <Icon name="location-outline" size={24} color="#0A84FF" />
          </View>
          <View style={styles['order-details-premium-tracking-info']}>
            <Text style={styles['order-details-premium-tracking-label']}>
              Tracking Number
            </Text>
            <Text style={styles['order-details-premium-tracking-number']}>
              {order.trackingNumber}
            </Text>
          </View>
          <TouchableOpacity style={styles['order-details-premium-tracking-btn']}>
            <Icon name="open-outline" size={20} color="#0A84FF" />
          </TouchableOpacity>
        </View>
      )}

      {/* Order Items */}
      <View style={styles['order-details-premium-section-card']}>
        <Text style={styles['order-details-premium-section-title']}>Order Items</Text>
        {order.items.map((item, index) => (
          <View key={index} style={styles['order-details-premium-item-card']}>
            <View style={styles['order-details-premium-item-image-wrapper']}>
              <Image 
                source={{ uri: item.product.images[0] }} 
                style={styles['order-details-premium-item-image']} 
              />
            </View>
            <View style={styles['order-details-premium-item-info']}>
              <Text style={styles['order-details-premium-item-title']}>
                {item.product.title}
              </Text>
              <Text style={styles['order-details-premium-item-quantity']}>
                Quantity: {item.quantity}
              </Text>
              <Text style={styles['order-details-premium-item-price']}>
                ₹{item.price}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Shipping Address */}
      <View style={styles['order-details-premium-section-card']}>
        <View style={styles['order-details-premium-section-header']}>
          <Icon name="location" size={20} color="#0A84FF" />
          <Text style={styles['order-details-premium-section-title']}>
            Shipping Address
          </Text>
        </View>
        <View style={styles['order-details-premium-address-box']}>
          <Text style={styles['order-details-premium-address-name']}>
            {order.shippingAddress.name}
          </Text>
          <Text style={styles['order-details-premium-address-text']}>
            {order.shippingAddress.addressLine1}
          </Text>
          <Text style={styles['order-details-premium-address-text']}>
            {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
          </Text>
          <View style={styles['order-details-premium-phone-wrapper']}>
            <Icon name="call-outline" size={16} color="#4A4A4A" />
            <Text style={styles['order-details-premium-address-phone']}>
              {order.shippingAddress.phone}
            </Text>
          </View>
        </View>
      </View>

      {/* Price Breakdown */}
      <View style={styles['order-details-premium-section-card']}>
        <Text style={styles['order-details-premium-section-title']}>Price Details</Text>
        <View style={styles['order-details-premium-price-container']}>
          <View style={styles['order-details-premium-price-row']}>
            <Text style={styles['order-details-premium-price-label']}>Subtotal</Text>
            <Text style={styles['order-details-premium-price-value']}>₹{order.subtotal}</Text>
          </View>
          <View style={styles['order-details-premium-price-row']}>
            <Text style={styles['order-details-premium-price-label']}>Shipping</Text>
            <Text style={styles['order-details-premium-price-value']}>₹{order.shippingCost}</Text>
          </View>
          <View style={styles['order-details-premium-price-row']}>
            <Text style={styles['order-details-premium-price-label']}>Tax</Text>
            <Text style={styles['order-details-premium-price-value']}>₹{order.tax}</Text>
          </View>
          <View style={styles['order-details-premium-price-divider']} />
          <View style={styles['order-details-premium-price-row-total']}>
            <Text style={styles['order-details-premium-price-label-total']}>Total</Text>
            <Text style={styles['order-details-premium-price-value-total']}>₹{order.total}</Text>
          </View>
        </View>
      </View>

      {/* Actions */}
      <View style={styles['order-details-premium-actions']}>
        <TouchableOpacity style={styles['order-details-premium-action-btn']}>
          <Icon name="headset-outline" size={20} color="#0A84FF" />
          <Text style={styles['order-details-premium-action-text']}>Need Help?</Text>
        </TouchableOpacity>

        {order.orderStatus === 'delivered' && (
          <TouchableOpacity style={styles['order-details-premium-action-btn']}>
            <Icon name="refresh-outline" size={20} color="#0A84FF" />
            <Text style={styles['order-details-premium-action-text']}>Return Order</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles['order-details-premium-bottom-spacer']} />
    </ScrollView>
  );
};

export default OrderDetailsScreen;