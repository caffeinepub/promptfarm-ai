# Specification

## Summary
**Goal:** Seed 30 additional high-quality AI prompts across existing categories and have them appear in the Prompt Library via the current fetch/listing flow.

**Planned changes:**
- Add exactly 30 new persisted PromptRecord entries in the backend dataset (in canister state) distributed across the existing categories (#videoGeneration, #photoGeneration, #cgiAds, #marketing, #storytelling, #business, #socialMedia, #design).
- Ensure each new prompt includes non-empty title, description, fullText, at least 3 tags, and correct isPopular/isNew/isPremium values.
- Verify the existing listing APIs (e.g., getAllPrompts, getPromptsByCategory) return the expanded dataset and the Prompt Library UI surfaces the new prompts without new UI controls or admin steps.

**User-visible outcome:** Users see more prompts in the Prompt Library, can find the newly added prompts through existing search/category filters, and can open them in the existing prompt details view.
