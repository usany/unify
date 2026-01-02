import type { Meta, StoryObj } from '@storybook/react';

import Steppers from './Steppers';

const meta = {
  component: Steppers,
} satisfies Meta<typeof Steppers>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};