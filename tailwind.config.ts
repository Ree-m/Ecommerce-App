import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          'greyBackground':"url('../public/assests/grey-bg.jpg')",
          'watermark':"url('../public/assests/BarBak_Primary_PMS_page-0001-removebg-preview (1) 1.png')",
          'circleBig':"url('../public/assests/div.trust__illustrations.png')",
          'circleSmall':"url('../public/assests/div.trust__illustrations (1).png')",
          'cabbage':"url('../public/assests/div.team__cabbage.png')",



      },
      screens: {
        '3xl': {'min': '2000px'},
      },
      
      colors: {
        customYellow: '#F7BC06',
        customBlack:'#0A0A0A',
        customLightBlack:'rgba(10, 10, 10, 0.60)',
        customLightGrey:'rgba(255, 255, 255, 0.6)',
        customGrey:'rgba(174, 174, 174, 1)',
        customBgGrey:'#D9D9D933'
      },

      fontFamily: {
        sans: [
          'Roboto',
          'sans-serif',
        ],
      },
      
    },
   
  },
  plugins: [],
}
export default config
