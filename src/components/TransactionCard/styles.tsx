import colors from "@/src/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgrounds.medium,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  iconContainer: {
    backgroundColor: colors.backgrounds.light,
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  rightContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  date: {
    color: colors.textsAndIcons.dark,
    marginTop: 4,
  },
  menuButton: {
    padding: 4,
  },
  menuContent: {
    backgroundColor: colors.backgrounds.light,
    borderRadius: 8,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 8,
  },
  menuItemText: {
    color: colors.textsAndIcons.main,
  },
  noteModal: {
    position: "absolute",
    minWidth: 200,
    top: "50%",
    left: "30%",
    backgroundColor: colors.backgrounds.light,
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  noteModalCloseButton: {
    alignSelf: "flex-end",
  },
  noteModalContent: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
});
