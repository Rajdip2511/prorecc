export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-foreground mb-1">ProRecc</h3>
            <p className="text-sm text-muted-foreground">AI-powered product recommendations</p>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>Powered by Google Gemini AI</span>
            <span>•</span>
            <span>Built with React & Vite</span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t text-center text-xs text-muted-foreground">
          <p>
            © 2025 ProRecc. This is a demo application showcasing AI-powered product recommendations. Created with love
            by rajdip.
          </p>
        </div>
      </div>
    </footer>
  )
}
