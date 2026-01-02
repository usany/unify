import type { Meta, StoryObj } from '@storybook/react-vite'

import { fn } from 'storybook/test'

import { Chips } from 'src/pages/core/Chips'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Chip',
  component: Chips,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { label: 'Chip' },
} satisfies Meta<typeof Chips>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const defaultChip: Story = {
  args: {
    mode: '',
  },
}

export const piazzaNumberChip: Story = {
  args: {
    mode: 'piazzaNumber',
  },
}

export const locationChip: Story = {
  args: {
    mode: 'location',
  },
}

export const noProcessingChip: Story = {
  args: {
    mode: 'noProcessing',
  },
}

export const processingChip: Story = {
  args: {
    mode: 'processing',
  },
}

export const specificChip: Story = {
  args: {
    mode: 'specific',
  },
}
