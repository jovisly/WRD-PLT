import React, { useContext, useEffect, useRef, useState } from "react";

import { Animated, Dimensions, Easing, Text, View } from "react-native";
import { Colors, TextInput } from "react-native-paper";
import { DictionaryContext } from "../dictionary.context";

import Triplets from "./Triplets";
import Points from "./Points";

import { letters } from "../data/letters";

const animationProps = {
  useNativeDriver: false,
  duration: 500,
  easing: Easing.ease,
};

const isMatch = ({ word, promptLetters }) => {
  const letters = promptLetters.toLowerCase().split("");
  const pattern = "[a-z]*" + letters.join("+[a-z]*") + "+[a-z]*";
  if (word.match(pattern) === null) {
    return false;
  } else {
    return true;
  }
};

export default function Game() {
  const { dictionary } = useContext(DictionaryContext);

  const [promptLetters, setPromptLetters] = useState(
    Object.keys(letters)[
      Math.floor(Math.random() * Object.keys(letters).length)
    ].toUpperCase()
  );

  const [points, setPoints] = useState(0);
  const [pointsLetters, setPointsLetters] = useState(0);

  const [words, setWords] = useState([]);
  const [editedWord, setEditedWord] = useState("");
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [messageBorderColor, setMessageBorderColor] = useState();

  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const animatedTranslateY = useRef(new Animated.Value(120)).current;

  const windowWidth = Dimensions.get("window").width;

  useEffect(() => {
    if (isMessageVisible === false) {
      return;
    }
    Animated.parallel([
      Animated.timing(animatedOpacity, {
        ...animationProps,
        toValue: 1,
      }),
      Animated.timing(animatedTranslateY, {
        ...animationProps,
        toValue: 0,
      }),
    ]).start(() => {
      // Reset animation.
      setTimeout(() => {
        setIsMessageVisible(false);
        animatedOpacity.setValue(0);
        animatedTranslateY.setValue(120);
      }, 500);
    });
  }, [isMessageVisible]);

  const submitWord = () => {
    // Is word in dictionary:
    if (Object.keys(dictionary).includes(editedWord)) {
      if (isMatch({ word: editedWord, promptLetters })) {
        if (words.includes(editedWord)) {
          setMessage("Already entered this word :-/");
          setMessageBorderColor(Colors.pink300);
        } else {
          setMessage(`${editedWord.length} points!!`);
          setMessageBorderColor(Colors.green300);
          setWords((prev) => prev.concat(editedWord).sort());
          setPoints((prev) => prev + editedWord.length);
          setPointsLetters((prev) => prev + editedWord.length);
        }
      } else {
        setMessage("Word does not match letters :-/");
        setMessageBorderColor(Colors.pink300);
      }
    } else {
      setMessage("Not a word :-/");
      setMessageBorderColor(Colors.red300);
    }
    setEditedWord("");
    setIsMessageVisible(true);
  };

  const refreshTriplets = () => {
    setPromptLetters(
      Object.keys(letters)[
        Math.floor(Math.random() * Object.keys(letters).length)
      ].toUpperCase()
    );
    setWords([]);
    setPointsLetters(0);
  };

  const messageTextStyle = {
    fontSize: windowWidth >= 700 ? 30 : 24,
    fontWeight: "bold",
    borderRadius: 10,
    borderWidth: 6,
    borderColor: messageBorderColor,
    padding: 12,
    color: Colors.grey800,
  };

  const animationStyle = {
    opacity: animatedOpacity,
    width: "80%",
    transform: [{ translateY: animatedTranslateY }],
  };

  return (
    <>
      <View style={{ height: 60 }} />
      <View style={{ flexDirection: windowWidth >= 700 ? "row" : "column" }}>
        <Triplets
          promptLetters={promptLetters}
          pointsLetters={pointsLetters}
          refreshTriplets={refreshTriplets}
        />

        <View style={{ width: 24 }} />
        <Points points={points} pointsLetters={pointsLetters} />
      </View>

      <TextInput
        compact={true}
        style={{ width: windowWidth >= 700 ? "60%" : "95%", height: 60 }}
        mode="flat"
        label="Enter words containing letters..."
        value={editedWord}
        onChangeText={(text) => {
          setEditedWord(text.toLowerCase());
        }}
        enablesReturnKeyAutomatically
        returnKeyType="done"
        onSubmitEditing={submitWord}
        autoCorrect={false}
        blurOnSubmit={false}
        autoFocus={true}
      />

      <View style={{ height: 24 }} />

      <View
        style={{
          flexDirection: "row",
          width: windowWidth >= 700 ? "60%" : "95%",
        }}
      >
        <View
          style={{
            width: windowWidth >= 700 ? "70%" : "60%",
            alignItems: "center",
          }}
        >
          {isMessageVisible && (
            <Animated.View style={animationStyle}>
              <Text style={messageTextStyle}>{message}</Text>
            </Animated.View>
          )}
        </View>

        <View
          style={{
            width: windowWidth >= 700 ? "70%" : "40%",
          }}
        >
          {words.map((w) => (
            <Text key={w}>{w} </Text>
          ))}
        </View>
      </View>
    </>
  );
}
