import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";

type Props = {
  imageSource?: ImageSourcePropType;
  onPress?: () => void;
  cardColor?: string;
};

export const OptionCard = ({
  imageSource,
  onPress,
  cardColor = "#82CA82",
}: Props) => {
  return (
    <TouchableOpacity
      style={styles.cardBorder}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.cardContent,
          {
            backgroundColor: cardColor,
          },
        ]}
      >
        {imageSource && (
          <Image
            source={imageSource}
            style={styles.image}
            resizeMode="contain"
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardBorder: {
    width: 88,
    height: 108,
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  cardContent: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "85%",
    height: "85%",
  },
});
