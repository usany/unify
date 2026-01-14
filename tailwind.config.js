/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
        },
        background: {
          body: 'var(--bg-body)',
          topbar: 'var(--bg-topbar)',
          card: 'var(--bg-card)',
          'card-hover': 'var(--bg-card-hover)',
          comment: 'var(--bg-comment)',
          'comment-pending': 'var(--bg-comment-pending)',
          badge: 'var(--bg-badge)',
          sidenav: 'var(--bg-sidenav)',
          'tier-1': 'var(--bg-tier-1)',
          'tier-2': 'var(--bg-tier-2)',
          'tier-3': 'var(--bg-tier-3)',
        },
        text: {
          main: 'var(--text-main)',
          muted: 'var(--text-muted)',
        },
        border: 'var(--border)',
        shadow: 'var(--shadow)',
      },
    },
  },
  plugins: [],
}
