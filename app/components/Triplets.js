import React, { useContext } from "react";

import { Text, View } from "react-native";
import {
  ActivityIndicator,
  Colors,
  IconButton,
  ProgressBar,
} from "react-native-paper";

import { DictionaryContext } from "../dictionary.context";

const IsLoadingIndicator = () => {
  const styleView = {
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <View style={styleView}>
      <View style={{ height: 36 }} />
      <ActivityIndicator size={50} animating={true} color={Colors.blue300} />
      <View style={{ height: 12 }} />
      <Text style={{ fontSize: 14, color: Colors.blue800 }}>
        {"Loading dictionary..."}
      </Text>
    </View>
  );
};

export default function Triplets({
  promptLetters,
  refreshTriplets,
  pointsLetters,
}) {
  const { isLoadingDictionary } = useContext(DictionaryContext);

  return (
    <View style={{ width: 320, height: 180 }}>
      {isLoadingDictionary && <IsLoadingIndicator />}

      {!isLoadingDictionary && (
        <>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {promptLetters.split("").map((letter, index) => (
              <Text key={index} style={{ fontSize: 120 }}>
                {letter}
              </Text>
            ))}
            <View style={{ width: 30 }}>
              <IconButton
                icon="refresh"
                color={Colors.grey600}
                size={30}
                onPress={refreshTriplets}
              />
            </View>
          </View>
          <ProgressBar progress={pointsLetters / 100} color={Colors.blue300} />
        </>
      )}
    </View>
  );
}
