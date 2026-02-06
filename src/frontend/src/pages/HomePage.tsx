import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import CategoriesGrid from '../components/categories/CategoriesGrid';
import Seo from '../components/seo/Seo';

export default function HomePage() {
  return (
    <>
      <Seo
        title="Home"
        description="1000+ powerful AI prompts for video, photo, ads & creativity. Unlock the power of AI with ready-to-use professional prompts."
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/assets/generated/hero-bg.dim_1920x800.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
        </div>

        {/* Content */}
        <div className="container relative z-10 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>1000+ Professional AI Prompts</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                1000+ Powerful AI Prompts
              </span>
              <br />
              for Video, Photo, Ads & Creativity
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Unlock the power of AI with ready-to-use professional prompts.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" asChild className="text-lg px-8">
                <Link to="/library">
                  Explore Prompts
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8">
                <Link to="/categories">Browse Categories</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore by Category</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find the perfect prompts for your creative and business needs
            </p>
          </div>
          <CategoriesGrid />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">High-Quality Prompts</h3>
              <p className="text-muted-foreground">
                Professionally crafted prompts tested across multiple AI platforms
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Easy to Use</h3>
              <p className="text-muted-foreground">
                One-click copy and paste into your favorite AI tools
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-pink-600 to-blue-600 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Always Updated</h3>
              <p className="text-muted-foreground">
                New prompts added regularly to keep you ahead
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
