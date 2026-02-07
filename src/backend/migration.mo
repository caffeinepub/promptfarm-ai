import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";

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

  let newPromptRecords : [(Nat, PromptRecord)] = [
    // Video Generation (10) | 100-109
    (
      107,
      {
        id = 107;
        title = "Cinematic Trailer Generator";
        description = "Generate blockbuster-style movie trailers using AI video synthesis.";
        category = #videoGeneration;
        fullText = "Create a cinematic movie trailer by uploading your script...";
        tags = ["cinematic", "trailer", "video", "AI"];
        isPopular = true;
        isNew = true;
        isPremium = true;
      },
    ),
    (
      108,
      {
        id = 108;
        title = "HD Product Demo Videos";
        description = "Transform product images into dynamic HD video demos.";
        category = #videoGeneration;
        fullText = "Upload product images and generate professional video demos...";
        tags = ["product", "demo", "video", "animation"];
        isPopular = true;
        isNew = true;
        isPremium = false;
      },
    ),
    (
      109,
      {
        id = 109;
        title = "AI Explainer Videos";
        description = "Convert text content into animated explainer videos.";
        category = #videoGeneration;
        fullText = "Submit text-based guides or instructions for video explanations...";
        tags = ["explainer", "video", "animation"];
        isPopular = true;
        isNew = false;
        isPremium = false;
      },
    ),
    (
      110,
      {
        id = 110;
        title = "Social Media Reels";
        description = "Generate short-form videos optimized for platforms like TikTok.";
        category = #videoGeneration;
        fullText = "Transform content into engaging short-form videos for social media...";
        tags = ["reels", "shorts", "social media"];
        isPopular = true;
        isNew = false;
        isPremium = false;
      },
    ),
    (
      111,
      {
        id = 111;
        title = "360 VR Video Experiences";
        description = "Create immersive 360-degree VR videos from 2D content.";
        category = #videoGeneration;
        fullText = "Convert 2D videos into interactive VR experiences...";
        tags = ["360", "VR", "video", "immersive"];
        isPopular = true;
        isNew = false;
        isPremium = true;
      },
    ),
    (
      112,
      {
        id = 112;
        title = "AI Voiceovers";
        description = "Automate professional voiceovers for video projects.";
        category = #videoGeneration;
        fullText = "Add AI-generated voiceovers to your videos using various tones...";
        tags = ["voiceover", "audio", "video", "AI"];
        isPopular = true;
        isNew = true;
        isPremium = false;
      },
    ),
    (
      113,
      {
        id = 113;
        title = "Action Scene Generator";
        description = "Create action-packed video scenes with AI effects.";
        category = #videoGeneration;
        fullText = "Generate high-intensity action scenes with special effects...";
        tags = ["action", "effects", "video", "AI"];
        isPopular = false;
        isNew = true;
        isPremium = true;
      },
    ),
    (
      114,
      {
        id = 114;
        title = "Event Promo Videos";
        description = "Design promotional videos for events and campaigns.";
        category = #videoGeneration;
        fullText = "Use templates to create eye-catching event promo videos...";
        tags = ["event", "promo", "video", "marketing"];
        isPopular = true;
        isNew = false;
        isPremium = false;
      },
    ),
    (
      115,
      {
        id = 115;
        title = "Lifestyle Montage Creator";
        description = "Compile lifestyle snippets into trending video montages.";
        category = #videoGeneration;
        fullText = "Import clips and generate stylish lifestyle video montages...";
        tags = ["montage", "lifestyle", "video", "trending"];
        isPopular = false;
        isNew = true;
        isPremium = false;
      },
    ),
    (
      116,
      {
        id = 116;
        title = "Gaming Highlight Videos";
        description = "Showcase gaming moments in dynamic highlight videos.";
        category = #videoGeneration;
        fullText = "Submit gaming footage for AI-edited highlight compilations...";
        tags = ["gaming", "highlights", "video", "AI"];
        isPopular = true;
        isNew = false;
        isPremium = true;
      },
    ),
    // Photo Generation (10) | 110-119
    (
      117,
      {
        id = 117;
        title = "AI Portrait Enhancer";
        description = "Transform selfies into high-quality portrait photos.";
        category = #photoGeneration;
        fullText = "Upload selfies for AI photo enhancement and filter application...";
        tags = ["portrait", "photo", "enhancer", "AI"];
        isPopular = true;
        isNew = false;
        isPremium = false;
      },
    ),
    (
      118,
      {
        id = 118;
        title = "Landscape Transformation";
        description = "Convert basic landscape photos into artistic masterpieces.";
        category = #photoGeneration;
        fullText = "Apply artistic filters and scene enhancements to landscape photos...";
        tags = ["landscape", "photo", "artistic", "transformation"];
        isPopular = false;
        isNew = false;
        isPremium = true;
      },
    ),
    (
      119,
      {
        id = 119;
        title = "Fashion Photo Shoots";
        description = "Automate the creation of fashion-inspired photo shoots.";
        category = #photoGeneration;
        fullText = "Generate professional-looking fashion photo shoots with AI styling...";
        tags = ["fashion", "photo", "shoot", "styling"];
        isPopular = true;
        isNew = true;
        isPremium = true;
      },
    ),
    (
      120,
      {
        id = 120;
        title = "Product Photography Enhancer";
        description = "Upgrade product photos for e-commerce and marketing.";
        category = #photoGeneration;
        fullText = "Upload product images for dynamic background and lighting enhancements...";
        tags = ["product", "photo", "enhancer", "ecommerce"];
        isPopular = false;
        isNew = false;
        isPremium = false;
      },
    ),
    (
      121,
      {
        id = 121;
        title = "Vintage Photo Effects";
        description = "Create vintage-styled photos with AI effects.";
        category = #photoGeneration;
        fullText = "Transform photos with retro and vintage filter effects...";
        tags = ["vintage", "photo", "effects", "retro"];
        isPopular = true;
        isNew = true;
        isPremium = true;
      },
    ),
    (
      122,
      {
        id = 122;
        title = "Interior Design Visualization";
        description = "Visualize interior design concepts with AI-generated photos.";
        category = #photoGeneration;
        fullText = "Upload room images for interior design and staging visualizations...";
        tags = ["interior", "design", "photo", "visualization"];
        isPopular = false;
        isNew = false;
        isPremium = false;
      },
    ),
    (
      123,
      {
        id = 123;
        title = "Pet Photography Studio";
        description = "Enhance pet photos with AI filters and effects.";
        category = #photoGeneration;
        fullText = "Create adorable pet photos with specialized AI filters...";
        tags = ["pet", "photography", "photo", "enhancer"];
        isPopular = true;
        isNew = false;
        isPremium = true;
      },
    ),
    (
      124,
      {
        id = 124;
        title = "Nature Photography Editor";
        description = "Optimize nature photos for professional quality.";
        category = #photoGeneration;
        fullText = "Improve color grading and detail in nature photos...";
        tags = ["nature", "photo", "editor", "enhancer"];
        isPopular = false;
        isNew = true;
        isPremium = false;
      },
    ),
    (
      125,
      {
        id = 125;
        title = "Real Estate Photo Enhancer";
        description = "Upgrade real estate listing photos with AI.";
        category = #photoGeneration;
        fullText = "Enhance real estate listing images for better presentation...";
        tags = ["real estate", "photo", "enhancer", "listing"];
        isPopular = true;
        isNew = false;
        isPremium = true;
      },
    ),
    (
      126,
      {
        id = 126;
        title = "Black & White Photography Conversion";
        description = "Convert color photos to dynamic B&W images.";
        category = #photoGeneration;
        fullText = "Transform color photographs into classic black & white images...";
        tags = ["black & white", "photo", "conversion"];
        isPopular = true;
        isNew = true;
        isPremium = false;
      },
    ),
    // CGI Ads (10) | 127-136
    (
      127,
      {
        id = 127;
        title = "Branded Product Animations";
        description = "Create branded CGI animations for advertising campaigns.";
        category = #cgiAds;
        fullText = "Develop product-focused CGI animations for marketing and branding...";
        tags = ["branded", "cgi", "animations", "ads"];
        isPopular = true;
        isNew = false;
        isPremium = true;
      },
    ),
    (
      128,
      {
        id = 128;
        title = "Social Media CGI Ads";
        description = "Design eye-catching CGI ads for social campaigns.";
        category = #cgiAds;
        fullText = "Generate high-impact CGI ads specifically for social media platforms...";
        tags = ["social media", "cgi", "ads", "marketing"];
        isPopular = false;
        isNew = true;
        isPremium = false;
      },
    ),
    (
      129,
      {
        id = 129;
        title = "Product Launch CGI Videos";
        description = "Create dynamic CGI videos for product launches.";
        category = #cgiAds;
        fullText = "Introduce new products with high-energy CGI launch videos...";
        tags = ["product", "cgi", "videos", "launch"];
        isPopular = true;
        isNew = false;
        isPremium = true;
      },
    ),
    (
      130,
      {
        id = 130;
        title = "Influencer Marketing Ads";
        description = "Develop CGI promotions for influencer marketing.";
        category = #cgiAds;
        fullText = "Create high-visibility CGI ads for influencer collaborations...";
        tags = ["influencer", "marketing", "cgi", "ads"];
        isPopular = false;
        isNew = true;
        isPremium = false;
      },
    ),
    (
      131,
      {
        id = 131;
        title = "Fitness Brand Promotions";
        description = "Generate fitness-focused CGI advertisements.";
        category = #cgiAds;
        fullText = "Develop energetic CGI ads tailored for fitness brands and products...";
        tags = ["fitness", "brand", "promotions", "cgi"];
        isPopular = true;
        isNew = true;
        isPremium = true;
      },
    ),
    (
      132,
      {
        id = 132;
        title = "Event Marketing CGI Videos";
        description = "Promote events with engaging CGI video content.";
        category = #cgiAds;
        fullText = "Create visually striking CGI video ads to promote events...";
        tags = ["event", "marketing", "cgi", "videos"];
        isPopular = true;
        isNew = false;
        isPremium = false;
      },
    ),
    (
      133,
      {
        id = 133;
        title = "Fashion CGI Campaigns";
        description = "Produce high-fashion CGI campaigns for brands.";
        category = #cgiAds;
        fullText = "Develop couture-level fashion CGI campaigns for advertising...";
        tags = ["fashion", "cgi", "campaigns", "advertising"];
        isPopular = false;
        isNew = true;
        isPremium = true;
      },
    ),
    (
      134,
      {
        id = 134;
        title = "Luxury Goods Promotions";
        description = "Create high-end CGI ads for luxury products.";
        category = #cgiAds;
        fullText = "Enhance brand image with luxurious CGI promotional videos...";
        tags = ["luxury", "goods", "promotions", "cgi"];
        isPopular = true;
        isNew = false;
        isPremium = false;
      },
    ),
    (
      135,
      {
        id = 135;
        title = "Automotive Advertising CGI";
        description = "Generate dynamic automotive CGI ads for brands.";
        category = #cgiAds;
        fullText = "Showcase vehicles with dynamic automotive CGI campaign content...";
        tags = ["automotive", "advertising", "cgi", "brands"];
        isPopular = false;
        isNew = true;
        isPremium = true;
      },
    ),
    (
      136,
      {
        id = 136;
        title = "Food and Beverage CGI Ads";
        description = "Design mouth-watering CGI ads for food and beverage brands.";
        category = #cgiAds;
        fullText = "Create appealing CGI ads specifically for food and beverage products...";
        tags = [
          "food",
          "beverage",
          "cgi",
          "advertising",
        ];
        isPopular = true;
        isNew = false;
        isPremium = true;
      },
    ),
  ];

  public func run(old : OldActor) : NewActor {
    let updatedPrompts = old.prompts;
    for ((id, record) in newPromptRecords.values()) {
      updatedPrompts.add(id, record);
    };
    { old with prompts = updatedPrompts };
  };
};
