import * as React from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import { DictionaryProvider } from "./dictionary.context";
import Game from "./components/Game";
import Footer from "./components/Footer";

export default function App() {
  return (
    <View style={styles.container}>
      <DictionaryProvider>
        <Game />
        <Footer />
        <StatusBar style="auto" />
      </DictionaryProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  promptLetters: {
    fontSize: 120,
  },
});
