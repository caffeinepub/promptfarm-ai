# Specification

## Summary
**Goal:** Seed and display 20 new high-quality AI prompts in the Prompt Library across the existing categories (Video, Photo, Ads, Social Media).

**Planned changes:**
- Define exactly 20 new English PromptRecord seed entries across the existing backend categories: videoGeneration, photoGeneration, cgiAds, and socialMedia, each with title, description, fullText, tags[], and explicit isPopular/isNew/isPremium flags.
- Persist the new prompts in the canister so they are returned by getAllPrompts and appear in the Prompt Library.
- Ensure the seeding process is idempotent (no duplicates on re-run) and does not break existing prompt IDs or existing stored prompts.

**User-visible outcome:** The Prompt Library shows 20 additional prompts (across Video, Photo, Ads, and Social Media) after a normal refresh/reload, without duplicates appearing over time.
