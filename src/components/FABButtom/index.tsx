import colors from "@/src/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Modal } from "react-native";
import Typography from "../Typography";
import Divider from "../Divider";
import { Navigation } from "@/src/utils";

const SpeedFabView = () => {
  const [showSpeedDial, setSpeedDial] = useState(false);
  const openSpeedDial = () => setSpeedDial(!showSpeedDial);
  const navigation = Navigation();

  const handleNewTransaction = (type: string) => {
    // // Handle new transaction logic here
    // console.log(`New ${type} transaction`);
    if (type === "ingreso") {
      navigation.navigate("CreateAndEditTransactions", {
        type: "ingreso",
      });
    } else if (type === "gasto") {
      navigation.navigate("CreateAndEditTransactions", {
        type: "gasto",
      });
    }
    // Close the speed dial after selecting an option
    setSpeedDial(false);
  };

  return (
    <View style={styles.container}>
      <Modal
        transparent
        visible={showSpeedDial}
        animationType="fade"
        onRequestClose={openSpeedDial}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.3)",
            justifyContent: "flex-end",
          }}
          onPressOut={openSpeedDial}
        >
          <View style={styles.speedView}>
            <TouchableOpacity
              style={styles.fabItem}
              onPress={() => handleNewTransaction("ingreso")}
            >
              <Typography.H6.Regular>Nuevo Ingreso</Typography.H6.Regular>
              <MaterialIcons
                name="arrow-upward"
                size={24}
                color={colors.textsAndIcons.main}
              />
            </TouchableOpacity>
            <Divider
              style={{ marginHorizontal: 0, marginVertical: 18, width: 181 }}
            />
            <TouchableOpacity
              style={{ ...styles.fabItem, marginLeft: 10 }}
              onPress={() => handleNewTransaction("gasto")}
            >
              <Typography.H6.Regular>Nuevo Gasto</Typography.H6.Regular>
              <MaterialIcons
                name="arrow-downward"
                size={24}
                color={colors.textsAndIcons.main}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      <FabButton onPress={openSpeedDial} showSpeedDial={showSpeedDial} />
    </View>
  );
};

const FabButton = ({ onPress, showSpeedDial }: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.fabButton, styles.shadow]}
    >
      {!showSpeedDial ? (
        <MaterialIcons
          name="add"
          size={30}
          color={colors.textsAndIcons.onColor}
        />
      ) : (
        <MaterialIcons
          name="close"
          size={24}
          color={colors.textsAndIcons.onColor}
        />
      )}
    </TouchableOpacity>
  );
};
export default SpeedFabView;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 20,
    bottom: 85,
    alignItems: "flex-end",
  },
  fabButton: {
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: colors.primary.main,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 23,
    textAlign: "center",
  },
  speedView: {
    paddingVertical: 8,
    alignSelf: "flex-end",
    marginRight: 26,
    marginBottom: 160,
    alignItems: "center",
  },
  fabItem: {
    flexDirection: "row",
    gap: 10,
  },
});
