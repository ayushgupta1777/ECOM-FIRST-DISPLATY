// ============================================
// mobile/src/screens/reseller/WithdrawRequestScreen.js
// ============================================
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { requestPayout } from '../../redux/slices/resellerSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../../styling/screens/reseller/WithdrawRequestPremiumStyles';

const WithdrawRequestScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { wallet } = useSelector((state) => state.reseller);

  const [amount, setAmount] = useState('');
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    ifscCode: '',
    accountHolderName: '',
    bankName: ''
  });

  const minAmount = 500;
  const availableBalance = wallet?.balance || 2500; // Mock value

  const handleSubmit = () => {
    const withdrawAmount = parseFloat(amount);

    if (!withdrawAmount || withdrawAmount < minAmount) {
      Alert.alert('Error', `Minimum withdrawal amount is ₹${minAmount}`);
      return;
    }

    if (withdrawAmount > availableBalance) {
      Alert.alert('Error', 'Insufficient balance');
      return;
    }

    if (!bankDetails.accountNumber || !bankDetails.ifscCode || !bankDetails.accountHolderName) {
      Alert.alert('Error', 'Please fill all bank details');
      return;
    }

    dispatch(requestPayout({ amount: withdrawAmount, bankDetails })).then((result) => {
      if (result.payload) {
        Alert.alert(
          'Success',
          'Withdrawal request submitted successfully. It will be processed within 3-5 business days.',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      }
    });
  };

  const updateBankDetail = (field, value) => {
    setBankDetails({ ...bankDetails, [field]: value });
  };

  const quickAmounts = [500, 1000, 2000, availableBalance].filter(amt => amt <= availableBalance);

  return (
    <ScrollView 
      style={styles['withdraw-premium-container']}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles['withdraw-premium-header']}>
        <TouchableOpacity 
          style={styles['withdraw-premium-back-btn']}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles['withdraw-premium-header-title']}>Withdraw Money</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Available Balance Card */}
      <View style={styles['withdraw-premium-balance-card']}>
        <View style={styles['withdraw-premium-balance-icon']}>
          <Icon name="wallet" size={40} color="#0A84FF" />
        </View>
        <View style={styles['withdraw-premium-balance-content']}>
          <Text style={styles['withdraw-premium-balance-label']}>Available Balance</Text>
          <Text style={styles['withdraw-premium-balance-amount']}>₹{availableBalance}</Text>
          <Text style={styles['withdraw-premium-balance-note']}>
            Minimum withdrawal: ₹{minAmount}
          </Text>
        </View>
      </View>

      {/* Withdrawal Amount Section */}
      <View style={styles['withdraw-premium-section']}>
        <Text style={styles['withdraw-premium-section-title']}>Withdrawal Amount</Text>
        
        <View style={styles['withdraw-premium-input-group']}>
          <Text style={styles['withdraw-premium-label']}>Enter Amount</Text>
          <View style={styles['withdraw-premium-amount-input-container']}>
            <Text style={styles['withdraw-premium-currency']}>₹</Text>
            <TextInput
              style={styles['withdraw-premium-amount-input']}
              placeholder="0"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>
          <Text style={styles['withdraw-premium-hint']}>
            Enter amount between ₹{minAmount} and ₹{availableBalance}
          </Text>
        </View>

        {/* Quick Amount Buttons */}
        <View style={styles['withdraw-premium-quick-amounts']}>
          {quickAmounts.map((quickAmount) => (
            <TouchableOpacity
              key={quickAmount}
              style={[
                styles['withdraw-premium-quick-btn'],
                amount === quickAmount.toString() && styles['withdraw-premium-quick-btn-active']
              ]}
              onPress={() => setAmount(quickAmount.toString())}
            >
              <Text style={[
                styles['withdraw-premium-quick-text'],
                amount === quickAmount.toString() && styles['withdraw-premium-quick-text-active']
              ]}>
                ₹{quickAmount}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Bank Details Section */}
      <View style={styles['withdraw-premium-section']}>
        <Text style={styles['withdraw-premium-section-title']}>Bank Account Details</Text>

        <View style={styles['withdraw-premium-input-group']}>
          <Text style={styles['withdraw-premium-label']}>Account Holder Name</Text>
          <View style={styles['withdraw-premium-input-container']}>
            <Icon name="person-outline" size={20} color="#9CA3AF" style={{ marginRight: 8 }} />
            <TextInput
              style={styles['withdraw-premium-input']}
              placeholder="As per bank records"
              placeholderTextColor="#9CA3AF"
              value={bankDetails.accountHolderName}
              onChangeText={(text) => updateBankDetail('accountHolderName', text)}
            />
          </View>
        </View>

        <View style={styles['withdraw-premium-input-group']}>
          <Text style={styles['withdraw-premium-label']}>Account Number</Text>
          <View style={styles['withdraw-premium-input-container']}>
            <Icon name="card-outline" size={20} color="#9CA3AF" style={{ marginRight: 8 }} />
            <TextInput
              style={styles['withdraw-premium-input']}
              placeholder="Enter account number"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              value={bankDetails.accountNumber}
              onChangeText={(text) => updateBankDetail('accountNumber', text)}
            />
          </View>
        </View>

        <View style={styles['withdraw-premium-input-group']}>
          <Text style={styles['withdraw-premium-label']}>IFSC Code</Text>
          <View style={styles['withdraw-premium-input-container']}>
            <Icon name="business-outline" size={20} color="#9CA3AF" style={{ marginRight: 8 }} />
            <TextInput
              style={styles['withdraw-premium-input']}
              placeholder="Enter IFSC code"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="characters"
              value={bankDetails.ifscCode}
              onChangeText={(text) => updateBankDetail('ifscCode', text.toUpperCase())}
            />
          </View>
        </View>

        <View style={styles['withdraw-premium-input-group']}>
          <Text style={styles['withdraw-premium-label']}>Bank Name</Text>
          <View style={styles['withdraw-premium-input-container']}>
            <Icon name="home-outline" size={20} color="#9CA3AF" style={{ marginRight: 8 }} />
            <TextInput
              style={styles['withdraw-premium-input']}
              placeholder="Enter bank name"
              placeholderTextColor="#9CA3AF"
              value={bankDetails.bankName}
              onChangeText={(text) => updateBankDetail('bankName', text)}
            />
          </View>
        </View>
      </View>

      {/* Important Note */}
      <View style={styles['withdraw-premium-info-card']}>
        <Icon name="information-circle" size={28} color="#0A84FF" />
        <View style={styles['withdraw-premium-info-content']}>
          <Text style={styles['withdraw-premium-info-title']}>Important Information</Text>
          <Text style={styles['withdraw-premium-info-text']}>
            • Withdrawals are processed within 3-5 business days{'\n'}
            • Ensure bank details are accurate{'\n'}
            • Minimum withdrawal: ₹{minAmount}{'\n'}
            • Bank transfer charges may apply
          </Text>
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity 
        style={styles['withdraw-premium-submit-btn']} 
        onPress={handleSubmit}
      >
        <Text style={styles['withdraw-premium-submit-text']}>Submit Request</Text>
        <Icon name="checkmark-circle" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={{ height: 32 }} />
    </ScrollView>
  );
};

export default WithdrawRequestScreen;