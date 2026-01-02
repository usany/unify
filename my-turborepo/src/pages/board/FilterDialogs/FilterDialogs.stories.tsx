import type { Meta, StoryObj } from '@storybook/react';

import FilterDialogs from './FilterDialogs';

const meta = {
  component: FilterDialogs,
} satisfies Meta<typeof FilterDialogs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};