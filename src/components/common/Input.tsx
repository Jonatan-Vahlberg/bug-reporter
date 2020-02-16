import React from 'react';
import {
  View,
  TextInput as Input,
  Text,
  KeyboardTypeOptions,
  StyleSheet,
} from 'react-native';

import colors from '../../static/colors';

interface InputProps {
  value: string;
  name: string;
  setValue: (name: string, value: string) => void;
  keyboardType?: KeyboardTypeOptions;
  secure?: boolean;
  placeholder?: string;
  numberOfLines?: number;
  multiline?: boolean;
}

const TextInput: React.FC<InputProps> = props => {
  const {
    value,
    name,
    setValue,
    keyboardType,
    secure,
    placeholder,
    numberOfLines,
    multiline,
  } = props;
  const { outerContainer, containerStyle, inputStyle } = styles;
  return (
    <View style={outerContainer}>
      <View style={containerStyle}>
        <Text>{props.name.replace(/^\w/, char => char.toUpperCase())}</Text>
        <Input
          value={value}
          onChangeText={value => setValue(name, value)}
          keyboardType={keyboardType}
          secureTextEntry={secure}
          placeholder={placeholder}
          style={inputStyle}
          numberOfLines={numberOfLines}
          multiline={multiline}
        />
      </View>
    </View>
  );
};

TextInput.defaultProps = {
  keyboardType: 'default',
  secure: false,
  numberOfLines: 1,
  multiline: true,
};

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: 'row',

    marginHorizontal: 15,
    marginVertical: 10,
  },
  containerStyle: {
    justifyContent: 'flex-start',
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  inputStyle: {
    flexDirection: 'row',
    backgroundColor: colors.lightGreyBackground,
    paddingVertical: 5,
    marginTop: 5,
    paddingHorizontal: 5,
    fontSize: 18,
    textAlignVertical: 'top',
  },
});

export { TextInput };
