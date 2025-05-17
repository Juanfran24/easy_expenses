import { AppButton } from "@/src/components/AppButton";
import DonutChartHome from "@/src/components/DonutChartHome";
import SpeedFabView from "@/src/components/FABButtom";
import { FlexBox } from "@/src/components/FlexBox";
import TransactionCard from "@/src/components/TransactionCard";
import Typography from "@/src/components/Typography";
import colors from "@/src/constants/colors";
import { Navigation } from "@/src/utils";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import NotificationCard from "@/src/components/NotificationCard";
import { Transaction } from "@/src/models/Transaction";
import { useAuth } from "@/src/context/AuthContext/useAuth";
import { User } from "firebase/auth";
import { getUserTransactions } from "@/src/services/transactions";
import { transformToCurrency } from "@/src/utils";

const Home = () => {
  const { user } = useAuth();
  const { displayName } = user as User;
  const navigation = Navigation();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [balance, setBalance] = useState<number>(0);
  const [pieData, setPieData] = useState<any[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const userTransactions = await getUserTransactions();
      setTransactions(userTransactions);
      calculateBalanceAndChartData(userTransactions);
      getRecentTransactions(userTransactions);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setLoading(false);
    }
  };

  const calculateBalanceAndChartData = (transactions: Transaction[]) => {
    let totalIncome = 0;
    let totalExpenses = 0;
    transactions.forEach((transaction) => {
      if (transaction.type === 'ingreso') {
        totalIncome += transaction.amount;
      } else if (transaction.type === 'gasto') {
        totalExpenses += transaction.amount;
      }
    });
    const availableBalance = totalIncome - totalExpenses;
    setBalance(availableBalance);

    if (totalIncome === 0 && totalExpenses === 0) {
      const chartData = [
        {
          value: 100,
          type: "nodata",
          mount: "0",
          color: colors.textsAndIcons.dark,
          text: "100%",
          shiftTextX: -22,
        }
      ];
      setPieData(chartData);
      return;
    }

    const total = totalIncome + totalExpenses;
    const incomePercentage = total > 0 ? Math.round((totalIncome / total) * 100) : 0;
    const expensePercentage = total > 0 ? 100 - incomePercentage : 0;

    const chartData = [
      {
        value: expensePercentage,
        type: "expense",
        mount: totalExpenses.toString(),
        color: colors.error.main,
        text: `${expensePercentage}%`,
        shiftTextX: -22,
      },
      {
        value: incomePercentage,
        type: "income",
        mount: totalIncome.toString(),
        color: colors.success,
        text: `${incomePercentage}%`,
        shiftTextX: -5,
        shiftTextY: 30,
      },
    ];

    setPieData(chartData);
  };

  const getRecentTransactions = (transactions: Transaction[]) => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const currentMonthTransactions = transactions.filter(
      (transaction) => transaction.date >= firstDayOfMonth
    );
    const sortedTransactions = currentMonthTransactions.sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );
    setRecentTransactions(sortedTransactions.slice(0, 3));
  };
  
  const renderPercentages = () => {
    if (pieData.length === 1 && pieData[0].type === "nodata") return null;
    
    return (
      <FlexBox style={styles.percentagesContainer}>
        {pieData.map((item, index) => (
          <View key={index} style={styles.percentageItem}>
            <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
            <Typography.H6.SemiBold
              styles={{
                color: item.type === "expense" ? colors.error.main : colors.success,
              }}
            >
              {item.text}
            </Typography.H6.SemiBold>
          </View>
        ))}
      </FlexBox>
    );
  };

  return (
    <View style={styles.primaryContainer}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }}>
        <FlexBox style={styles.balanceContainer}>
          <Typography.P2.Regular>
            ¡Hola,{" "}
            {<Typography.P2.SemiBold>{displayName}</Typography.P2.SemiBold>}!
          </Typography.P2.Regular>
          <Typography.H6.Regular>Tu saldo disponible es:</Typography.H6.Regular>
          <Typography.H1
            styles={{ color: colors.primary.medium, marginTop: 5 }}
          >
            {transformToCurrency(balance.toString())} COP
          </Typography.H1>
        </FlexBox>
        <View style={styles.secondContainer}>
          {renderPercentages()}
          <Typography.H5.SemiBold>
            Ingresos vs gastos del mes
          </Typography.H5.SemiBold>
          <DonutChartHome data={pieData} />
          <FlexBox style={styles.transactionsRecentsContainer}>
            <Typography.H5.SemiBold>
              Transacciones recientes
            </Typography.H5.SemiBold>
            <FlexBox style={{ gap: 10, width: "100%" }}>
              {recentTransactions.length > 0 ? (
                recentTransactions.map((transaction, index) => (
                  <TransactionCard
                    key={index}
                    transaction={transaction}
                    withoutActions
                  />
                ))
              ) : (
                <Typography.P2.Regular>
                  No hay transacciones recientes este mes
                </Typography.P2.Regular>
              )}
            </FlexBox>
            <AppButton
              variant="text-icon"
              nameIcon="chevron-right"
              textAndIconColor={colors.primary.main}
              title="Ver más"
              onPress={() => {
                navigation.navigate("Home", {
                  screen: "Transacciones",
                });
              }}
            />
          </FlexBox>
          <NotificationCard
            title="¡Vence pronto!"
            description="Pago cuota deuda 1 - 10 Jul 2025"
          />
        </View>
      </ScrollView>
      <SpeedFabView />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  primaryContainer: {
    flex: 1,
    backgroundColor: colors.backgrounds.medium,
    flexDirection: "column",
  },
  balanceContainer: {
    alignSelf: "center",
    alignItems: "center",
    top: 45,
  },
  secondContainer: {
    marginTop: 88,
    flex: 1,
    backgroundColor: colors.backgrounds.base,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    alignItems: "center",
    padding: 24,
    marginBottom: 50,
  },
  transactionsRecentsContainer: {
    width: "100%",
    backgroundColor: colors.backgrounds.medium,
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 16,
    marginTop: 32,
    gap: 18,
  },
  percentagesContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    marginBottom: 5,
  },
  percentageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  colorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
