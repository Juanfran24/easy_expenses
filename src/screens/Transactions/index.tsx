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
import { AppComboBox } from '@/src/components/Inputs/AppComboBox';

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

const CATEGORIES = [
  { label: 'Categorías', value: 'all' },
  { label: 'Salario principal', value: 'main_salary' },
  { label: 'Servicios públicos', value: 'utilities' },
  { label: 'Transporte', value: 'transport' },
  { label: 'Alimentación', value: 'food' },
];

const PAYMENT_TYPES = [
  { label: 'Tipo de pago', value: 'all' },
  { label: 'Efectivo', value: 'cash' },
  { label: 'Electrónico', value: 'credit_card' }
];

const SORT_OPTIONS = [
  { label: 'Más reciente', value: 'newest' },
  { label: 'Más antiguo', value: 'oldest' }
];

const Transactions = () => {
  const [selectedTabId, setSelectedTabId] = useState<string>('income');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPaymentType, setSelectedPaymentType] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<string>('newest');
  
  const transactions: TransactionType[] = [
    {
      type: 'income',
      amount: 5500.00,
      category: 'Salario principal',
      description: 'Pago mensual',
      date: '20 Oct 2025, 3:15pm'
    },
    {
      type: 'expense',
      amount: 200.00,
      category: 'Servicios públicos',
      description: 'Pago de electricidad',
      date: '20 Oct 2025, 3:15pm'
    },
    {
      type: 'income',
      amount: 5500.00,
      category: 'Salario principal',
      description: 'Pago mensual2',
      date: '20 Oct 2025, 3:15pm'
    },
    {
      type: 'expense',
      amount: 200.00,
      category: 'Servicios públicos',
      description: 'Pago de electricidad2',
      date: '20 Oct 2025, 3:15pm'
    },{
      type: 'income',
      amount: 5500.00,
      category: 'Salario principal',
      description: 'Pago mensual3',
      date: '20 Oct 2025, 3:15pm'
    },
    {
      type: 'expense',
      amount: 200.00,
      category: 'Servicios públicos',
      description: 'Pago de electricidad3',
      date: '20 Oct 2025, 3:15pm'
    }
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

      <FlexBetween style={[styles.filterContainer, {gap: 15}]}>
        <FlexBetween style={{ gap: 4, flex: 1 }}>
          <AppComboBox
            label="Categoría"
            value={selectedCategory}
            items={CATEGORIES}
            onSelect={(item) => setSelectedCategory(item.value)}
            containerStyle={{ flex: 1, height: 28 }}
            dropdownAlign="left"
          />
          <AppComboBox
            label="Tipo de pago"
            value={selectedPaymentType}
            items={PAYMENT_TYPES}
            onSelect={(item) => setSelectedPaymentType(item.value)}
            containerStyle={{ flex: 1, height: 28, marginLeft: 4 }}
            dropdownAlign="left"
          />
        </FlexBetween>
        <AppComboBox
          icon="sort"
          iconOnly={true}
          value={selectedSort}
          items={SORT_OPTIONS}
          onSelect={(item) => setSelectedSort(item.value)}
          containerStyle={{ marginLeft: 8, height: 28 }}
          dropdownAlign="right"
        />
      </FlexBetween>

      <ScrollView>
        <FlexBox style={{ paddingLeft: 16, paddingRight: 16}}>
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
    backgroundColor: colors.backgrounds.base,
  },
  filterContainer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
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