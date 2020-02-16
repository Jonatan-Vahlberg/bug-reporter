import * as React from 'react';
import { View, Text } from 'react-native';

import colors from '../../static/colors';

interface ErrorProps {
  rules: {
    [key: string]: FormValueRule[];
  };
  values: { name: string; value: any }[];
  validationFailed?: (isError: boolean) => void;
  visible?: boolean;
}

export type FormValueRule = (
  value: any,
) => { triggerd: boolean; message: string };

const FormError: React.FC<ErrorProps> = props => {
  const { rules, values, visible } = props;
  const { isError, errorValue, errorMsg } = validateValues(props);
  if (isError && visible) {
    return (
      <View>
        <Text
          style={{
            color: colors.redHighlight,
            textAlign: 'center',
            fontSize: 14,
          }}
        >
          {errorMsg}
        </Text>
      </View>
    );
  } else {
    return null;
  }
};

FormError.defaultProps = { visible: true };

const validateValues = (props: ErrorProps) => {
  let isError: boolean = false;
  let errorMsg: string = '';
  let errorValue: string = '';

  props.values.forEach(value => {
    if (props.rules[value.name] !== null) {
      props.rules[value.name].forEach(rule => {
        const { triggerd, message } = rule(value.value);
        if (triggerd === true) {
          isError = true;
          errorMsg += `${message}\n`;
        }
      });
    }
  });
  return { isError, errorMsg, errorValue };
};

export { FormError };
