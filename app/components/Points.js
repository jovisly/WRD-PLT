import React, { useContext } from "react";

import { Dimensions, Text, View } from "react-native";
import {
  ActivityIndicator,
  Colors,
  IconButton,
  ProgressBar,
} from "react-native-paper";

export default function Points({ points, pointsLetters }) {
  const windowWidth = Dimensions.get("window").width;

  return (
    <View
      style={{
        alignItems: "flex-end",
        justifyContent: "flex-end",
        height: windowWidth >= 700 ? 180 : null,
      }}
    >
      <Text style={{ fontSize: 18 }}>Total points: {points}</Text>

      <Text style={{ fontSize: 18 }}>
        Points these letters: {pointsLetters}
      </Text>

      <View style={{ height: 24 }} />
    </View>
  );
}
