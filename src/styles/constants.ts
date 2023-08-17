import { TextStyle } from "react-native";
import { borderColor, iconColor } from "./colors";
import { fontSize } from "./fonts";

export const subTitleStyle: TextStyle = {
    fontSize: fontSize.xmedium,
    color: borderColor,
    fontWeight: "600"
}

export const key: TextStyle = {
    fontSize: fontSize.xSmall,
    color: iconColor,
    textAlign: "center"
}