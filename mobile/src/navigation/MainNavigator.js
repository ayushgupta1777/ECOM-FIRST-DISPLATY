import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

// Screens
import HomeScreen from '../screens/home/HomeScreen';
import ProductDetailsScreen from '../screens/product/ProductDetailsScreen';
import ProductListScreen from '../screens/product/ProductListScreen'; // ADD THIS
import CartScreen from '../screens/cart/CartScreen';
import CheckoutScreen from '../screens/checkout/CheckoutScreen'; // ADD THIS
import OrdersScreen from '../screens/orders/OrdersScreen';
import OrderDetailsScreen from '../screens/orders/OrderDetailsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

import PaymentScreen from '../screens/payment/PaymentScreen';
import OrderSuccessScreen from '../screens/orders/OrderSuccessScreen';

// Reseller screens
import ResellerDashboardScreen from '../screens/reseller/ResellerDashboardScreen';
import ShareProductScreen from '../screens/reseller/ShareProductScreen';
import WalletScreen from '../screens/reseller/WalletScreen';
import WithdrawRequestScreen from '../screens/reseller/WithdrawRequestScreen'; // ADD THIS

// Vendor screens
import VendorDashboardScreen from '../screens/vendor/VendorDashboardScreen';
import AddProductScreen from '../screens/vendor/AddProductScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Home Stack - ADD ProductListScreen
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="HomeMain" component={HomeScreen} options={{ title: 'Home' }} />
    <Stack.Screen name="ProductList" component={ProductListScreen} options={{ title: 'Products' }} />
    <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: 'Product' }} />
  </Stack.Navigator>
);

// Cart Stack - ADD CheckoutScreen
// Update Cart Stack
const CartStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="CartMain" component={CartScreen} options={{ title: 'Cart' }} />
    <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Checkout' }} />
    <Stack.Screen 
      name="Payment" 
      component={PaymentScreen} 
      options={{ 
        title: 'Payment',
        headerLeft: () => null, // Disable back button during payment
        gestureEnabled: false 
      }} 
    />
    <Stack.Screen 
      name="OrderSuccess" 
      component={OrderSuccessScreen} 
      options={{ 
        title: 'Order Confirmed',
        headerLeft: () => null,
        gestureEnabled: false
      }} 
    />
  </Stack.Navigator>
);

// Orders Stack
const OrdersStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="OrdersList" component={OrdersScreen} options={{ title: 'My Orders' }} />
    <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} options={{ title: 'Order Details' }} />
  </Stack.Navigator>
);

// Profile Stack
const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ProfileMain" component={ProfileScreen} options={{ title: 'Profile' }} />
  </Stack.Navigator>
);

// Reseller Stack - ADD WithdrawRequestScreen
const ResellerStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ResellerDashboard" component={ResellerDashboardScreen} options={{ title: 'Dashboard' }} />
    <Stack.Screen name="ShareProduct" component={ShareProductScreen} options={{ title: 'Share Product' }} />
    <Stack.Screen name="Wallet" component={WalletScreen} options={{ title: 'Wallet' }} />
    <Stack.Screen name="WithdrawRequest" component={WithdrawRequestScreen} options={{ title: 'Withdraw Money' }} />
  </Stack.Navigator>
);

// Vendor Stack
const VendorStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="VendorDashboard" component={VendorDashboardScreen} options={{ title: 'Dashboard' }} />
    <Stack.Screen name="AddProduct" component={AddProductScreen} options={{ title: 'Add Product' }} />
  </Stack.Navigator>
);

const MainNavigator = () => {
  const { user } = useSelector((state) => state.auth);
  const isReseller = user?.role === 'reseller';
  const isVendor = user?.role === 'vendor';

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Orders') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Reseller') {
            iconName = focused ? 'cash' : 'cash-outline';
          } else if (route.name === 'Vendor') {
            iconName = focused ? 'storefront' : 'storefront-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4F46E5',
        tabBarInactiveTintColor: 'gray',
        headerShown: false
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Cart" component={CartStack} />
      <Tab.Screen name="Orders" component={OrdersStack} />
      
      {isReseller && (
        <Tab.Screen name="Reseller" component={ResellerStack} />
      )}
      
      {isVendor && (
        <Tab.Screen name="Vendor" component={VendorStack} />
      )}
      
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default MainNavigator;