import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

const PlayScreen = () => {
  return (
    <View style={styles.tabBar}>
      <Text style={styles.lets}>Let’s</Text>
      <Text style={styles.playJoy}>{`Play & Joy!`}</Text>
      <Text style={[styles.playTime, styles.playTimeTypo]}>Play Time</Text>
      <Image
        style={[styles.tabBarItem, styles.tabLayout]}
        contentFit="cover"
        source={require("../assets/ellipse-30.png")}
      />
      <Image
        style={[styles.devilHeartIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/devil-heart.png")}
      />
      <Text style={[styles.parterQuiz, styles.playTimeTypo]}>Parter Quiz</Text>
      <Image
        style={[styles.tabBarInner, styles.tabLayout]}
        contentFit="cover"
        source={require("../assets/ellipse-30.png")}
      />
      <Text style={[styles.worlde, styles.worldeTypo]}>Worlde</Text>
      <Image
        style={[styles.ellipseIcon, styles.tabBarItemPosition]}
        contentFit="cover"
        source={require("../assets/ellipse-30.png")}
      />
      <Text style={[styles.comingSoon, styles.comingSoonPosition]}>
        Coming Soon
      </Text>
      <Image
        style={[styles.tabBarChild1, styles.comingSoonPosition]}
        contentFit="cover"
        source={require("../assets/ellipse-33.png")}
      />
      <Image
        style={[styles.youngCoupleDiscussTogether, styles.iconLayout1]}
        contentFit="cover"
        source={require("../assets/young-couple-discuss-together.png")}
      />
      <Image
        style={[styles.alphabetBoardGame, styles.iconLayout1]}
        contentFit="cover"
        source={require("../assets/alphabet-board-game.png")}
      />
      <Image
        style={[styles.pingPongIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/ping-pong.png")}
      />
      <Image
        style={[styles.gamesIcon, styles.iconLayout1]}
        contentFit="cover"
        source={require("../assets/games.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconLayout1: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  playTimeTypo: {
    textAlign: "center",
    fontSize: FontSize.size_xl,
    top: "45.89%",
    width: "28.5%",
    fontWeight: "700",
    color: Color.black,
    height: "4.23%",
    position: "absolute",
  },
  tabLayout: {
    bottom: "54.81%",
    top: "31.1%",
    width: "30.53%",
    height: "14.08%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  iconLayout: {
    height: "8.1%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  worldeTypo: {
    top: "72.3%",
    textAlign: "center",
    fontSize: FontSize.size_xl,
    fontWeight: "700",
    color: Color.black,
    height: "4.23%",
  },
  tabBarItemPosition: {
    right: "58.52%",
    left: "10.94%",
  },
  comingSoonPosition: {
    left: "57%",
    position: "absolute",
  },
  tabBarChild: {
    height: "5.05%",
    width: "10.94%",
    top: "91.67%",
    right: "44.27%",
    bottom: "3.29%",
    left: "44.78%",
    borderRadius: 7,
    backgroundColor: "transparent",
    position: "absolute",
  },
  vectorIcon: {
    right: "66.41%",
    left: "28.5%",
    bottom: "4.58%",
    top: "93.08%",
    maxWidth: "100%",
    height: "2.35%",
    position: "absolute",
    width: "5.09%",
  },
  vectorIcon1: {
    width: "4.58%",
    right: "28.5%",
    left: "66.92%",
    bottom: "4.58%",
    top: "93.08%",
    maxWidth: "100%",
    height: "2.35%",
    position: "absolute",
  },
  vectorIcon2: {
    top: "92.96%",
    right: "47.07%",
    bottom: "4.69%",
    left: "47.84%",
    width: "5.09%",
    height: "2.35%",
    maxWidth: "100%",
    position: "absolute",
  },
  vectorIcon3: {
    height: "2.52%",
    width: "5.47%",
    top: "92.99%",
    right: "82.51%",
    bottom: "4.49%",
    left: "12.02%",
    position: "absolute",
  },
  vectorIcon4: {
    right: "12.21%",
    left: "82.7%",
    bottom: "4.58%",
    top: "93.08%",
    maxWidth: "100%",
    height: "2.35%",
    position: "absolute",
    width: "5.09%",
  },
  lets: {
    width: "61.32%",
    top: "14.55%",
    fontWeight: "500",
    textAlign: "left",
    color: Color.black,
    fontSize: FontSize.size_11xl,
    left: "10.94%",
    height: "4.23%",
    position: "absolute",
  },
  playJoy: {
    width: "77.86%",
    top: "19.48%",
    fontWeight: "700",
    textAlign: "left",
    color: Color.black,
    fontSize: FontSize.size_11xl,
    left: "10.94%",
    height: "4.23%",
    position: "absolute",
  },
  playTime: {
    left: "11.96%",
  },
  tabBarItem: {
    right: "58.52%",
    left: "10.94%",
  },
  devilHeartIcon: {
    width: "20.1%",
    top: "34.04%",
    right: "63.61%",
    bottom: "57.86%",
    left: "16.28%",
  },
  parterQuiz: {
    left: "59.03%",
  },
  tabBarInner: {
    right: "11.45%",
    left: "58.02%",
  },
  worlde: {
    left: "11.96%",
    width: "28.5%",
    top: "72.3%",
    position: "absolute",
  },
  ellipseIcon: {
    top: "57.51%",
    bottom: "28.4%",
    width: "30.53%",
    height: "14.08%",
    right: "58.52%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  comingSoon: {
    width: "32.82%",
    top: "72.3%",
    textAlign: "center",
    fontSize: FontSize.size_xl,
    fontWeight: "700",
    color: Color.black,
    height: "4.23%",
  },
  tabBarChild1: {
    height: "15.02%",
    width: "32.57%",
    top: "57.04%",
    right: "10.43%",
    bottom: "27.93%",
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  youngCoupleDiscussTogether: {
    height: "9.86%",
    width: "21.12%",
    top: "33.22%",
    right: "16.03%",
    bottom: "56.92%",
    left: "62.85%",
    position: "absolute",
  },
  alphabetBoardGame: {
    height: "6.1%",
    width: "13.49%",
    top: "61.5%",
    right: "66.92%",
    bottom: "32.39%",
    left: "19.59%",
    position: "absolute",
  },
  pingPongIcon: {
    width: "15.78%",
    top: "61.03%",
    right: "18.58%",
    bottom: "30.87%",
    left: "65.65%",
  },
  gamesIcon: {
    height: "7.86%",
    width: "17.56%",
    top: "4.46%",
    right: "73.79%",
    bottom: "87.68%",
    left: "8.65%",
    position: "absolute",
  },
  tabBar: {
    backgroundColor: "#fff",
    flex: 1,
    width: "100%",
    height: 852,
    overflow: "hidden",
    marginBottom: -80,
  },
});

export default PlayScreen;
