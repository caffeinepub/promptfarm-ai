import Seo from '../components/seo/Seo';

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About"
        description="Learn about PromptFarm AI - your source for professional AI prompts for creators and businesses."
      />

      <div className="container py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">About PromptFarm AI</h1>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
            <p>
              Welcome to PromptFarm AI, your premier destination for high-quality, professional AI prompts designed
              to unlock the full potential of artificial intelligence tools.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
            <p>
              We believe that the right prompt can transform your creative and business workflows. Our mission is to
              provide creators, marketers, designers, and businesses with carefully crafted prompts that deliver
              exceptional results across all major AI platforms.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">What We Offer</h2>
            <p>
              PromptFarm AI features over 1000+ professionally tested prompts spanning multiple categories including
              video generation, photo creation, CGI advertising, marketing copy, storytelling, business strategy,
              social media content, and design work.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Quality Guarantee</h2>
            <p>
              Every prompt in our library has been carefully crafted and tested across multiple AI platforms to
              ensure consistent, high-quality results. We continuously update our collection with new prompts and
              refine existing ones based on user feedback and AI platform updates.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">For Everyone</h2>
            <p>
              Whether you're a content creator looking to streamline your workflow, a marketer seeking compelling
              copy, or a business professional exploring AI capabilities, PromptFarm AI has the tools you need to
              succeed.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
