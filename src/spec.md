# Specification

## Summary
**Goal:** Add 30 new high-quality prompts across Video Generation, Photo Generation, CGI Ads, and Social Media, persist them in the backend, and ensure they appear in the Prompt Library.

**Planned changes:**
- Create 30 new English PromptRecord entries in the backend for these categories only: videoGeneration, photoGeneration, cgiAds, socialMedia (each with title, description, fullText, tags[], and flags isPopular/isNew/isPremium).
- Persist the new prompts so they are returned by getAllPrompts and rendered in the Prompt Library.
- Make the prompt-addition logic idempotent to prevent duplicates when re-run.

**User-visible outcome:** The Prompt Library displays 30 additional prompts, and category filtering (Video Generation, Photo Generation, CGI Ads, Social Media) shows the new prompts in the correct sections.
