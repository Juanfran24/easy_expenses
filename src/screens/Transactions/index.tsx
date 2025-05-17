import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Platform,
  ActivityIndicator,
  View,
} from "react-native";
import colors from "@/src/constants/colors";
import { FlexBox } from "@/src/components/FlexBox";
import TransactionCard from "@/src/components/TransactionCard";
import * as Haptics from "expo-haptics";
import TransactionTabs from "@/src/components/TransactionTabs";
import { AppComboBox } from "@/src/components/Inputs/AppComboBox";
import SpeedFabView from "@/src/components/FABButtom";
import {
  getUserTransactions,
  deleteTransaction,
} from "@/src/services/transactions";
import { Transaction } from "@/src/models/Transaction";
import Typography from "@/src/components/Typography";
import { Navigation, getCategoryTransaction } from "@/src/utils";
import { AppButton } from "@/src/components/AppButton";
import NoData from "@/src/components/NoData";
import { useStore } from "@/src/store";

const TRANSACTION_TABS = [
  { id: "income", title: "Ingresos" },
  { id: "expense", title: "Gastos" },
];

const PAYMENT_TYPES = [
  { label: "Tipo de pago", value: "all" },
  { label: "Efectivo", value: "cash" },
  { label: "Electrónico", value: "electronic" },
];

const SORT_OPTIONS = [
  { label: "Más reciente", value: "newest" },
  { label: "Más antiguo", value: "oldest" },
];

const Transactions = () => {
  const navigation = Navigation();
  const [selectedTabId, setSelectedTabId] = useState<string>("income");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPaymentType, setSelectedPaymentType] = useState<string>("all");
  const [selectedSort, setSelectedSort] = useState<string>("newest");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(
    null
  );
  
  const categories = useStore(state => state.categories);

  const handleTabChange = (tabId: string) => {
    if (Platform.OS === "web") return setSelectedTabId(tabId);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedTabId(tabId);
  };

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const transactionsData = await getUserTransactions();
      setTransactions(transactionsData);
    } catch (error) {
      console.error("Error al obtener transacciones:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      await deleteTransaction(id);
      setTransactions((prev) =>
        prev.filter((transaction) => transaction.id !== id)
      );
    } catch (error) {}
  };

  const confirmDeleteTransaction = (id: string) => {
    setTransactionToDelete(id);
    setIsModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (transactionToDelete) {
      await handleDeleteTransaction(transactionToDelete);
      setTransactionToDelete(null);
      setIsModalVisible(false);
    }
  };

  const getFilteredTransactions = () => {
    return transactions
      .filter((transaction) => {
        const tabType = selectedTabId === "income" ? "ingreso" : "gasto";
        if (transaction.type !== tabType) return false;
        if (
          selectedCategory !== "all" &&
          transaction.category !== selectedCategory
        )
          return false;
        if (
          selectedPaymentType !== "all" &&
          transaction.paymentMethod !== selectedPaymentType
        )
          return false;
        return true;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return selectedSort === "newest" ? dateB - dateA : dateA - dateB;
      });
  };

  const getCategoryItems = () => {
    const tabType = selectedTabId === "income" ? "Ingreso" : "Gasto";
    const filteredCategories = categories.filter(
      (category) => category.type === tabType
    );

    const categoryItems = filteredCategories.map((category) => ({
      label: category.name,
      value: category.id || "",
    }));

    return [{ label: "Categorías", value: "all" }, ...categoryItems];
  };

  // Usamos la función utilitaria desde utils/index.ts

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <>
      <ScrollView style={styles.container}>
        <TransactionTabs
          tabs={TRANSACTION_TABS}
          selectedTabId={selectedTabId}
          onTabChange={handleTabChange}
        />

        <FlexBox style={styles.filterContainer}>
          <FlexBox style={{ flexDirection: "row", gap: 15 }}>
            <AppComboBox
              label="Categoría"
              value={selectedCategory}
              items={getCategoryItems()}
              onSelect={(item) => setSelectedCategory(item.value)}
              dropdownAlign="left"
            />
            <AppComboBox
              label="Tipo de pago"
              value={selectedPaymentType}
              items={PAYMENT_TYPES}
              onSelect={(item) => setSelectedPaymentType(item.value)}
              dropdownAlign="left"
            />
          </FlexBox>
          <FlexBox style={{ alignSelf: "flex-end" }}>
            <AppComboBox
              icon="sort"
              iconOnly
              value={selectedSort}
              items={SORT_OPTIONS}
              onSelect={(item) => setSelectedSort(item.value)}
              dropdownAlign="right"
            />
          </FlexBox>
        </FlexBox>

        <FlexBox style={{ flex: 1, paddingLeft: 16, paddingRight: 16 }}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary.main} />
            </View>
          ) : getFilteredTransactions().length > 0 ? (
            getFilteredTransactions().map((transaction) => (
              <View key={transaction.id} style={{ marginBottom: 16 }}>
                <TransactionCard
                  transaction={transaction}
                  categoryName={getCategoryTransaction(transaction.category, categories)}
                  onEdit={(tx) => {
                    const serializedTx = {
                      ...tx,
                      date:
                        tx.date instanceof Date
                          ? tx.date.toISOString()
                          : tx.date,
                      createdAt:
                        tx.createdAt instanceof Date
                          ? tx.createdAt.toISOString()
                          : tx.createdAt,
                      updatedAt:
                        tx.updatedAt instanceof Date
                          ? tx.updatedAt.toISOString()
                          : tx.updatedAt,
                      endDate:
                        tx.endDate instanceof Date
                          ? tx.endDate.toISOString()
                          : tx.endDate,
                    };

                    navigation.navigate("CreateAndEditTransactions", {
                      type: tx.type,
                      isEditing: true,
                      transaction: serializedTx,
                    });
                  }}
                  onDelete={(id) => confirmDeleteTransaction(id)}
                />
              </View>
            ))
          ) : (
            <FlexBox style={{ marginTop: 200 }}>
              <NoData
                icon="announcement"
                title="No hay transacciones disponibles."
                style={{ marginTop: 20 }}
              />
            </FlexBox>
          )}
        </FlexBox>
      </ScrollView>
      <SpeedFabView />
      {isModalVisible && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Typography.H6.SemiBold styles={{ marginBottom: 16 }}>
              Confirmar eliminación
            </Typography.H6.SemiBold>
            <Typography.P4.Regular styles={{ marginBottom: 24 }}>
              ¿Estás seguro de que deseas eliminar esta transacción?
            </Typography.P4.Regular>
            <FlexBox style={{ flexDirection: "row", gap: 16 }}>
              <AppButton
                title="Cancelar"
                onPress={() => setIsModalVisible(false)}
                variant="outlined"
              />
              <AppButton
                title="Eliminar"
                onPress={handleConfirmDelete}
                variant="contained"
              />
            </FlexBox>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgrounds.base,
  },
  filterContainer: {
    padding: 16,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 32,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 32,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary.main,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: colors.primary.main,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: colors.backgrounds.base,
    padding: 24,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Transactions;
