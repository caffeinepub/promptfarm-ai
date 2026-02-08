# Specification

## Summary
**Goal:** Add 30 new high-quality AI prompts across existing categories and have them automatically appear in the Prompt Library.

**Planned changes:**
- Add 30 new PromptRecord entries distributed across the existing categories (videoGeneration, photoGeneration, cgiAds, marketing, storytelling, business, socialMedia, design) with title, description, fullText, tags, and correct isPopular/isNew/isPremium values.
- Persist the new prompts in canister state with unique IDs (without overwriting existing prompts) and update nextPromptId accordingly.
- If needed, implement a conditional upgrade migration to inject the new prompts into existing deployments so they are returned by getAllPrompts and getPromptsByCategory.
- Ensure the existing Prompt Library UI surfaces the new prompts via the current fetch flow (useGetAllPrompts → PromptLibraryPage) with no manual admin creation steps.

**User-visible outcome:** The Prompt Library shows a higher total prompt count and the new prompts appear as PromptCards, including when filtering by their respective categories (subject to existing premium gating rules).
