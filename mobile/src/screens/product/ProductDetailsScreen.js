// ============================================
// mobile/src/screens/product/ProductDetailsScreen.js
// PREMIUM STYLING VERSION
// ============================================
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails } from '../../redux/slices/productSlice';
import { addToCart } from '../../redux/slices/cartSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../../styling/screens/product/ProductDetailsPremiumStyles';

const { width } = Dimensions.get('window');

const ProductDetailsScreen = ({ route, navigation }) => {
  const { productId, resellerId, margin } = route.params;
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const { selectedProduct: product, isLoading } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProductDetails(productId));
  }, [productId]);

  const handleAddToCart = () => {
    dispatch(addToCart({
      productId: product._id,
      quantity,
      resellerId,
      resellerMargin: margin
    })).then(() => {
      Alert.alert('Success', 'Product added to cart');
    });
  };

  const handleShare = () => {
    if (user.role === 'reseller') {
      navigation.navigate('Reseller', {
        screen: 'ShareProduct',
        params: { product }
      });
    } else {
      Alert.alert('Info', 'Only resellers can share products');
    }
  };

  if (isLoading || !product) {
    return (
      <View style={styles['product-details-premium-loading']}>
        <ActivityIndicator size="large" color="#0A84FF" />
      </View>
    );
  }

  return (
    <View style={styles['product-details-premium-container']}>
      <ScrollView 
        style={styles['product-details-premium-scroll']}
        showsVerticalScrollIndicator={false}
      >
        {/* Image Gallery */}
        <View style={styles['product-details-premium-gallery']}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={(e) => {
              const x = e.nativeEvent.contentOffset.x;
              setSelectedImage(Math.round(x / width));
            }}
          >
            {product.images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles['product-details-premium-image']}
              />
            ))}
          </ScrollView>

          {/* Image Indicators */}
          <View style={styles['product-details-premium-indicators']}>
            {product.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles['product-details-premium-indicator'],
                  selectedImage === index && styles['product-details-premium-indicator-active']
                ]}
              />
            ))}
          </View>

          {/* Share Button */}
          {user.role === 'reseller' && (
            <TouchableOpacity
              style={styles['product-details-premium-share-btn']}
              onPress={handleShare}
              activeOpacity={0.7}
            >
              <Icon name="share-social-outline" size={22} color="#fff" />
            </TouchableOpacity>
          )}
        </View>

        {/* Product Info */}
        <View style={styles['product-details-premium-info']}>
          <Text style={styles['product-details-premium-title']}>
            {product.title}
          </Text>

          {/* Rating & Reviews */}
          {product.averageRating > 0 && (
            <View style={styles['product-details-premium-rating-container']}>
              <View style={styles['product-details-premium-rating-row']}>
                <View style={styles['product-details-premium-stars']}>
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name={i < Math.round(product.averageRating) ? 'star' : 'star-outline'}
                      size={14}
                      color="#FF9500"
                    />
                  ))}
                </View>
                <Text style={styles['product-details-premium-rating-value']}>
                  {product.averageRating.toFixed(1)}
                </Text>
              </View>
              <Text style={styles['product-details-premium-review-count']}>
                {product.reviewCount} reviews
              </Text>
            </View>
          )}

          {/* Price Section */}
          <View style={styles['product-details-premium-price-section']}>
            <View style={styles['product-details-premium-price-row']}>
              <Text style={styles['product-details-premium-price-current']}>
                ₹{product.price}
              </Text>
              {product.mrp > product.price && (
                <>
                  <Text style={styles['product-details-premium-price-mrp']}>
                    ₹{product.mrp}
                  </Text>
                  <Text style={styles['product-details-premium-price-discount']}>
                    {product.discount}% OFF
                  </Text>
                </>
              )}
            </View>

            {/* Stock Status */}
            <View style={styles['product-details-premium-stock-container']}>
              {product.stock > 0 ? (
                <View style={styles['product-details-premium-stock-available']}>
                  <Icon name="checkmark-circle" size={16} color="#34C759" />
                  <Text style={styles['product-details-premium-stock-text']}>
                    In Stock ({product.stock} available)
                  </Text>
                </View>
              ) : (
                <View style={styles['product-details-premium-stock-unavailable']}>
                  <Icon name="close-circle" size={16} color="#FF3B30" />
                  <Text style={styles['product-details-premium-stock-text']}>
                    Out of Stock
                  </Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles['product-details-premium-divider']} />

          {/* Vendor Info */}
          <View style={styles['product-details-premium-vendor']}>
            <Icon name="storefront-outline" size={18} color="#0A84FF" />
            <View style={styles['product-details-premium-vendor-info']}>
              <Text style={styles['product-details-premium-vendor-label']}>
                Sold by
              </Text>
              <Text style={styles['product-details-premium-vendor-name']}>
                {product.vendor?.storeName || 'Official Store'}
              </Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles['product-details-premium-section']}>
            <Text style={styles['product-details-premium-section-title']}>
              Description
            </Text>
            <Text style={styles['product-details-premium-description']}>
              {product.description}
            </Text>
          </View>

          {/* Specifications */}
          {product.specifications && product.specifications.length > 0 && (
            <View style={styles['product-details-premium-section']}>
              <Text style={styles['product-details-premium-section-title']}>
                Specifications
              </Text>
              {product.specifications.map((spec, index) => (
                <View key={index} style={styles['product-details-premium-spec-row']}>
                  <Text style={styles['product-details-premium-spec-key']}>
                    {spec.key}
                  </Text>
                  <Text style={styles['product-details-premium-spec-value']}>
                    {spec.value}
                  </Text>
                </View>
              ))}
            </View>
          )}

          <View style={styles['product-details-premium-spacer']} />
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles['product-details-premium-bottom-bar']}>
        <View style={styles['product-details-premium-quantity-selector']}>
          <TouchableOpacity
            style={styles['product-details-premium-qty-btn']}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Icon name="remove" size={18} color="#0A84FF" />
          </TouchableOpacity>
          <Text style={styles['product-details-premium-qty-value']}>
            {quantity}
          </Text>
          <TouchableOpacity
            style={styles['product-details-premium-qty-btn']}
            onPress={() => setQuantity(Math.min(product.stock, quantity + 1))}
          >
            <Icon name="add" size={18} color="#0A84FF" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles['product-details-premium-add-to-cart-btn'],
            product.stock === 0 && styles['product-details-premium-btn-disabled']
          ]}
          onPress={handleAddToCart}
          disabled={product.stock === 0}
          activeOpacity={0.8}
        >
          <Icon name="cart-outline" size={20} color="#fff" />
          <Text style={styles['product-details-premium-add-to-cart-text']}>
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailsScreen;