import Map "mo:core/Map";
import List "mo:core/List";
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

  type NewActor = {
    prompts : Map.Map<Nat, PromptRecord>;
    blogPosts : Map.Map<Nat, BlogPost>;
    favorites : Map.Map<Principal, List.List<Nat>>;
    newsletterSubscribers : List.List<Text>;
    contactSubmissions : List.List<ContactSubmission>;
    userProfiles : Map.Map<Principal, UserProfile>;
    nextPromptId : Nat;
    nextBlogPostId : Nat;
  };

  public func run(old : OldActor) : NewActor {
    let initialPrompts = Map.fromIter<Nat, PromptRecord>(
      [
        (
          1,
          {
            id = 1;
            title = "Stunning 4K Nature B-Roll";
            description = "Create seamless 4K video loops of natural landscapes perfect for background footage and transitions.";
            category = #videoGeneration;
            fullText = "Prompt: Generate 60 seconds of high-resolution 4K video showcasing a serene natural landscape with smooth camera movement. Focus on details like wind blowing through grass, rustling leaves, and subtle lighting changes. Example scenery suggestions: mountain valley at sunrise, forest clearing with sunbeams, panoramic ocean shore, gentle snowfall in a pine forest. Output should be loopable, color-graded for cinematic effect, and include natural ambient sounds. Use shallow depth of field, transition effects, and slow pans for professional B-roll footage.";
            tags = [ "climate", "4K", "nature", "videos", "environment"];
            isPopular = true;
            isNew = true;
            isPremium = false;
          },
        ),
        (
          2,
          {
            id = 2;
            title = "Ultra Realistic Human Portrait Photography";
            description = "Photorealistic portrait of a female model, looking directly at the camera, with a confident and fierce expression, perfect skin in a modern setting, intricate textures.";
            category = #photoGeneration;
            fullText = "Prompt: Take a headshot-style photograph of a woman aged 25-35 with striking green eyes, long dark hair, and a bold fashion sense. Use dramatic lighting with one softbox from the side to create depth and shadow. Capture close-up details of skin texture, intricate jewelry, and bold makeup. Aim for realism in every detail--reflections in eyes, individual hair strands, and natural skin pores. Set the model against a simple background to emphasize the face. Demonstrate mastery of studio lighting, focus, and advanced retouching techniques. Model should have distinctive, camera-ready features.";
            tags = ["model", "photography", "portraits", "female", "fashion"];
            isPopular = true;
            isNew = true;
            isPremium = false;
          },
        ),
        (
          3,
          {
            id = 3;
            title = "Click-Worthy Slogan for Food Delivery";
            description = "Generate a catchy, shareable slogan for a local food delivery app targeting busy professionals and families";
            category = #marketing;
            fullText = "Prompt: Write a short and memorable slogan (under 10 words) for a new food delivery service called 'QuickEats'. The target audience is busy professionals and families seeking convenience and quality. The slogan should emphasize speed ('delivered in moments'), variety, and stress relief. It must be catchy, easy to share on social media, and suitable for use in ads, websites, and merchandise. Think creative wordplay, positive feelings, and instant association with delicious, convenient meals. Make it stand out in a crowded marketplace and easy to remember for repeat business.";
            tags = ["slogan", "food", "delivery", "marketing", "business"];
            isPopular = true;
            isNew = true;
            isPremium = false;
          },
        ),
        (
          4,
          {
            id = 4;
            title = "Business Pitch Deck Slides";
            description = "Create a clear, compelling pitch deck for a startup targeting angel investors";
            category = #business;
            fullText = "Prompt: Design a 12-slide PowerPoint presentation for a pitch deck for a new startup business. The deck should include: company overview, problem statement, solution, market opportunity, business model, competitors, team, financial projections, and ask. Use consistent color schemes, modern fonts, and professional icons. Presentation should be visually striking but not over-designed. Write concise text for each slide focusing on clarity and impact. Include data visualizations, projections, and a call-to-action. Target audience is angel investors looking for high growth opportunities. Make the deck visually appealing, easy to follow, and persuasive overall.";
            tags = ["startups", "pitch", "business", "finance", "investors"];
            isPopular = true;
            isNew = true;
            isPremium = false;
          },
        ),
        (
          5,
          {
            id = 5;
            title = "Trending TikTok Video Idea";
            description = "Generate a viral TikTok video concept that can be executed in under 30 seconds";
            category = #socialMedia;
            fullText = "Prompt: Come up with a creative, trend-based video idea for TikTok (30 seconds or less) designed for maximum shares and likes. Focus on ideas that involve popular music, current challenges, visual effects, and have potential for virality. Provide a step-by-step description of the video, suggested filming techniques, and editing tips. Video should be suitable for a wide audience and incorporate trending hashtags, filters, and transitions. Help creators gain more followers and engagement through originality and trend awareness. Encourage user participation, comedic elements, or unexpected visual surprises to boost engagement.";
            tags = ["tiktok", "video", "marketing", "ideas", "productivity"];
            isPopular = false;
            isNew = false;
            isPremium = false;
          },
        ),
      ].values()
    );

    let entriesIter = initialPrompts.entries().concat(old.prompts.entries());
    let mergedPrompts = Map.fromIter<Nat, PromptRecord>(entriesIter);

    {
      old with
      prompts = mergedPrompts;
      nextPromptId = 6;
    };
  };
};
