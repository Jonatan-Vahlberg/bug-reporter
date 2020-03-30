import React, {useState, useRef} from 'react';
import {View, TextInput} from 'react-native';
import InputDigit from './InputDigit';

type BoxProps = {
  onCodeSet: React.Dispatch<React.SetStateAction<string>>;
};

const InputBox: React.FC<BoxProps> = ({onCodeSet}) => {
  const [in1, setIn1] = useState<string>('');
  const [in2, setIn2] = useState<string>('');
  const [in3, setIn3] = useState<string>('');
  const [in4, setIn4] = useState<string>('');
  const [in5, setIn5] = useState<string>('');
  const [in6, setIn6] = useState<string>('');

  const inRef1 = useRef<TextInput>(null);
  const inRef2 = useRef<TextInput>(null);
  const inRef3 = useRef<TextInput>(null);
  const inRef4 = useRef<TextInput>(null);
  const inRef5 = useRef<TextInput>(null);
  const inRef6 = useRef<TextInput>(null);

  const inputs = [
    {digit: in1, setDigit: setIn1, textRef: inRef1, nextRef: inRef2},
    {digit: in2, setDigit: setIn2, textRef: inRef2, nextRef: inRef3},
    {digit: in3, setDigit: setIn3, textRef: inRef3, nextRef: inRef4},
    {digit: in4, setDigit: setIn4, textRef: inRef4, nextRef: inRef5},
    {digit: in5, setDigit: setIn5, textRef: inRef5, nextRef: inRef6},
    {digit: in6, setDigit: setIn6, textRef: inRef6, nextRef: undefined},
  ];
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
      {inputs.map(input => (
        <InputDigit
          {...input}
          onchange={value => {
            if (input.nextRef !== undefined) {
              input.nextRef?.current?.focus();
            } else {
              input.textRef.current?.blur();
            }
            if (value === undefined)
              onCodeSet(`${in1}${in2}${in3}${in4}${in5}${in6}`);
            else onCodeSet(`${in1}${in2}${in3}${in4}${in5}${value}`);
          }}
        />
      ))}
    </View>
  );
};

export default InputBox;
