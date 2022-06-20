import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button, PrimaryButton, SecondaryButton } from 'components/form';
import React from 'react';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Form/Button',
  component: Button,
  argTypes: {
    children: {
      name: 'children',
      defaultValue: 'Hello World',
      type: { name: 'string', required: true },
      description:
        "Allows any valid ReactNode inside, as you'd expect from a <button>",
      control: {
        type: 'text',
      },
    },
  },
} as ComponentMeta<typeof Button>;

export const Primary: React.FunctionComponent<{ children: React.ReactNode }> =
  ({ children }) => <PrimaryButton>{children}</PrimaryButton>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

// export const Primary = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
// Primary.args = {
//   primary: true,
//   label: 'Button',
// };

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button',
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };
