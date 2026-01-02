/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: 'true',
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    colors: {
      'light-1': '#f7fafb',
      'light-2': '#e2e8f0',
      'light-3': '#cbd5df',
      'dark-1': '#5c6778',
      'dark-2': '#2d3848',
      'dark-3': '#1a202c',
      'ranking-1': '#565584',
      'ranking-2': '#565584',
      'ranking-3': '#565584',
      'profile-red': '#f44336',
      'profile-pink': '#e91e63',
      'profile-purple': '#9c27b0',
      'profile-deeppurple': '#673ab7',
      'profile-indigo': '#3f51b5',
      'profile-blue': '#2196f3',
      'profile-lightblue': '#03a9f4',
      'profile-cyan': '#00bcd4',
      'profile-teal': '#009688',
      'profile-green': '#4caf50',
      'profile-lightgreen': '#8bc34a',
      'profile-lime': '#cddc39',
      'profile-yellow': '#ffeb3b',
      'profile-amber': '#ffc107',
      'profile-orange': '#ff9800',
      'profile-deeporange': '#ff5722',
      black: 'rgb(0 0 0)',
      white: 'rgb(255 255 255)',
      purple: '#3f3cbb',
      midnight: '#121063',
      metal: '#565584',
      tahiti: '#3ab7bf',
      silver: '#ecebff',
      'bubble-gum': '#ff77e9',
      bermuda: '#78dcca'
    },
    extend: {
      padding: {
        '60px': '60px'
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        pulse: {
          '0%, 100%': {
            boxShadow: '0 0 0 0 var(--pulse-color)'
          },
          '50%': {
            boxShadow: '0 0 0 8px var(--pulse-color)'
          }
        },
        rippling: {
          '0%': {
            opacity: '1'
          },
          '100%': {
            transform: 'scale(2)',
            opacity: '0'
          }
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        rippling: 'rippling var(--duration) ease-out'
      },
      gridTemplateColumns: {
        'auto-fill-100': 'repeat(auto-fill, minmax(0, 1fr))',
        'auto-fit-100': 'repeat(auto-fit, minmax(0, 1fr))',
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
}
