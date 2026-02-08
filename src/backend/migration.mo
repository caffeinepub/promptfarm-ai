import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Int "mo:core/Int";

module {
  type State = {
    // Must always use final types for direct state mapping.
    prompts : Map.Map<Nat, { id : Nat; title : Text; description : Text; category : { #videoGeneration; #photoGeneration; #cgiAds; #marketing; #storytelling; #business; #socialMedia; #design }; fullText : Text; tags : [Text]; isPopular : Bool; isNew : Bool; isPremium : Bool }>;
    blogPosts : Map.Map<Nat, { id : Nat; title : Text; content : Text; author : Text; timestamp : Int }>;
    favorites : Map.Map<Principal, List.List<Nat>>;
    newsletterSubscribers : List.List<Text>;
    contactSubmissions : List.List<{ name : Text; email : Text; message : Text; timestamp : Int }>;
    userProfiles : Map.Map<Principal, { name : Text; hasPremiumMembership : Bool }>;
    nextPromptId : Nat;
    nextBlogPostId : Nat;
  };

  public func run(old : State) : State {
    old;
  };
};
