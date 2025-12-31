// ============================================
// mobile/src/screens/profile/ProfileScreen.js
// PREMIUM STYLING VERSION
// ============================================
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../../styling/screens/profile/ProfilePremiumStyles';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => dispatch(logout())
        }
      ]
    );
  };

  const menuItems = [
    { 
      icon: 'person-outline', 
      title: 'Edit Profile', 
      screen: 'EditProfile',
      color: '#0A84FF'
    },
    { 
      icon: 'location-outline', 
      title: 'Addresses', 
      screen: 'Addresses',
      color: '#5E5CE6'
    },
    { 
      icon: 'notifications-outline', 
      title: 'Notifications', 
      screen: 'Notifications',
      color: '#FF9500'
    },
    { 
      icon: 'help-circle-outline', 
      title: 'Help & Support', 
      screen: 'Support',
      color: '#34C759'
    },
    { 
      icon: 'document-text-outline', 
      title: 'Terms & Conditions', 
      screen: 'Terms',
      color: '#9CA3AF'
    },
    { 
      icon: 'shield-checkmark-outline', 
      title: 'Privacy Policy', 
      screen: 'Privacy',
      color: '#9CA3AF'
    },
  ];

  return (
    <ScrollView 
      style={styles['profile-premium-container']}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Section */}
      <View style={styles['profile-premium-header']}>
        <View style={styles['profile-premium-avatar']}>
          <Icon name="person" size={44} color="#fff" />
        </View>
        
        <Text style={styles['profile-premium-name']}>
          {user?.name}
        </Text>
        <Text style={styles['profile-premium-email']}>
          {user?.email}
        </Text>

        <View style={styles['profile-premium-role-badge']}>
          <Icon 
            name={user?.role === 'reseller' ? 'bag-check-outline' : 'person-circle-outline'} 
            size={14} 
            color="#fff" 
          />
          <Text style={styles['profile-premium-role-text']}>
            {user?.role === 'reseller' ? 'Reseller' : 'Customer'}
          </Text>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles['profile-premium-stats-section']}>
        <View style={styles['profile-premium-stat-card']}>
          <Icon name="bag-outline" size={24} color="#0A84FF" />
          <Text style={styles['profile-premium-stat-label']}>Orders</Text>
          <Text style={styles['profile-premium-stat-value']}>8</Text>
        </View>

        <View style={styles['profile-premium-stat-card']}>
          <Icon name="heart-outline" size={24} color="#FF3B30" />
          <Text style={styles['profile-premium-stat-label']}>Wishlist</Text>
          <Text style={styles['profile-premium-stat-value']}>12</Text>
        </View>

        <View style={styles['profile-premium-stat-card']}>
          <Icon name="medal-outline" size={24} color="#FF9500" />
          <Text style={styles['profile-premium-stat-label']}>Points</Text>
          <Text style={styles['profile-premium-stat-value']}>650</Text>
        </View>
      </View>

      {/* Menu Section */}
      <View style={styles['profile-premium-menu-section']}>
        <Text style={styles['profile-premium-section-title']}>Account</Text>

        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles['profile-premium-menu-item']}
            onPress={() => navigation.navigate(item.screen)}
            activeOpacity={0.7}
          >
            <View style={styles['profile-premium-menu-icon-bg']}>
              <Icon name={item.icon} size={20} color={item.color} />
            </View>
            
            <Text style={styles['profile-premium-menu-title']}>
              {item.title}
            </Text>

            <Icon name="chevron-forward-outline" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Section */}
      <View style={styles['profile-premium-logout-section']}>
        <TouchableOpacity
          style={styles['profile-premium-logout-btn']}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Icon name="log-out-outline" size={20} color="#FF3B30" />
          <Text style={styles['profile-premium-logout-text']}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* App Version */}
      <View style={styles['profile-premium-version-section']}>
        <Text style={styles['profile-premium-version-text']}>
          Version 1.0.0
        </Text>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;