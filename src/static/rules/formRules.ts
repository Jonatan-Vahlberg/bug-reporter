import { FormValueRule } from '../../components/common';

export const titleRules: FormValueRule[] = [
  (title: string) => {
    if (title.length < 3) {
      return {
        triggerd: true,
        message: 'The title has to be three characters or longer.',
      };
    }
    return { triggerd: false, message: '' };
  },
];
