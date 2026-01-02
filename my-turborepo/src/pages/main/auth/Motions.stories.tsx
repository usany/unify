import type { Meta, StoryObj } from '@storybook/react';

import Motions from './Motions';

const meta = {
  component: Motions,
} satisfies Meta<typeof Motions>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};