import React from "react";
import { StyleSheet, View, Image, ImageSourcePropType } from "react-native";

type Props = {
  imageSource?: ImageSourcePropType;
  cardColor?: string;
  small?: boolean;
};

export const MainCard = ({
  imageSource,
  cardColor = "#82CA82",
  small = false,
}: Props) => {
  return (
    <View style={[styles.cardBorder, small && styles.cardBorderSmall]}>
      <View style={[styles.cardContent, { backgroundColor: cardColor }]}>
        {imageSource && (
          <Image
            source={imageSource}
            style={styles.image}
            resizeMode="contain"
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardBorder: {
    width: 180,
    height: 180,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },

  cardBorderSmall: {
    width: 125,
    height: 135,
    borderRadius: 18,
    padding: 7,
  },

  cardContent: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "85%",
    height: "85%",
  },
});
