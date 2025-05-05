import { AppButton } from "@/src/components/AppButton";
import DonutChartHome from "@/src/components/DonutChartHome";
import SpeedFabView from "@/src/components/FABButtom";
import { FlexBox } from "@/src/components/FlexBox";
import TransactionCard from "@/src/components/TransactionCard";
import Typography from "@/src/components/Typography";
import colors from "@/src/constants/colors";
import { Navigation } from "@/src/utils";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { TransactionType } from "../Transactions/interfaces";
import NotificationCard from "@/src/components/NotificationCard";
import { Transaction } from "@/src/models/Transaction";

const Home = () => {
  const navigation = Navigation();
  const pieData = [
    {
      value: 40,
      type: "expense",
      mount: "3500000",
      color: colors.error.main,
      text: "40%",
      shiftTextX: -22,
    },
    {
      value: 60,
      type: "income",
      mount: "5000000",
      color: colors.success,
      text: "60%",
      shiftTextX: -5,
      shiftTextY: 30,
    },
  ];

  const transactions: TransactionType[] = [
    {
      id: "1",
      type: "income",
      amount: 2500000,
      category: "Salario principal",
      name: "Pago mensual",
      date: "20 Oct 2025, 3:15pm",
    },
    {
      id: "2",
      type: "expense",
      amount: 200000,
      category: "Servicios públicos",
      name: "Pago de electricidad",
      date: "20 Oct 2025, 3:15pm",
    },
    {
      id: "3",
      type: "income",
      amount: 500000,
      category: "Salario principal",
      name: "Pago mensual2",
      date: "20 Oct 2025, 3:15pm",
    },
  ];

  return (
    <View style={styles.primaryContainer}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }}>
        <FlexBox style={styles.balanceContainer}>
          <Typography.H6.Regular>Saldo Disponible</Typography.H6.Regular>
          <Typography.H1 styles={{ color: colors.primary.medium }}>
            $ 1.500.000 COP
          </Typography.H1>
        </FlexBox>
        <View style={styles.secondContainer}>
          <Typography.H5.SemiBold>
            Ingresos vs gastos del mes
          </Typography.H5.SemiBold>
          <DonutChartHome data={pieData} />
          <FlexBox style={styles.transactionsRecentsContainer}>
            <Typography.H5.SemiBold>
              Transacciones recientes
            </Typography.H5.SemiBold>
            <FlexBox style={{ gap: 10, width: "100%" }}>
              {transactions.map((transaction, index) => (
                <TransactionCard
                  // transaction={transaction}
                  key={index}
                  // type={transaction.type}
                  // amount={transaction.amount}
                  // category={transaction.category}
                  // description={transaction.description}
                  // date={transaction.date}
                  transaction={
                    {
                      type: transaction.type,
                      amount: transaction.amount,
                      category: transaction.category,
                      description: transaction.description,
                      date: new Date(transaction.date),
                    } as Transaction
                  }
                />
              ))}
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
    top: 50,
    gap: 8,
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
});
