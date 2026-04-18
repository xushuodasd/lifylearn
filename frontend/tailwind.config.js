/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic colors
        background: '#0E0E10', // Gemini Dark Gray - Consistent across all pages
        surface: '#0E0E10',    // Dark Gray
        'surface-highlight': '#1c1c1f', // Slightly lighter gray
        
        primary: {
          DEFAULT: '#1d9bf0', // Twitter Blue
          hover: '#1a8cd8',   
          light: '#8ecdf7',   
        },
        secondary: {
          DEFAULT: '#71767b', // Gray text
          hover: '#eff3f4',   // White hover
        },
        
        // Text colors
        'text-primary': '#e7e9ea',   // Almost White
        'text-secondary': '#71767b', // Gray
        'text-muted': '#536471',     // Dark Gray
        
        // UI colors
        border: '#2f3336', // Dark Border
        input: '#202327',  // Search Input
        ring: '#1d9bf0',   // Blue Ring
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 8s linear infinite',
      },
      backgroundSize: {
        '300%': '300%',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
