import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import colors from '@/src/constants/colors';
import { FlexBox } from '@/src/components/FlexBox';
import { FlexBetween } from '@/src/components/FlexBox/FlexBetween';
import Typography from '@/src/components/Typography';
import TransactionCard from '@/src/components/TransactionCard';
import { AppButton } from '@/src/components/Button';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

type TransactionType = {
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}

const Transactions = () => {
  const [selectedTab, setSelectedTab] = useState<'income' | 'expense'>('income');
  
  const transactions: TransactionType[] = [
    {
      type: 'income',
      amount: 5500.00,
      category: 'Salario principal',
      description: 'Pago mensual',
      date: '20 Oct 2025'
    },
    {
      type: 'expense',
      amount: 200.00,
      category: 'Servicios públicos',
      description: 'Pago de electricidad',
      date: '20 Oct 2025'
    },
  ];

  const handleTabPress = (tab: 'income' | 'expense') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedTab(tab);
  };

  return (
    <View style={styles.container}>
      <FlexBox style={styles.tabContainer}>
        <Pressable 
          style={[styles.tab, selectedTab === 'income' && styles.tabActive]}
          onPress={() => handleTabPress('income')}
        >
          <Typography.H6.SemiBold styles={[styles.tabText, selectedTab === 'income' && styles.tabTextActive]}>
            Ingresos
          </Typography.H6.SemiBold>
        </Pressable>
        <Pressable 
          style={[styles.tab, selectedTab === 'expense' && styles.tabActive]}
          onPress={() => handleTabPress('expense')}
        >
          <Typography.H6.SemiBold styles={[styles.tabText, selectedTab === 'expense' && styles.tabTextActive]}>
            Egresos
          </Typography.H6.SemiBold>
        </Pressable>
      </FlexBox>

      <FlexBetween style={styles.filterContainer}>
        <AppButton
          title="Categoría"
          variant="outlined"
          nameIcon="arrow-drop-down"
          textAndIconColor={colors.textsAndIcons.main}
        />
        <AppButton
          title="Tipo de pago"
          variant="outlined"
          nameIcon="arrow-drop-down"
          textAndIconColor={colors.textsAndIcons.main}
        />
      </FlexBetween>

      <ScrollView style={styles.transactionList}>
        <FlexBox style={{ gap: 8, padding: 16 }}>
          {transactions
            .filter(t => t.type === selectedTab)
            .map((transaction, idx) => (
              <TransactionCard
                key={idx}
                type={transaction.type}
                amount={transaction.amount}
                category={transaction.category}
                description={transaction.description}
                date={transaction.date}
              />
            ))}
        </FlexBox>
      </ScrollView>

      <Pressable 
        style={styles.fab}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }}
      >
        <MaterialIcons name="add" size={24} color={colors.textsAndIcons.onColor} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgrounds.medium,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.backgrounds.light,
    padding: 4,
    margin: 16,
    borderRadius: 8,
  },
  tab: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: colors.primary.main,
  },
  tabText: {
    color: colors.textsAndIcons.main,
  },
  tabTextActive: {
    color: colors.textsAndIcons.onColor,
  },
  filterContainer: {
    padding: 16,
    gap: 8
  },
  transactionList: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: colors.primary.main,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }
});

export default Transactions;