# ProRecc - AI Product Recommendations

prorec live link : https://v0-prorecc.vercel.app/

A modern React + Vite web application that provides personalized product recommendations using Google's Gemini AI. Built with TypeScript, Tailwind CSS, and shadcn/ui components.

## ✨ Features

- **AI-Powered Recommendations**: Uses Google Gemini 2.0 Flash for intelligent product matching
- **Modern UI**: Clean, responsive design with shadcn/ui components
- **Real-time Search**: Instant product recommendations based on user preferences
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Mobile Responsive**: Optimized for all device sizes
- **TypeScript**: Full type safety throughout the application
- **Production Ready**: Optimized build with proper error boundaries

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Gemini API key (free from [Google AI Studio](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone and install dependencies:**
   \`\`\`bash
   git clone <your-repo-url>
   cd prorecc
   npm install
   \`\`\`

2. **Set up environment variables:**
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   
   Edit `.env` and add your Gemini API key:
   \`\`\`env
   VITE_GEMINI_API_KEY=your_api_key_here
   \`\`\`

3. **Start development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser:**
   Navigate to `http://localhost:5173`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add `VITE_GEMINI_API_KEY` to your Vercel environment variables
4. Deploy!

### Netlify

1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Add `VITE_GEMINI_API_KEY` to your Netlify environment variables

### Other Platforms

The app builds to static files in the `dist` directory and can be deployed to any static hosting service.

## 🏗️ Project Structure

\`\`\`
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── SearchForm.tsx  # Main search interface
│   ├── ProductGrid.tsx # Product display grid
│   └── ProductCard.tsx # Individual product cards
├── data/               # Static data
│   └── products.ts     # Hardcoded product list
├── services/           # API services
│   └── geminiApi.ts    # Gemini AI integration
├── types/              # TypeScript types
│   └── Product.ts      # Product interface
├── utils/              # Utility functions
│   ├── validation.ts   # Input validation
│   └── constants.ts    # App constants
└── hooks/              # Custom React hooks
    └── useErrorHandler.ts
\`\`\`

## 🎯 How It Works

1. **User Input**: Users describe what they're looking for (e.g., "I want a phone under $500")
2. **AI Processing**: The query is sent to Google Gemini along with the product catalog
3. **Smart Matching**: Gemini analyzes preferences and returns the most relevant product IDs
4. **Results Display**: Matching products are displayed in a responsive card grid

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Google Gemini API key | Yes |

### API Configuration

The app uses Google Gemini 2.0 Flash model with these settings:
- Temperature: 0.3 (focused responses)
- Max tokens: 2048
- Top-K: 40
- Top-P: 0.95

## 🎨 Customization

### Adding Products

Edit `src/data/products.ts` to add or modify products:

\`\`\`typescript
{
  id: 'unique-id',
  name: 'Product Name',
  price: 999,
  category: 'Category',
  description: 'Product description...',
  image: '/path/to/image.jpg'
}
\`\`\`

### Styling

The app uses Tailwind CSS with shadcn/ui. Customize colors in `src/index.css`:

\`\`\`css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96%;
  /* ... other CSS variables */
}
\`\`\`

## 🐛 Troubleshooting

### Common Issues

**"Configuration Required" Error**
- Make sure you have a `.env` file with `VITE_GEMINI_API_KEY`
- Verify your API key is valid and has proper permissions

**"Rate limit exceeded"**
- Wait a moment before trying again
- Consider implementing request queuing for high-traffic scenarios

**No recommendations returned**
- Check your internet connection
- Verify the API key has access to Gemini models
- Try a different search query

### Development Issues

**Build errors**
- Run `npm install` to ensure all dependencies are installed
- Check that Node.js version is 18+

**TypeScript errors**
- Run `npm run lint` to see detailed error messages
- Ensure all imports have proper file extensions

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Search existing GitHub issues
3. Create a new issue with detailed information

---

Built with ❤️ using React, Vite, TypeScript, and Google Gemini AI.
