import * as React from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Button,
  Share,
} from "react-native";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";

// Converts a React View to a png
import { captureRef } from "react-native-view-shot";

import TakePhotoButton from "./components/TakePhotoButton";
import ChoosePhotoButton from "./components/ChoosePhotoButton";
import SharePhotoButton from "./components/SharePhotoButton";

const { width: screenWidth } = Dimensions.get("window");

const memeTemplateImageUris = [
  "https://i.pinimg.com/originals/0d/4b/fc/0d4bfcadf5b3887910796b374b4eb336.gif",
  "https://i.pinimg.com/originals/0e/33/99/0e339987fe3234b3b9f2e4a7117ec45c.gif",
  "https://i.imgflip.com/2/4t0m5.jpg",
  "https://i.pinimg.com/564x/b8/92/bc/b892bc9ca766c4dcf0f40d72ef4924b8.jpg",
  "https://i.pinimg.com/originals/26/8a/71/268a71241165880881a9531a8dbe960b.gif",
  "https://cdns.klimg.com/resized/476x238/p/photonews/thumbnail/14-momen-awkward-di-podcast-reza-arap-d-5155fb.jpg"
];

export default function App() {
  const [topText, setTopText] = React.useState("");
  const [bottomText, setBottomText] = React.useState("");

  const placeholderMeme = memeTemplateImageUris[0];
  const [imgUri, setImgUri] = React.useState(placeholderMeme);
  const memeView = React.useRef();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setTopText(text)}
        value={topText}
      />
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setBottomText(text)}
        value={bottomText}
      />
      <View collapsable={false} ref={memeView}>
        <Image
          source={{ uri: imgUri }}
          style={{ height: screenWidth, width: screenWidth }}
        />
        <Text style={[styles.memeText, { top: 5 }]}>{topText}</Text>
        <Text style={[styles.memeText, { bottom: 5 }]}>{bottomText}</Text>
      </View>
      <TakePhotoButton setImgUri={setImgUri} />
      <ChoosePhotoButton setImgUri={setImgUri} />
      <View style={{ flexDirection: "row" }}>
        {memeTemplateImageUris.map((uri) => {
          return (
            <TouchableOpacity
              key={uri}
              onPress={() => {
                setImgUri(uri);
              }}
            >
              <Image source={{ uri }} style={styles.templateImage} />
            </TouchableOpacity>
          );
        })}
      </View>
      <SharePhotoButton memeView={memeView} />
    </View>
  );
}

const styles = StyleSheet.create({
  memeText: {
    color: "white",
    fontSize: 38,
    fontWeight: "900",
    textAlign: "center",
    position: "absolute",
    left: 5,
    right: 5,
    backgroundColor: "transparent",
    textShadowColor: "black",
    textShadowRadius: 5,
    textShadowOffset: { height: 2, width: 2 },
  },
  textInput: {
    height: 40,
    borderWidth: 0.5,
    borderColor: "black",
    width: screenWidth - 40,
  },
  templateImage: {
    height: 60,
    width: 60,
    marginHorizontal: 0,
    marginVertical: 5,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "orange",
  },
});
