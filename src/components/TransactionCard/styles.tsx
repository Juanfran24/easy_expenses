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
    backgroundColor: colors.backgrounds.light,
    borderRadius: 12,
    padding: 20,
    width: "80%",
    maxWidth: 400,
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
    margin: -8,
    padding: 8,
  },
  noteModalContent: {
    marginTop: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  description: {
    marginTop: 4,
    marginLeft: 28,
  },
});
