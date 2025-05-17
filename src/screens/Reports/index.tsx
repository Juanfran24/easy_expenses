import { FlexBox } from "@/src/components/FlexBox";
import StackedBarChart from "@/src/components/StackedBarChart";
import Typography from "@/src/components/Typography";
import colors from "@/src/constants/colors";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const Reports = () => {
  const barChartData = [
    {
      stacks: [
        {
          value: 500000,
          color: colors.success,
        },
        {
          value: 250000,
          color: colors.error.main,
        },
      ],
      label: "Ene",
    },
    {
      stacks: [
        {
          value: 300000,
          color: colors.success,
        },
        {
          value: 200000,
          color: colors.error.main,
        },
      ],
      label: "Feb",
    },
    {
      stacks: [
        {
          value: 400000,
          color: colors.success,
        },
        {
          value: 100000,
          color: colors.error.main,
        },
      ],
      label: "Mar",
    },
  ];

  const legend = [
    {
      label: "Ingresos",
      color: colors.success,
    },
    {
      label: "Gastos",
      color: colors.error.main,
    },
  ];

  return (
    <View style={styles.primaryContainer}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }}>
        <View style={styles.balanceGeneralContainer}>
          <Typography.P2.Regular>Presupuesto del mes</Typography.P2.Regular>
          <Typography.H1 styles={{ color: colors.primary.medium }}>
            $ 2.500.000 COP
          </Typography.H1>
        </View>
        <View style={styles.secondContainer}>
          <FlexBox style={styles.balanceContainer}>
            <Typography.H6.SemiBold>Mes de Octubre</Typography.H6.SemiBold>
            <FlexBox style={{ gap: 24, flexDirection: "row" }}>
              <FlexBox style={styles.balanceAvailableContainer}>
                <Typography.P2.Regular>Saldo disponible</Typography.P2.Regular>
                <Typography.H3>$ 1.500.000</Typography.H3>
              </FlexBox>
              <FlexBox style={styles.balanceAvailableContainer}>
                <Typography.P2.Regular>Saldo gastado</Typography.P2.Regular>
                <Typography.H3>$ 1.000.000</Typography.H3>
              </FlexBox>
            </FlexBox>
          </FlexBox>
          <Typography.H6.SemiBold>Resumen por mes</Typography.H6.SemiBold>
          <FlexBox style={{ marginTop: 20 }}>
            <StackedBarChart
              data={barChartData}
              legend={legend}
              rulesType="solid"
              barWidth={20}
            />
          </FlexBox>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  primaryContainer: {
    flex: 1,
    backgroundColor: colors.backgrounds.medium,
    flexDirection: "column",
  },
  balanceGeneralContainer: {
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
    padding: 20,
    marginBottom: 50,
  },
  balanceContainer: {
    backgroundColor: colors.backgrounds.light,
    alignItems: "center",
    width: "100%",
    borderRadius: 24,
    padding: 16,
    gap: 16,
    marginBottom: 40,
  },
  balanceAvailableContainer: {
    alignItems: "center",
  },
});

export default Reports;
