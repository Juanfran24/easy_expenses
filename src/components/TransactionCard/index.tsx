import React from 'react';
import { View, StyleSheet } from 'react-native';
import Typography from '../Typography';
import colors from '@/src/constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { FlexBetween } from '../FlexBox/FlexBetween';

interface TransactionCardProps {
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
  type,
  amount,
  category,
  description,
  date,
}) => {
  const isIncome = type === 'income';

  return (
    <View style={styles.card}>
      <FlexBetween>
        <View style={styles.iconContainer}>
          <MaterialIcons
            name={isIncome ? 'arrow-downward' : 'arrow-upward'}
            size={24}
            color={isIncome ? colors.complements.green : colors.error.main}
          />
        </View>

        <View style={styles.contentContainer}>
          <Typography.H6.SemiBold>{category}</Typography.H6.SemiBold>
          <Typography.P3.Regular styles={styles.description}>
            {description}
          </Typography.P3.Regular>
          <Typography.P4.Regular styles={styles.date}>{date}</Typography.P4.Regular>
        </View>

        <Typography.H6.SemiBold
          styles={{
            color: isIncome ? colors.complements.green : colors.error.main,
          }}
        >
          {isIncome ? '+' : '-'}${amount.toFixed(2)}
        </Typography.H6.SemiBold>
      </FlexBetween>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgrounds.light,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  iconContainer: {
    backgroundColor: colors.backgrounds.medium,
    borderRadius: 8,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  description: {
    color: colors.textsAndIcons.dark,
    marginTop: 4,
  },
  date: {
    color: colors.textsAndIcons.dark,
    marginTop: 4,
  },
});

export default TransactionCard;