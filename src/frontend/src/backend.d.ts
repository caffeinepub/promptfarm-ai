import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PromptRecord {
    id: bigint;
    title: string;
    isPremium: boolean;
    tags: Array<string>;
    description: string;
    fullText: string;
    isPopular: boolean;
    category: PromptCategory;
    isNew: boolean;
}
export interface BlogPost {
    id: bigint;
    title: string;
    content: string;
    author: string;
    timestamp: bigint;
}
export interface UserProfile {
    hasPremiumMembership: boolean;
    name: string;
}
export interface ContactSubmission {
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
}
export enum PromptCategory {
    cgiAds = "cgiAds",
    marketing = "marketing",
    design = "design",
    photoGeneration = "photoGeneration",
    business = "business",
    socialMedia = "socialMedia",
    videoGeneration = "videoGeneration",
    storytelling = "storytelling"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addBlogPost(title: string, content: string, author: string): Promise<bigint>;
    addPrompt(record: PromptRecord): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllBlogPosts(): Promise<Array<BlogPost>>;
    getAllPrompts(): Promise<Array<PromptRecord>>;
    getBlogPost(id: bigint): Promise<BlogPost>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContactSubmissions(): Promise<Array<ContactSubmission>>;
    getFavoritePrompts(): Promise<Array<PromptRecord>>;
    getNewsletterSubscribers(): Promise<Array<string>>;
    getPrompt(id: bigint): Promise<PromptRecord>;
    getPromptsByCategory(category: PromptCategory): Promise<Array<PromptRecord>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitContactForm(name: string, email: string, message: string): Promise<void>;
    subscribeToNewsletter(email: string): Promise<void>;
    toggleFavoritePrompt(promptId: bigint): Promise<void>;
}
