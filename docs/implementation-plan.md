# AI SDK UI Refactor + shadcn/ui Chat UI Modernization Plan

## Summary
Refactor chat messaging to AI SDK UI typed message parts, keep LangGraph backend, and migrate the chat UI from Chakra wrappers to shadcn/ui (latest compatible versions) with a modernized but behavior-equivalent UX.

## Chosen Direction
- Backend: keep LangGraph stream (`useStream`) for now.
- UI stack: migrate chat UI to shadcn/ui + Tailwind.
- Upgrade depth: UI + AI dependencies only (no broad platform major migration).
- UX: modernize visuals, keep same flow and semantics.

## Public Interfaces / Types
- Add `types/chat-message.ts`:
  - `FtpMessageMetadata`
  - `FtpDataParts`:
    - `data-status`
    - `data-question`
    - `data-plan`
    - `data-interruptRequestImportStrava`
    - `data-interruptSetupTrainingGoal`
  - `FtpUIMessage = UIMessage<FtpMessageMetadata, FtpDataParts, never>`
- Add `utils/chat/normalize-langgraph.ts`:
  - single adapter converting LangGraph messages/interrupt into typed `FtpUIMessage[]`.

## Implementation Steps

1. **Dependency and UI foundation updates**
- Add/update AI + UI deps (latest compatible):
  - `ai` (AI SDK UI)
  - shadcn prerequisites (`tailwindcss`, `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`, `tailwindcss-animate`)
  - `@radix-ui/*` packages required by chosen components
- Add Tailwind config + global styles.
- Add/refresh `components.json` for shadcn registry usage.
- Keep Next/LangGraph major versions unchanged in this pass.

2. **Introduce shadcn component set used by chat**
- Add/update latest shadcn components used by this app:
  - `button`, `card`, `badge`, `separator`, `scroll-area`, `input`, `label`, `form`, `skeleton`
- Add `lib/utils.ts` (`cn`) and standard variant patterns.
- Replace Chakra-only chat building blocks; do not touch unrelated screens unless needed for compile.

3. **AI SDK UI message model integration**
- Create typed message schema in `types/chat-message.ts`.
- Implement adapter in `utils/chat/normalize-langgraph.ts`:
  - map `system` => `data-status(system)`
  - map `ai:text` => `data-status(assistant)`
  - map `ai:planning` => `data-plan`
  - map `human:question` => `data-question`
  - map active interrupt => synthetic typed interrupt part message
- Preserve message ordering and stable IDs.

4. **Refactor chat renderer to parts-driven UI**
- Update `components/cycling-ftp-booster-agent/index.tsx`:
  - stop direct `Record<string, unknown>` parsing.
  - derive `uiMessages` via adapter.
  - render by `message.parts` with exhaustive part switch.
- Add `components/cycling-ftp-booster-agent/message-part-renderer.tsx` for typed part rendering.
- Keep interrupt action handlers (`thread.submit(...resume...)`) behavior identical.

5. **Migrate chat message presentation to shadcn UI**
- Replace message primitives:
  - `SystemMessage`, `AiMessage`, `QuestionMessage`, `PlanningMessage`,
  - `RequestImportStravaDataInterrupt`, `SetupTrainingGoalInterrupt`
- Use shadcn cards/sections/buttons/form controls with clearer hierarchy:
  - assistant/system bubbles
  - user question/answer cards
  - plan sections (week/day/stage) as structured cards/badges
- Keep existing content and sequence unchanged.

6. **Provider/layout cleanup**
- Remove Chakra provider usage from layout once chat dependencies are migrated.
- Ensure app-level CSS/theme works without Chakra tokens.
- Keep analytics and existing layout semantics intact.

7. **Behavior-safe content cleanup**
- Fix malformed chat copy (e.g., missing space in Strava prompt sentence).
- No prompt logic or orchestration changes.

## Files Expected to Change
- `package.json`, lockfile
- `app/layout.tsx`, `app/globals.css` (or equivalent global style files)
- `tailwind.config.*`, `postcss.config.*`, `components.json`, `lib/utils.ts`
- `types/chat-message.ts`
- `utils/chat/normalize-langgraph.ts`
- `components/cycling-ftp-booster-agent/index.tsx`
- chat message/interrupt components under `components/cycling-ftp-booster-agent/*`
- optional small copy fix in `graph/ftp-booster-graph.ts`

## Test Cases and Acceptance

1. **Adapter correctness**
- Unit tests for each LangGraph payload type -> expected `data-*` part.
- Interrupt mapping creates synthetic typed message and correct ordering.

2. **UI rendering correctness**
- Each `data-*` part renders the expected component.
- Exhaustive switch check enforces compile-time coverage.

3. **Flow regression**
- New thread starts and shows welcome.
- Strava yes/no interrupt works and resumes graph correctly.
- Training form validates and submits.
- Planning output renders full structure (`summary`, `weeks`, `days`, `stages`).

4. **Build/quality**
- `pnpm lint` and `pnpm build` pass.
- No chat-path `any`/unsafe cast usage remains.

## Assumptions / Defaults
- "Latest" means latest **compatible** versions within current platform baseline (no full Next/LangChain major migration).
- Migration target is chat UI + supporting shared UI primitives, not a full app-wide redesign.
- Existing behavior and conversation sequence must stay unchanged in this pass.
