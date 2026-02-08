import Map "mo:core/Map";
import List "mo:core/List";

module {
  public type PromptCategory = {
    #videoGeneration;
    #photoGeneration;
    #cgiAds;
    #marketing;
    #storytelling;
    #business;
    #socialMedia;
    #design;
  };

  public type PromptRecord = {
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

  public type OldActor = {
    prompts : Map.Map<Nat, PromptRecord>;
  };

  public type NewActor = {
    prompts : Map.Map<Nat, PromptRecord>;
  };

  public func run(old : OldActor) : NewActor {
    let initialPrompts = getInitialPrompts();
    let promptsCopy = old.prompts.clone();
    for (prompt in initialPrompts.values()) {
      promptsCopy.add(prompt.id, prompt);
    };
    { prompts = promptsCopy };
  };

  func getInitialPrompts() : [PromptRecord] {
    [
      {
        id = 1;
        title = "Create a Viral Social Media Video";
        description = "Generate a short video concept designed to go viral on social platforms.";
        category = #videoGeneration;
        fullText = "Create a 30-second video script and storyboard that leverages trending topics, humor, and captivating visuals to maximize shareability on platforms like TikTok and Instagram.";
        tags = ["viral", "social media", "video"];
        isPopular = true;
        isNew = true;
        isPremium = false;
      },
      {
        id = 2;
        title = "Stunning Product Photo Shoot";
        description = "Generate a set of high-quality product photos for ecommerce.";
        category = #photoGeneration;
        fullText = "Create a photo shoot concept that highlights the features of a new product, using creative lighting, backgrounds, and props to make it stand out in online stores.";
        tags = ["product", "photo", "ecommerce"];
        isPopular = true;
        isNew = true;
        isPremium = false;
      },
      {
        id = 3;
        title = "Animated CGI Advertisement";
        description = "Develop a fully animated CGI ad for a new brand.";
        category = #cgiAds;
        fullText = "Create a 60-second CGI advertisement that tells the story of a new brand, using stunning visuals, 3D animation, and engaging narratives to capture the audience's attention.";
        tags = ["CGI", "advertisement", "animation"];
        isPopular = true;
        isNew = true;
        isPremium = true;
      },
      {
        id = 4;
        title = "Engaging Instagram Story Series";
        description = "Create a series of Instagram stories for brand engagement.";
        category = #socialMedia;
        fullText = "Develop a 5-part Instagram story series that uses interactive elements, polls, and captivating visuals to increase audience engagement and brand awareness.";
        tags = ["Instagram", "story", "engagement"];
        isPopular = true;
        isNew = false;
        isPremium = false;
      },
      {
        id = 5;
        title = "YouTube Explainer Video";
        description = "Script and storyboard for a YouTube explainer video.";
        category = #videoGeneration;
        fullText = "Create a 2-minute script and storyboard for a YouTube explainer video that simplifies a complex topic using animations, voiceovers, and clear visuals.";
        tags = ["YouTube", "explainer", "video"];
        isPopular = true;
        isNew = false;
        isPremium = false;
      },
      {
        id = 6;
        title = "Lifestyle Product Photography";
        description = "Generate lifestyle product photos in natural settings.";
        category = #photoGeneration;
        fullText = "Create photo concepts that showcase products being used in real-life scenarios, emphasizing authenticity, emotions, and relatable environments.";
        tags = ["lifestyle", "product", "photography"];
        isPopular = true;
        isNew = true;
        isPremium = true;
      },
      {
        id = 7;
        title = "3D Animated Logo Reveal";
        description = "Design a 3D animated logo reveal for branding.";
        category = #cgiAds;
        fullText = "Develop a short 3D animation that introduces a company's logo with dynamic movements, particle effects, and sound design to enhance brand recognition.";
        tags = ["3D", "animation", "logo"];
        isPopular = false;
        isNew = false;
        isPremium = false;
      },
      {
        id = 8;
        title = "TikTok Dance Challenge Video";
        description = "Create a dance challenge video for TikTok.";
        category = #videoGeneration;
        fullText = "Generate a 15-second video featuring an original dance routine, catchy music, and clear instructions to encourage user participation in a viral challenge.";
        tags = ["TikTok", "dance", "challenge"];
        isPopular = true;
        isNew = true;
        isPremium = false;
      },
      {
        id = 9;
        title = "Influencer Lifestyle Photo Series";
        description = "Develop a photo series for influencer marketing.";
        category = #photoGeneration;
        fullText = "Create a cohesive set of photos that showcase an influencer using specific products in aspirational settings, emphasizing lifestyle and brand partnerships.";
        tags = ["influencer", "lifestyle", "photo"];
        isPopular = false;
        isNew = false;
        isPremium = true;
      },
      {
        id = 10;
        title = "Facebook Video Ad Campaign";
        description = "Design a Facebook video ad series.";
        category = #cgiAds;
        fullText = "Develop a series of short CGI-enhanced video ads tailored for Facebook audiences, focusing on product benefits, calls-to-action, and brand consistency.";
        tags = ["Facebook", "video ad", "CGI"];
        isPopular = true;
        isNew = true;
        isPremium = false;
      },
      {
        id = 11;
        title = "Stop Motion Animation";
        description = "Create a stop motion animation video concept.";
        category = #videoGeneration;
        fullText = "Generate a storyboard and script for a stop motion video, including scene transitions, materials needed, and creative movement ideas.";
        tags = ["stop motion", "animation", "video"];
        isPopular = false;
        isNew = false;
        isPremium = false;
      },
      {
        id = 12;
        title = "Food Photography Series";
        description = "Develop a photo series for food advertising.";
        category = #photoGeneration;
        fullText = "Create concepts for capturing mouth-watering food photos, focusing on lighting, composition, and creative plating techniques.";
        tags = ["food", "photography", "advertising"];
        isPopular = true;
        isNew = true;
        isPremium = false;
      },
      {
        id = 13;
        title = "Virtual Reality Ad Experience";
        description = "Design an interactive VR ad campaign.";
        category = #cgiAds;
        fullText = "Create concepts for a virtual reality advertisement that allows users to interact with products in a simulated 3D environment.";
        tags = ["VR", "virtual reality", "advertising"];
        isPopular = false;
        isNew = true;
        isPremium = true;
      },
      {
        id = 14;
        title = "Pinterest Pin Design";
        description = "Generate visually appealing pins for Pinterest marketing.";
        category = #photoGeneration;
        fullText = "Create templates and design ideas for Pinterest pins that drive traffic, focusing on vertical layouts, branded elements, and lifestyle photography.";
        tags = ["Pinterest", "design", "photography"];
        isPopular = true;
        isNew = false;
        isPremium = false;
      },
      {
        id = 15;
        title = "Instagram Reel Series";
        description = "Develop a series of Instagram Reels for brand promotion.";
        category = #videoGeneration;
        fullText = "Create concepts for short, engaging video clips that highlight products, tutorials, or lifestyle moments in a vertical format.";
        tags = ["Instagram", "reels", "video"];
        isPopular = true;
        isNew = true;
        isPremium = false;
      },
      {
        id = 16;
        title = "Interactive CGI Web Banner";
        description = "Design an interactive web banner with CGI elements.";
        category = #cgiAds;
        fullText = "Create concepts for dynamic web banners that use 3D animation, interactive features, and responsive design to increase engagement.";
        tags = ["web banner", "CGI", "interactive"];
        isPopular = false;
        isNew = false;
        isPremium = true;
      },
      {
        id = 17;
        title = "Snapchat Filter Video";
        description = "Create a promotional video using Snapchat filters.";
        category = #videoGeneration;
        fullText = "Develop a video concept that showcases a brand's products or services using custom Snapchat filters and augmented reality effects.";
        tags = ["Snapchat", "video", "filters"];
        isPopular = true;
        isNew = true;
        isPremium = false;
      },
      {
        id = 18;
        title = "Celebrity Endorsement Photo Series";
        description = "Develop photo concepts for celebrity endorsement campaigns.";
        category = #photoGeneration;
        fullText = "Create ideas for photo shoots featuring celebrities using your products, focusing on authenticity, relatability, and social media appeal.";
        tags = ["celebrity", "endorsement", "photography"];
        isPopular = false;
        isNew = false;
        isPremium = true;
      },
      {
        id = 19;
        title = "Twitter Video Ad";
        description = "Design a short video ad optimized for Twitter.";
        category = #cgiAds;
        fullText = "Develop a 15-second video ad concept that captures attention quickly, uses branding elements, and encourages sharing on Twitter.";
        tags = ["Twitter", "video ad", "CGI"];
        isPopular = true;
        isNew = true;
        isPremium = false;
      },
      {
        id = 20;
        title = "LinkedIn Professional Video";
        description = "Create a professional video for LinkedIn marketing.";
        category = #videoGeneration;
        fullText = "Generate a video script and storyboard for a corporate audience, focusing on industry insights, thought leadership, and professional branding.";
        tags = ["LinkedIn", "professional", "video"];
        isPopular = false;
        isNew = false;
        isPremium = false;
      },
      {
        id = 21;
        title = "Product Launch Photography";
        description = "Develop a photo series for product launches.";
        category = #photoGeneration;
        fullText = "Create concepts for capturing product launch events, focusing on packaging, unboxing, and lifestyle shots that build anticipation.";
        tags = ["product launch", "photography", "lifestyle"];
        isPopular = true;
        isNew = true;
        isPremium = false;
      },
      {
        id = 22;
        title = "Animated GIF Ad";
        description = "Design a series of animated GIF ads for digital marketing.";
        category = #cgiAds;
        fullText = "Create concepts for looping animated GIFs that highlight product features, use vibrant colors, and drive social media engagement.";
        tags = ["animated GIF", "digital ads", "CGI"];
        isPopular = false;
        isNew = true;
        isPremium = true;
      },
      {
        id = 23;
        title = "Facebook Live Video";
        description = "Create a concept for an engaging Facebook Live video.";
        category = #videoGeneration;
        fullText = "Develop ideas for interactive live video sessions, including Q&A, behind-the-scenes, and product demonstrations to boost engagement.";
        tags = ["Facebook Live", "video", "engagement"];
        isPopular = true;
        isNew = false;
        isPremium = false;
      },
      {
        id = 24;
        title = "Fashion Lookbook Photography";
        description = "Create a digital lookbook for fashion brands.";
        category = #photoGeneration;
        fullText = "Develop photo concepts for showcasing clothing collections, focusing on trends, seasonality, and model poses.";
        tags = ["fashion", "lookbook", "photography"];
        isPopular = true;
        isNew = true;
        isPremium = false;
      },
      {
        id = 25;
        title = "Virtual Product Launch Event";
        description = "Design a virtual product launch event with CGI elements.";
        category = #cgiAds;
        fullText = "Create concepts for immersive online product launches that use virtual stages, 3D product visualizations, and live streaming components.";
        tags = ["virtual event", "product launch", "CGI"];
        isPopular = false;
        isNew = false;
        isPremium = true;
      },
      {
        id = 26;
        title = "Audio-Visual Podcast Intro";
        description = "Design an audio-visual intro for podcasts.";
        category = #videoGeneration;
        fullText = "Create a short video and audio sequence for podcast intros, including animation, sound effects, and branding elements.";
        tags = ["podcast", "intro", "audio-visual"];
        isPopular = true;
        isNew = true;
        isPremium = false;
      },
      {
        id = 27;
        title = "Pet Photography Series";
        description = "Develop a photo series for pet products and services.";
        category = #photoGeneration;
        fullText = "Create concepts for capturing pets in dynamic poses, using props and backgrounds that highlight their personalities.";
        tags = ["pet", "photography", "lifestyle"];
        isPopular = false;
        isNew = false;
        isPremium = false;
      },
      {
        id = 28;
        title = "360-Degree Product Videos";
        description = "Create 360-degree video showcases for products.";
        category = #videoGeneration;
        fullText = "Develop video concepts that allow viewers to see products from all angles, using dynamic camera movements, lighting, and close-ups.";
        tags = ["360-degree", "product", "video"];
        isPopular = true;
        isNew = true;
        isPremium = false;
      },
      {
        id = 29;
        title = "Fitness Influencer Photo Series";
        description = "Develop a photo series for fitness influencer campaigns.";
        category = #photoGeneration;
        fullText = "Create ideas for capturing fitness routines, product use, and healthy lifestyle shots to promote wellness brands.";
        tags = ["fitness", "influencer", "photography"];
        isPopular = true;
        isNew = false;
        isPremium = false;
      },
      {
        id = 30;
        title = "Augmented Reality Ad Campaign";
        description = "Design an AR ad campaign with interactive features.";
        category = #cgiAds;
        fullText = "Create concepts for augmented reality advertising that allows users to interact with products and virtual experiences using mobile devices.";
        tags = ["augmented reality", "advertising", "AR"];
        isPopular = true;
        isNew = true;
        isPremium = true;
      },
    ];
  };
};
