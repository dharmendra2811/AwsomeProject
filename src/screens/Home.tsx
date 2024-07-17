import * as React from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Image,
} from 'react-native';
// import type { NavParams } from '../navigation/types';

const { height } = Dimensions.get('window');

const getRandomSize = function () {
  const min = 400;
  const max = 800;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// const images = new Array(10)
//   .fill(0)
//   .map(() => `https://picsum.photos/${getRandomSize()}/${getRandomSize()}`);

const images = ['https://picsum.photos/200/300', 'https://picsum.photos/seed/picsum/200/300','https://picsum.photos/200/300?grayscale','https://picsum.photos/200/300/?blur'];


export const Home = () => {
  // const { navigate } = useNavigation<NavigationProp<NavParams>>();

  return (
    <View style={styles.container}>
      {images.map((uri, index) => (
        <TouchableWithoutFeedback
          key={uri}
          // onPress={() => navigate('Photos', { index, images })}
        >
          <Image source={{uri}} style={styles.image} />
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    width: '50%',
    height: (height / images.length) * 2,
    backgroundColor:'green'
  },
});
