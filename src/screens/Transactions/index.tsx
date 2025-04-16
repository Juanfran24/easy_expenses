import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import colors from '@/src/constants/colors';
import { FlexBox } from '@/src/components/FlexBox';
import { FlexBetween } from '@/src/components/FlexBox/FlexBetween';
import TransactionCard from '@/src/components/TransactionCard';
import { AppButton } from '@/src/components/Button';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import TransactionTabs from '@/src/components/TransactionTabs';

type TransactionType = {
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}

const TRANSACTION_TABS = [
  { id: 'income', title: 'Ingresos' },
  { id: 'expense', title: 'Gastos' },
];

const Transactions = () => {
  const [selectedTabId, setSelectedTabId] = useState<string>('income');
  
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

  const handleTabChange = (tabId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedTabId(tabId);
  };

  return (
    <View style={styles.container}>
      <TransactionTabs 
        tabs={TRANSACTION_TABS}
        selectedTabId={selectedTabId}
        onTabChange={handleTabChange}
      />

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
            .filter(t => t.type === selectedTabId)
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
          console.log('FAB Pressed');
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