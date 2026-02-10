import Map "mo:core/Map";
import Nat "mo:core/Nat";
import List "mo:core/List";
import Principal "mo:core/Principal";

module {
  type PromptCategory = {
    #videoGeneration;
    #photoGeneration;
    #cgiAds;
    #marketing;
    #storytelling;
    #business;
    #socialMedia;
    #design;
  };

  type PromptRecord = {
    id : Nat;
    title : Text;
    description : Text;
    category : PromptCategory;
    fullText : Text;
    tags : [Text];
    isPopular : Bool;
    isNew : Bool;
    isPremium : Bool;
  };

  type BlogPost = {
    id : Nat;
    title : Text;
    content : Text;
    author : Text;
    timestamp : Int;
  };

  type ContactSubmission = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  type UserProfile = {
    name : Text;
    hasPremiumMembership : Bool;
  };

  type OldActor = {
    prompts : Map.Map<Nat, PromptRecord>;
    blogPosts : Map.Map<Nat, BlogPost>;
    favorites : Map.Map<Principal, List.List<Nat>>;
    newsletterSubscribers : List.List<Text>;
    contactSubmissions : List.List<ContactSubmission>;
    userProfiles : Map.Map<Principal, UserProfile>;
    nextPromptId : Nat;
    nextBlogPostId : Nat;
  };

  type NewActor = OldActor;

  public func run(old : OldActor) : NewActor {
    let seedPrompts : [(Nat, PromptRecord)] = [
      // Video Generation Prompts
      (
        200,
        {
          id = 200;
          title = "Cinematic Drone Fly-through";
          description = "Prompt for AI-generated drone-style cinematic video.";
          category = #videoGeneration;
          fullText = "Create a highly detailed 4K video of a drone flying through a futuristic cityscape at sunset, using smooth cinematic camera movements.";
          tags = ["drone", "cinematic", "futuristic"];
          isPopular = true;
          isNew = true;
          isPremium = true;
        },
      ),
      (
        201,
        {
          id = 201;
          title = "AI-powered Nature Documentary";
          description = "Prompt for generating documentary-style nature video.";
          category = #videoGeneration;
          fullText = "Generate a high-definition documentary-style video showcasing the migration patterns of wildebeest across the Serengeti. Include aerial shots and close-up animal behaviors.";
          tags = ["nature", "documentary", "wildlife"];
          isPopular = true;
          isNew = true;
          isPremium = true;
        },
      ),
      (
        202,
        {
          id = 202;
          title = "Virtual Product Unboxing";
          description = "Prompt for 3D animated product unboxing video.";
          category = #videoGeneration;
          fullText = "Create a realistic 3D unboxing video of a new tech gadget, featuring slow-motion effects and detailed product close-ups.";
          tags = ["product", "unboxing", "3D"];
          isPopular = false;
          isNew = true;
          isPremium = true;
        },
      ),
      (
        203,
        {
          id = 203;
          title = "Time-lapse City Transformation";
          description = "Prompt for time-lapse AI-generated city footage.";
          category = #videoGeneration;
          fullText = "Generate a time-lapse sequence showing the transformation of a historic city center from day to night, including lighting changes and traffic patterns.";
          tags = ["city", "time-lapse", "transformation"];
          isPopular = true;
          isNew = false;
          isPremium = true;
        },
      ),
      // Photo Generation Prompts
      (
        204,
        {
          id = 204;
          title = "Hyperrealistic Portraits";
          description = "Prompt for ultra-detailed AI-generated portraits.";
          category = #photoGeneration;
          fullText = "Create a series of hyperrealistic portraits capturing diverse facial expressions and lighting conditions, suitable for fashion photography.";
          tags = ["portrait", "photography", "hyperrealistic"];
          isPopular = true;
          isNew = false;
          isPremium = true;
        },
      ),
      (
        205,
        {
          id = 205;
          title = "Surreal Landscape Photography";
          description = "Prompt for AI-generated surreal landscapes.";
          category = #photoGeneration;
          fullText = "Generate high-resolution surrealistic landscape photos combining elements of different seasons and weather patterns in a single image.";
          tags = ["landscape", "surreal", "photography"];
          isPopular = false;
          isNew = true;
          isPremium = true;
        },
      ),
      (
        206,
        {
          id = 206;
          title = "Vintage Film Camera Aesthetics";
          description = "Prompt for retro-style AI photos.";
          category = #photoGeneration;
          fullText = "Create photos with vintage film camera aesthetics, featuring grainy textures, light leaks, and muted color palettes reminiscent of 1980s photography.";
          tags = ["vintage", "film", "retro"];
          isPopular = true;
          isNew = false;
          isPremium = true;
        },
      ),
      (
        207,
        {
          id = 207;
          title = "AI-Enhanced Food Photography";
          description = "Prompt for high-quality food imagery.";
          category = #photoGeneration;
          fullText = "Generate mouth-watering food photos with enhanced textures, vibrant colors, and realistic steam or smoke effects for hot dishes.";
          tags = ["food", "photography", "enhanced"];
          isPopular = false;
          isNew = true;
          isPremium = true;
        },
      ),
      // CGI Ad Prompts
      (
        208,
        {
          id = 208;
          title = "Dynamic Product Animation";
          description = "Prompt for CGI product commercials.";
          category = #cgiAds;
          fullText = "Create a dynamic 3D animation showcasing a new product's features, including exploded views and interactive elements for an advertising campaign.";
          tags = ["product", "animation", "commercial"];
          isPopular = true;
          isNew = false;
          isPremium = true;
        },
      ),
      (
        209,
        {
          id = 209;
          title = "Virtual Storefront Experience";
          description = "Prompt for interactive digital storefronts.";
          category = #cgiAds;
          fullText = "Generate a virtual 3D storefront experience allowing users to explore and interact with products in a digital retail environment.";
          tags = ["virtual", "storefront", "3D"];
          isPopular = false;
          isNew = true;
          isPremium = true;
        },
      ),
      (
        210,
        {
          id = 210;
          title = "Augmented Reality Product Demos";
          description = "Prompt for AR ad campaigns.";
          category = #cgiAds;
          fullText = "Create augmented reality product demo assets for use in interactive ad campaigns, featuring 360-degree product views and customization options.";
          tags = ["AR", "product", "demo"];
          isPopular = true;
          isNew = false;
          isPremium = true;
        },
      ),
      (
        211,
        {
          id = 211;
          title = "Animated Brand Mascot Creator";
          description = "Prompt for custom mascot animations.";
          category = #cgiAds;
          fullText = "Generate animated brand mascots with diverse expressions and actions, suitable for use in digital advertisements and social media campaigns.";
          tags = ["mascot", "animation", "brand"];
          isPopular = false;
          isNew = true;
          isPremium = true;
        },
      ),
      // Social Media Content Prompts
      (
        212,
        {
          id = 212;
          title = "Viral Video Challenge Templates";
          description = "Prompt for creating viral video frameworks.";
          category = #socialMedia;
          fullText = "Create a series of templates for social media video challenges, incorporating popular music, effects, and interactive elements to boost engagement.";
          tags = ["viral", "template", "challenge"];
          isPopular = true;
          isNew = false;
          isPremium = true;
        },
      ),
      (
        213,
        {
          id = 213;
          title = "Influencer Storytelling Toolkit";
          description = "Prompt for influencer content creation.";
          category = #socialMedia;
          fullText = "Generate a toolkit for influencers, including customizable story formats, branded overlays, and interactive polls for social media platforms.";
          tags = ["influencer", "storytelling", "toolkit"];
          isPopular = false;
          isNew = true;
          isPremium = true;
        },
      ),
      (
        214,
        {
          id = 214;
          title = "360° Social Media Posts";
          description = "Prompt for immersive post creation.";
          category = #socialMedia;
          fullText = "Create 360-degree immersive social media posts featuring interactive hotspots, panoramic views, and integrated calls-to-action for brands.";
          tags = ["360", "immersive", "social"];
          isPopular = true;
          isNew = false;
          isPremium = true;
        },
      ),
      (
        215,
        {
          id = 215;
          title = "AI-Generated Hashtag Analysis";
          description = "Prompt for optimizing hashtag strategies.";
          category = #socialMedia;
          fullText = "Develop an AI tool that analyzes trending hashtags and suggests optimized combinations for maximum social media reach and engagement.";
          tags = ["hashtag", "analysis", "optimization"];
          isPopular = false;
          isNew = true;
          isPremium = true;
        },
      ),
      (
        216,
        {
          id = 216;
          title = "Sponsorship Proposal Generator";
          description = "Prompt for influencer-brand collaborations.";
          category = #socialMedia;
          fullText = "Generate detailed sponsorship proposal templates for influencers to pitch collaboration ideas to brands, including analytics and engagement forecasts.";
          tags = ["sponsorship", "proposal", "influencer"];
          isPopular = true;
          isNew = false;
          isPremium = true;
        },
      ),
      (
        217,
        {
          id = 217;
          title = "Interactive Ad Campaign Creator";
          description = "Prompt for engaging ad content.";
          category = #socialMedia;
          fullText = "Create an interactive ad campaign template featuring gamified elements, user challenges, and shareable rewards to boost audience participation.";
          tags = ["interactive", "ad", "campaign"];
          isPopular = false;
          isNew = false;
          isPremium = true;
        },
      ),
      (
        218,
        {
          id = 218;
          title = "Eco-friendly Product Showcase";
          description = "Prompt for sustainable product campaigns.";
          category = #cgiAds;
          fullText = "Generate visually engaging CGI ads highlighting sustainable and eco-friendly products, with emphasis on environmental impact and green messaging.";
          tags = ["eco-friendly", "sustainable", "product"];
          isPopular = true;
          isNew = true;
          isPremium = true;
        },
      ),
      (
        219,
        {
          id = 219;
          title = "Luxury Brand Experience";
          description = "Prompt for high-end brand marketing.";
          category = #cgiAds;
          fullText = "Create digital assets and CGI ads for luxury brands, focusing on elegant design, sophisticated animations, and immersive brand experiences.";
          tags = ["luxury", "brand", "experience"];
          isPopular = true;
          isNew = true;
          isPremium = true;
        },
      ),
    ];

    let existingPrompts = old.prompts;
    let newPromptMap = existingPrompts.clone();

    for ((id, prompt) in seedPrompts.values()) {
      if (not existingPrompts.containsKey(id)) {
        newPromptMap.add(id, prompt);
      };
    };

    { old with prompts = newPromptMap };
  };
};
