// ============================================
// mobile/src/screens/home/HomeScreen.js
// PREMIUM STYLING VERSION
// ============================================
import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,
  Dimensions
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../../styling/screens/home/HomeScreenPremiumStyles.js';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { items: products, isLoading } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const onRefresh = () => {
    dispatch(fetchProducts());
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles['product-premium-card']}
      onPress={() => navigation.navigate('ProductDetails', { productId: item._id })}
      activeOpacity={0.8}
    >
      <View style={styles['product-premium-image-container']}>
        <Image 
          source={{ uri: item.images[0] }} 
          style={styles['product-premium-image']}
        />
        {item.discount > 0 && (
          <View style={styles['product-premium-discount-badge']}>
            <Text style={styles['product-premium-discount-text']}>
              {item.discount}%
            </Text>
            <Text style={styles['product-premium-discount-label']}>OFF</Text>
          </View>
        )}
      </View>

      <View style={styles['product-premium-info']}>
        <Text 
          style={styles['product-premium-title']} 
          numberOfLines={2}
        >
          {item.title}
        </Text>

        <View style={styles['product-premium-price-row']}>
          <Text style={styles['product-premium-price']}>₹{item.price}</Text>
          {item.mrp > item.price && (
            <Text style={styles['product-premium-mrp']}>₹{item.mrp}</Text>
          )}
        </View>

        {item.averageRating > 0 && (
          <View style={styles['product-premium-rating']}>
            <Icon name="star" size={12} color="#FF9500" />
            <Text style={styles['product-premium-rating-value']}>
              {item.averageRating.toFixed(1)}
            </Text>
            <Text style={styles['product-premium-rating-count']}>
              ({item.reviewCount || 0})
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const categories = [
    { id: '1', name: 'Fashion', icon: 'shirt-outline' },
    { id: '2', name: 'Electronics', icon: 'phone-portrait-outline' },
    { id: '3', name: 'Home', icon: 'home-outline' },
    { id: '4', name: 'Books', icon: 'book-outline' },
    { id: '5', name: 'Sports', icon: 'football-outline' },
  ];

  return (
    <View style={styles['home-premium-container']}>
      {/* Header */}
      <View style={styles['home-premium-header']}>
        <View>
          <Text style={styles['home-premium-greeting']}>
            Hello, {user?.name} 👋
          </Text>
          <Text style={styles['home-premium-subtitle']}>
            What are you looking for?
          </Text>
        </View>
        <TouchableOpacity 
          style={styles['home-premium-notification-btn']}
          activeOpacity={0.7}
        >
          <Icon name="notifications-outline" size={24} color="#0A84FF" />
          <View style={styles['home-premium-notification-dot']} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles['home-premium-scroll']}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      >
        {/* Search Bar */}
        <TouchableOpacity
          style={styles['home-premium-search-bar']}
          onPress={() => navigation.navigate('ProductList')}
          activeOpacity={0.8}
        >
          <Icon name="search-outline" size={18} color="#4A4A4A" />
          <Text style={styles['home-premium-search-placeholder']}>
            Search products...
          </Text>
          <Icon name="options-outline" size={18} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Categories */}
        <View style={styles['home-premium-section']}>
          <Text style={styles['home-premium-section-title']}>Categories</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles['home-premium-categories-scroll']}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles['home-premium-category-item']}
                onPress={() => navigation.navigate('ProductList', { category: category.name })}
                activeOpacity={0.7}
              >
                <View style={styles['home-premium-category-icon-bg']}>
                  <Icon name={category.icon} size={22} color="#0A84FF" />
                </View>
                <Text style={styles['home-premium-category-name']}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Reseller Banner */}
        {user?.role === 'reseller' && (
          <TouchableOpacity 
            style={styles['home-premium-banner-reseller']}
            activeOpacity={0.9}
          >
            <Icon name="cash-outline" size={32} color="#fff" />
            <View style={styles['home-premium-banner-text']}>
              <Text style={styles['home-premium-banner-title']}>
                Start Earning Today!
              </Text>
              <Text style={styles['home-premium-banner-subtitle']}>
                Share products and earn commission
              </Text>
            </View>
            <Icon name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        )}

        {/* Featured Products */}
        <View style={styles['home-premium-section']}>
          <View style={styles['home-premium-section-header']}>
            <Text style={styles['home-premium-section-title']}>Featured</Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('ProductList')}
              activeOpacity={0.7}
            >
              <Text style={styles['home-premium-section-link']}>View All →</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={products.slice(0, 6)}
            renderItem={renderProduct}
            keyExtractor={(item) => item._id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles['home-premium-products-grid']}
          />
        </View>

        <View style={styles['home-premium-spacer']} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;