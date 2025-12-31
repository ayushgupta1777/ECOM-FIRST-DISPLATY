// ============================================
// mobile/src/screens/reseller/WalletScreen.js
// ============================================
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../../styling/screens/reseller/WalletPremiumStyles';

const WalletScreen = ({ navigation }) => {
  // Mock data
  const wallet = {
    balance: 2500,
    pendingBalance: 500,
    totalEarned: 15000,
    totalWithdrawn: 12500
  };

  const transactions = [
    { id: '1', type: 'credit', source: 'commission', amount: 150, date: '2024-01-15', description: 'Order #ORD123', status: 'completed' },
    { id: '2', type: 'debit', source: 'withdrawal', amount: 1000, date: '2024-01-14', description: 'Bank transfer', status: 'completed' },
    { id: '3', type: 'credit', source: 'commission', amount: 200, date: '2024-01-13', description: 'Order #ORD122', status: 'completed' },
    { id: '4', type: 'credit', source: 'commission', amount: 350, date: '2024-01-12', description: 'Order #ORD121', status: 'pending' },
  ];

  const handleWithdraw = () => {
    navigation.navigate('WithdrawRequest');
  };

  const renderTransaction = ({ item }) => (
    <View style={styles['wallet-premium-transaction-item']}>
      <View style={[
        styles['wallet-premium-transaction-icon'],
        { backgroundColor: item.type === 'credit' ? '#E8F5E9' : '#FEE2E2' }
      ]}>
        <Icon
          name={item.type === 'credit' ? 'arrow-down' : 'arrow-up'}
          size={24}
          color={item.type === 'credit' ? '#34C759' : '#EF4444'}
        />
      </View>
      <View style={styles['wallet-premium-transaction-details']}>
        <Text style={styles['wallet-premium-transaction-title']}>{item.description}</Text>
        <Text style={styles['wallet-premium-transaction-date']}>{item.date}</Text>
      </View>
      <View style={styles['wallet-premium-transaction-right']}>
        <Text style={[
          styles['wallet-premium-transaction-amount'],
          { color: item.type === 'credit' ? '#34C759' : '#EF4444' }
        ]}>
          {item.type === 'credit' ? '+' : '-'}₹{item.amount}
        </Text>
        {item.status === 'pending' && (
          <Text style={styles['wallet-premium-transaction-status']}>Pending</Text>
        )}
      </View>
    </View>
  );

  return (
    <ScrollView 
      style={styles['wallet-premium-container']}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles['wallet-premium-header']}>
        <TouchableOpacity 
          style={styles['wallet-premium-back-btn']}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles['wallet-premium-header-title']}>My Wallet</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Balance Card */}
      <View style={styles['wallet-premium-balance-section']}>
        <View style={styles['wallet-premium-balance-card']}>
          <View style={styles['wallet-premium-balance-header']}>
            <View>
              <Text style={styles['wallet-premium-balance-label']}>Available Balance</Text>
              <Text style={styles['wallet-premium-balance-amount']}>₹{wallet.balance}</Text>
              <Text style={styles['wallet-premium-balance-pending']}>
                Pending: ₹{wallet.pendingBalance}
              </Text>
            </View>
            <View style={styles['wallet-premium-balance-icon']}>
              <Icon name="wallet" size={48} color="#0A84FF" />
            </View>
          </View>

          <TouchableOpacity 
            style={styles['wallet-premium-withdraw-btn']} 
            onPress={handleWithdraw}
          >
            <Text style={styles['wallet-premium-withdraw-text']}>Withdraw Money</Text>
            <Icon name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Cards */}
      <View style={styles['wallet-premium-stats-section']}>
        <View style={styles['wallet-premium-stat-card']}>
          <View style={styles['wallet-premium-stat-icon-container']}>
            <Icon name="trending-up" size={28} color="#34C759" />
          </View>
          <View style={styles['wallet-premium-stat-content']}>
            <Text style={styles['wallet-premium-stat-label']}>Total Earned</Text>
            <Text style={styles['wallet-premium-stat-value']}>₹{wallet.totalEarned}</Text>
          </View>
        </View>

        <View style={styles['wallet-premium-stat-card']}>
          <View style={styles['wallet-premium-stat-icon-container']}>
            <Icon name="arrow-up-circle" size={28} color="#5E5CE6" />
          </View>
          <View style={styles['wallet-premium-stat-content']}>
            <Text style={styles['wallet-premium-stat-label']}>Total Withdrawn</Text>
            <Text style={styles['wallet-premium-stat-value']}>₹{wallet.totalWithdrawn}</Text>
          </View>
        </View>
      </View>

      {/* Transactions Section */}
      <View style={styles['wallet-premium-transactions-section']}>
        <Text style={styles['wallet-premium-section-title']}>Recent Transactions</Text>
        
        {transactions.map((item) => (
          <View key={item.id}>
            {renderTransaction({ item })}
          </View>
        ))}
      </View>

      <View style={{ height: 32 }} />
    </ScrollView>
  );
};

export default WalletScreen;