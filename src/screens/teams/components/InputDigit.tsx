import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

type DigitProps = {
  digit: string;
  setDigit: React.Dispatch<React.SetStateAction<string>>;
  textRef: React.RefObject<TextInput>;
  nextRef?: React.RefObject<TextInput>;
  onchange: (value?: string) => void;
};

const InputDigit: React.FC<DigitProps> = ({
  digit,
  setDigit,
  textRef,
  nextRef,
  onchange,
}) => (
  <View style={styles.box}>
    <TextInput
      ref={textRef}
      style={styles.text}
      keyboardType="decimal-pad"
      returnKeyType={nextRef !== undefined ? 'next' : 'done'}
      value={digit}
      maxLength={1}
      placeholder="0"
      blurOnSubmit={false}
      onChangeText={value => {
        setDigit(value);
        if (value.length === 1) {
          onchange();
          if (nextRef !== undefined) {
            textRef.current?.blur();
          } else {
            onchange(value);
          }
        }
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  box: {
    borderColor: '#000',
    borderWidth: 2,
    margin: 10,
    width: 40,
    aspectRatio: 1,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    height: 40,
    textAlignVertical: 'center',
  },
});

export default InputDigit;
