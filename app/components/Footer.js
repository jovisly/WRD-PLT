import * as React from "react";
import { Text, View } from "react-native";

export default function Footer() {
  return (
    <View style={{ position: "absolute", alignSelf: "center", bottom: "5%" }}>
      <Text> © Ovisly 2022 </Text>
    </View>
  );
}
