# Specification

## Summary
**Goal:** Seed exactly 5 non-premium sample prompts (Video, Photo, Marketing, Social Media, Business) into the Motoko canister so they appear automatically in the Prompt Library after deploy.

**Planned changes:**
- Add idempotent backend seeding on init/upgrade to create exactly 5 persisted PromptRecord entries when the prompt collection is empty.
- Ensure the 5 seeded prompts are distributed 1-per-category across: #videoGeneration, #photoGeneration, #marketing, #socialMedia, #business, each with non-empty title/description/fullText and at least one tag, and isPremium = false.
- Confirm the Prompt Library continues to fetch prompts via getAllPrompts and renders the 5 seeded prompts in the existing grid with correct category labels via the existing categoryConfig mapping.

**User-visible outcome:** On a fresh deploy, the Prompt Library page shows 5 ready-to-use sample prompt cards (one in each of the specified categories) without any admin action or authentication.
