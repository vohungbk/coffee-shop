module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: '#FF912B',
        secondary: '#2F2105',
        accents: '#F9D9AA',
        glass:
          'linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.4) 100%)',
        light: '#7E7D7A',
        border: 'rgba(255, 211, 145, 0.62)',
      },
      backgroundImage: {
        'hero-pattern-top': "url('/assets/bg_img_hero.svg')",
        'hero-pattern-bottom': "url('/assets/bg_img_hero_bottom.svg')",
        exclude: "url('/assets/exclude.png')",
        exclude2: "url('/assets/exclude2.png')",
      },
      backgroundSize: {
        '50%': '50%',
        '100%': '100%',
      },
      dropShadow: {
        custom: '0px 6px 16px rgba(0, 0, 0, 0.16)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
