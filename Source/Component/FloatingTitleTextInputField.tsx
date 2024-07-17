import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, TextInput, TextInputProps, StyleProp, TextStyle, ViewStyle } from 'react-native';

interface FloatingTitleTextInputFieldProps extends TextInputProps {
  attrName: string;
  title: string;
  value: string;
  updateMasterState: (value: string) => void;
  titleActiveSize?: number; // to control size of title when field is active
  titleInActiveSize?: number; // to control size of title when field is inactive
  titleActiveColor?: string; // to control color of title when field is active
  titleInactiveColor?: string; // to control color of title when field is inactive
  textInputStyles?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const FloatingTitleTextInputField: React.FC<FloatingTitleTextInputFieldProps> = ({
  attrName,
  title,
  value,
  updateMasterState,
  keyboardType = 'default',
  titleActiveSize = 11.5,
  titleInActiveSize = 15,
  titleActiveColor = 'black',
  titleInactiveColor = 'dimgrey',
  textInputStyles = {},
  containerStyle = {},
  ...otherTextInputProps
}) => {
  const [isFieldActive, setIsFieldActive] = useState<boolean>(!!value);
  const position = useRef(new Animated.Value(!!value ? 1 : 0)).current;

  useEffect(() => {
    if (value) {
      setIsFieldActive(true);
      Animated.timing(position, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  }, [value]);

  const handleFocus = () => {
    if (!isFieldActive) {
      setIsFieldActive(true);
      Animated.timing(position, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleBlur = () => {
    if (isFieldActive && !value) {
      setIsFieldActive(false);
      Animated.timing(position, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  };

  const onChangeText = (updatedValue: string) => {
    updateMasterState(updatedValue);
  };

  const returnAnimatedTitleStyles = () => ({
    top: position.interpolate({
      inputRange: [0, 1],
      outputRange: [10, 0],
    }),
    fontSize: isFieldActive ? titleActiveSize : titleInActiveSize,
    color: isFieldActive ? titleActiveColor : titleInactiveColor,
    marginbottom: isFieldActive ? 20:0
  });

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.Text style={[styles.titleStyles, returnAnimatedTitleStyles()]}>
        {title}
      </Animated.Text>
      <TextInput
        value={value}
        style={[styles.textInput, textInputStyles]}
        underlineColorAndroid="transparent"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        {...otherTextInputProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 3,
    borderStyle: 'solid',
    borderWidth: 0.5,
    height: 40,
    // marginVertical: 4,
  },
  textInput: {
    fontSize: 15,
    // marginTop: 5,
    fontFamily: 'Avenir-Medium',
    color: 'black',
  },
  titleStyles: {
    // position: 'absolute',
    fontFamily: 'Avenir-Medium',
    left: 10,
    // paddingVertical:5
  },
});

export default FloatingTitleTextInputField;
