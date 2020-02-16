import * as React from 'react';
import {TouchableWithoutFeedback, View, StyleSheet, Text} from 'react-native';

export interface CheckBoxProps {
  name: string;
  checked: boolean;
  setValue: (name: string, value: boolean) => void;
  size: number;
  color?: string;
  disabledColor?: string;
  disabled?: boolean;
}

const CheckBox: React.FC<CheckBoxProps> = (props: CheckBoxProps) => {
  const checkboxName = props.checked
    ? 'check-box-outline'
    : 'checkbox-blank-outline';
  const checkboxColor = props.disabled ? props.disabledColor : props.color;
  return (
    <View
      style={{
        width: props.size + 10,
        aspectRatio: 1,
        margin: 5,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableWithoutFeedback
        disabled={props.disabled}
        onPress={() => props.setValue(props.name, !props.checked)}>
        <Text>Ho</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

CheckBox.defaultProps = {
  color: '#000',
  disabledColor: '#f8f8f8',
  disabled: false,
  size: 40,
};

export {CheckBox};
