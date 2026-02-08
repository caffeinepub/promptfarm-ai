import Map "mo:core/Map";
import Text "mo:core/Text";
import List "mo:core/List";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Migration "migration";

(with migration = Migration.run)
actor {
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

  module PromptRecord {
    public func compare(record1 : PromptRecord, record2 : PromptRecord) : Order.Order {
      Int.compare(record1.id, record2.id);
    };
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

  let prompts = Map.empty<Nat, PromptRecord>();
  let blogPosts = Map.empty<Nat, BlogPost>();
  let favorites = Map.empty<Principal, List.List<Nat>>();
  let newsletterSubscribers = List.empty<Text>();
  let contactSubmissions = List.empty<ContactSubmission>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  var nextPromptId = 168;
  var nextBlogPostId = 1;

  // Helper function to check if a user has premium access
  func hasPremiumAccess(caller : Principal) : Bool {
    if (AccessControl.isAdmin(accessControlState, caller)) {
      return true;
    };

    switch (userProfiles.get(caller)) {
      case (null) { false };
      case (?profile) { profile.hasPremiumMembership };
    };
  };

  // Helper function to filter prompts based on user access
  func filterPromptsByAccess(caller : Principal, promptList : [PromptRecord]) : [PromptRecord] {
    if (hasPremiumAccess(caller)) {
      return promptList;
    };

    promptList.filter(func(prompt) { not prompt.isPremium });
  };

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Prompt Management
  public shared ({ caller }) func addPrompt(record : PromptRecord) : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add prompts");
    };

    let promptId = nextPromptId;
    let newPrompt : PromptRecord = {
      id = promptId;
      title = record.title;
      description = record.description;
      category = record.category;
      fullText = record.fullText;
      tags = record.tags;
      isPopular = record.isPopular;
      isNew = record.isNew;
      isPremium = record.isPremium;
    };

    prompts.add(promptId, newPrompt);
    nextPromptId += 1;
    promptId;
  };

  public query ({ caller }) func getPrompt(id : Nat) : async PromptRecord {
    switch (prompts.get(id)) {
      case (null) { Runtime.trap("Prompt not found") };
      case (?prompt) {
        if (prompt.isPremium and not hasPremiumAccess(caller)) {
          Runtime.trap("Unauthorized: Premium membership required to access this prompt");
        };
        prompt;
      };
    };
  };

  public query ({ caller }) func getAllPrompts() : async [PromptRecord] {
    let allPrompts = prompts.values().toArray().sort();
    filterPromptsByAccess(caller, allPrompts);
  };

  public shared ({ caller }) func toggleFavoritePrompt(promptId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can favorite prompts");
    };

    // Verify the prompt exists and user has access to it
    switch (prompts.get(promptId)) {
      case (null) { Runtime.trap("Prompt not found") };
      case (?prompt) {
        if (prompt.isPremium and not hasPremiumAccess(caller)) {
          Runtime.trap("Unauthorized: Premium membership required to favorite this prompt");
        };
      };
    };

    let currentFavorites = switch (favorites.get(caller)) {
      case (null) { List.empty<Nat>() };
      case (?list) { list };
    };

    let isFavorite = currentFavorites.any(func(id) { id == promptId });

    if (isFavorite) {
      let updatedFavorites = currentFavorites.filter(func(id) { id != promptId });
      favorites.add(caller, updatedFavorites);
    } else {
      currentFavorites.add(promptId);
      favorites.add(caller, currentFavorites);
    };
  };

  public query ({ caller }) func getFavoritePrompts() : async [PromptRecord] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access favorites");
    };

    let favoriteIds = switch (favorites.get(caller)) {
      case (null) { List.empty<Nat>() };
      case (?list) { list };
    };

    let favoritePrompts = favoriteIds.map<Nat, PromptRecord>(
      func(id) {
        switch (prompts.get(id)) {
          case (null) { Runtime.trap("Prompt not found") };
          case (?prompt) { prompt };
        };
      }
    );

    let promptArray = favoritePrompts.toArray();
    filterPromptsByAccess(caller, promptArray);
  };

  public query ({ caller }) func getPromptsByCategory(category : PromptCategory) : async [PromptRecord] {
    let categoryPrompts = prompts.values().toArray().filter(
      func(prompt) {
        prompt.category == category;
      }
    );
    filterPromptsByAccess(caller, categoryPrompts);
  };

  // Blog Management
  public shared ({ caller }) func addBlogPost(title : Text, content : Text, author : Text) : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add blog posts");
    };

    let timestamp = Time.now();

    let newPost : BlogPost = {
      id = nextBlogPostId;
      title;
      content;
      author;
      timestamp;
    };

    blogPosts.add(nextBlogPostId, newPost);
    nextBlogPostId += 1;
    newPost.id;
  };

  public query ({ caller }) func getBlogPost(id : Nat) : async BlogPost {
    switch (blogPosts.get(id)) {
      case (null) { Runtime.trap("Blog post not found") };
      case (?post) { post };
    };
  };

  public query ({ caller }) func getAllBlogPosts() : async [BlogPost] {
    blogPosts.values().toArray();
  };

  // Contact and Newsletter (Public Access)
  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async () {
    let timestamp = Time.now();

    let submission : ContactSubmission = {
      name;
      email;
      message;
      timestamp;
    };

    contactSubmissions.add(submission);
  };

  public shared ({ caller }) func subscribeToNewsletter(email : Text) : async () {
    newsletterSubscribers.add(email);
  };

  // Admin functions for viewing submissions
  public query ({ caller }) func getContactSubmissions() : async [ContactSubmission] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view contact submissions");
    };
    contactSubmissions.toArray();
  };

  public query ({ caller }) func getNewsletterSubscribers() : async [Text] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view newsletter subscribers");
    };
    newsletterSubscribers.toArray();
  };
};
