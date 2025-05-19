import { FlexBox } from "@/src/components/FlexBox";
import StackedBarChart from "@/src/components/StackedBarChart";
import Typography from "@/src/components/Typography";
import colors from "@/src/constants/colors";
import React, { useEffect, useState, useMemo } from "react";
import { ScrollView, StyleSheet, View, ActivityIndicator } from "react-native";
import { useStore } from "@/src/store";
import { transformToCurrency } from "@/src/utils";
import DonutChartHome from "@/src/components/DonutChartHome";

const Reports = () => {
  const transactions = useStore((state) => state.transactions);
  const categories = useStore((state) => state.categories);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  // Obtener el mes actual (0-11)
  const currentMonth = new Date().getMonth();
  const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  const currentMonthName = monthNames[currentMonth];
  const fullMonthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const currentFullMonthName = fullMonthNames[currentMonth];

  useEffect(() => {
    const loadData = async () => {
      try {
        if (transactions.length === 0) {
          await useStore.getState().loadTransactions();
        }
        if (categories.length === 0) {
          await useStore.getState().loadCategories();
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Calcular estadísticas del mes actual
  const currentMonthStats = useMemo(() => {
    const now = new Date();
    const currentMonthTransactions = transactions.filter((tx) => {
      const txDate = tx.date instanceof Date ? tx.date : new Date(tx.date);
      return txDate.getMonth() === now.getMonth() && txDate.getFullYear() === now.getFullYear();
    });
    
    const incomeTotal = currentMonthTransactions
      .filter((tx) => tx.type === "ingreso")
      .reduce((acc, tx) => acc + tx.amount, 0);
    
    const expenseTotal = currentMonthTransactions
      .filter((tx) => tx.type === "gasto")
      .reduce((acc, tx) => acc + tx.amount, 0);
    
    const availableBalance = incomeTotal - expenseTotal;
    
    return {
      incomeTotal,
      expenseTotal,
      availableBalance,
    };
  }, [transactions]);

  // Generar datos para el gráfico de barras por mes
  const barChartData = useMemo(() => {
    const monthlyData = [];
    
    // Obtener los últimos 6 meses para mostrar
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    
    for (let i = 5; i >= 0; i--) {
      let targetMonth = currentMonth - i;
      let targetYear = currentYear;
      
      if (targetMonth < 0) {
        targetMonth += 12;
        targetYear -= 1;
      }
      
      const monthTransactions = transactions.filter((tx) => {
        const txDate = tx.date instanceof Date ? tx.date : new Date(tx.date);
        return txDate.getMonth() === targetMonth && txDate.getFullYear() === targetYear;
      });
      
      const incomeTotal = monthTransactions
        .filter((tx) => tx.type === "ingreso")
        .reduce((acc, tx) => acc + tx.amount, 0);
      
      const expenseTotal = monthTransactions
        .filter((tx) => tx.type === "gasto")
        .reduce((acc, tx) => acc + tx.amount, 0);
      
      monthlyData.push({
        stacks: [
          {
            value: incomeTotal,
            color: colors.success,
          },
          {
            value: expenseTotal,
            color: colors.error.main,
          },
        ],
        label: monthNames[targetMonth],
      });
    }
    
    return monthlyData;
  }, [transactions]);

  // Preparar datos para el gráfico de donut
  const donutChartData = useMemo(() => {
    // Si no hay transacciones, mostrar mensaje de "sin datos"
    if (transactions.length === 0) {
      return [{ value: 100, color: colors.textsAndIcons.light, type: "nodata", mount: 0 }];
    }
    
    // Obtener transacciones del mes actual
    const now = new Date();
    const currentMonthExpenses = transactions.filter((tx) => {
      const txDate = tx.date instanceof Date ? tx.date : new Date(tx.date);
      return txDate.getMonth() === now.getMonth() && 
             txDate.getFullYear() === now.getFullYear() && 
             tx.type === "gasto";
    });
    
    if (currentMonthExpenses.length === 0) {
      return [{ value: 100, color: colors.textsAndIcons.light, type: "nodata", mount: 0 }];
    }
    
    // Agrupar gastos por categoría
    const categoriesMap = new Map<string, { total: number, color: string, name: string }>();
    
    currentMonthExpenses.forEach((expense) => {
      const category = categories.find((cat) => cat.id === expense.category);
      if (!category || !category.id) return;
      
      const categoryId = category.id;
      
      if (!categoriesMap.has(categoryId)) {
        categoriesMap.set(categoryId, {
          total: 0,
          color: category.color || colors.primary.main,
          name: category.name,
        });
      }
      
      const categoryData = categoriesMap.get(categoryId);
      if (categoryData) {
        categoryData.total += expense.amount;
      }
    });
    
    // Convertir a formato de gráfico donut
    const result = Array.from(categoriesMap.values()).map(data => {
      return {
        value: data.total || 0,
        color: data.color || colors.primary.main,
        type: data.name || "Sin categoría",
        mount: data.total || 0,
      };
    });
    
    return result.length > 0 ? result : [{ value: 100, color: colors.textsAndIcons.light, type: "nodata", mount: 0 }];
  }, [transactions, categories]);

  // Leyenda para el gráfico de barras
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
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary.main} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }}>
          <View style={styles.balanceGeneralContainer}>
            <Typography.P2.Regular>Presupuesto del mes</Typography.P2.Regular>
            <Typography.H1 styles={{ color: colors.primary.medium }}>
              {transformToCurrency(String(currentMonthStats.incomeTotal))}
            </Typography.H1>
          </View>
          <View style={styles.secondContainer}>
            <FlexBox style={styles.balanceContainer}>
              <Typography.H6.SemiBold>Mes de {currentFullMonthName}</Typography.H6.SemiBold>
              <FlexBox style={{ gap: 24, flexDirection: "row" }}>
                <FlexBox style={styles.balanceAvailableContainer}>
                  <Typography.P2.Regular>Saldo disponible</Typography.P2.Regular>
                  <Typography.H3 styles={{ color: colors.success }}>
                    {transformToCurrency(String(currentMonthStats.availableBalance))}
                  </Typography.H3>
                </FlexBox>
                <FlexBox style={styles.balanceAvailableContainer}>
                  <Typography.P2.Regular>Saldo gastado</Typography.P2.Regular>
                  <Typography.H3 styles={{ color: colors.error.main }}>
                    {transformToCurrency(String(currentMonthStats.expenseTotal))}
                  </Typography.H3>
                </FlexBox>
              </FlexBox>
            </FlexBox>

            <Typography.P2.Regular>Resumen por mes</Typography.P2.Regular>
            <FlexBox style={{ marginTop: 20 }}>
              <StackedBarChart
                data={barChartData}
                legend={legend}
                rulesType="solid"
                barWidth={30}
                height={200}
              />
            </FlexBox>
            <View style={{ marginTop: 40}}>
              <Typography.H6.SemiBold> Distribución de gastos por categoría</Typography.H6.SemiBold>
            </View>
            <FlexBox style={{ marginTop: 20 }}>
              <DonutChartHome data={donutChartData} />
            </FlexBox>
            
            <FlexBox style={{ marginTop: 40 }}>
              <Typography.H6.SemiBold>Estadísticas del mes</Typography.H6.SemiBold>
              <FlexBox style={styles.statsContainer}>
                <FlexBox style={{ gap: 8 }}>
                  <Typography.P2.Regular>Total de ingresos:</Typography.P2.Regular>
                  <Typography.P1.SemiBold styles={{ color: colors.success }}>
                    {transformToCurrency(String(currentMonthStats.incomeTotal))}
                  </Typography.P1.SemiBold>
                </FlexBox>
                <FlexBox style={{ gap: 8 }}>
                  <Typography.P2.Regular>Total de gastos:</Typography.P2.Regular>
                  <Typography.P1.SemiBold styles={{ color: colors.error.main }}>
                    {transformToCurrency(String(currentMonthStats.expenseTotal))}
                  </Typography.P1.SemiBold>
                </FlexBox>
                <FlexBox style={{ gap: 8 }}>
                  <Typography.P2.Regular>Balance del mes:</Typography.P2.Regular>
                  <Typography.P1.SemiBold styles={{ 
                    color: currentMonthStats.incomeTotal - currentMonthStats.expenseTotal >= 0 
                      ? colors.success 
                      : colors.error.main 
                  }}>
                    {transformToCurrency(String(currentMonthStats.incomeTotal - currentMonthStats.expenseTotal))}
                  </Typography.P1.SemiBold>
                </FlexBox>
              </FlexBox>
            </FlexBox>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  primaryContainer: {
    flex: 1,
    backgroundColor: colors.backgrounds.medium,
    flexDirection: "column",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  statsContainer: {
    backgroundColor: colors.backgrounds.light,
    padding: 16,
    borderRadius: 16,
    width: "100%",
    marginTop: 10,
    gap: 12,
  },
});

export default Reports;
