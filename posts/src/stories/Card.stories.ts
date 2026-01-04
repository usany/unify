import type { Meta, StoryObj } from '@storybook/react-vite'

import { fn } from 'storybook/test'

import { Cards } from 'src/pages/core/Cards'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Card',
  component: Cards,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn(), label: 'Card', shadowColor: 'lightblue' },
} satisfies Meta<typeof Cards>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const defaultCard: Story = {
  args: {
    mode: 'colorThree',
    sxObject: {},
  },
}
export const brightCard: Story = {
  args: {
    mode: 'colorTwo',
    sxObject: {},
  },
}
export const brightAddCard: Story = {
  args: {
    mode: 'colorTwo',
    sxObject: {
      width: 200 * 0.9,
      height: 280 * 0.9,
      boxShadow: `1.9px 1.9px 1.9px 1.9px lightblue`,
    },
  },
}
export const brightPiazzaCard: Story = {
  args: {
    mode: 'colorTwo',
    sxObject: {
      flexGrow: 1,
      overflow: 'hidden',
    },
  },
}
export const brightSpecificCard: Story = {
  args: {
    mode: 'colorTwo',
    sxObject: {
      maxWidth: `${window.screen.width * 0.9}px`,
      boxShadow: `1.9px 1.9px 1.9px 1.9px lightblue`,
    },
  },
}
export const brightSpecificRearCard: Story = {
  args: {
    mode: 'colorTwo',
    sxObject: {
      height: `1080px`,
      maxWidth: `${window.screen.width * 0.9}px`,
      border: 1,
      borderWidth: '5px',
      borderColor: 'lightblue',
      borderRadius: '10px',
    },
  },
}
export const brighterCard: Story = {
  args: {
    mode: 'colorOne',
    sxObject: {},
  },
}
