# Puzzle home and minigame migration

Approved by the user with `yesi`; proceed through implementation and verification without further checkpoints.

## New home

OnePuzzlePuzzleHunt owns a home, puzzle, and epilogue view. Keep the existing brown/pink/Comic Sans theme. Home shows “This constellation might save your life”, “Solve this puzzle to find out why”, the constellation from BaconDegrees, and a “begin” button. Begin navigates to `/puzzle`. Preserve browser history and refresh behavior.

The puzzle view includes the same constellation and Fast Break poster, then the exact user-provided narrative:

- This constellation evokes in my mind a particular scene from an extremely popular movie.
- That constellation might save your life!
- This puzzle is centered around a different obscure film from 1979 called "Fast Break".
- Don't cheat, look things up, or use tools beyond the puzzle minigame linked below. You don't need to know anything at all about Fast Break. The minigame hides some information about Fast Break that might spoil the puzzle.
- I made a tool, bacondegrees420, which is a fun way to find the shortest path connection between any two items: films, cast or crew.
- Visit bacondegrees420.web.app?puzzle - then, type in the box and submit to explore connections to Fast Break.
- You will use this minigame to discover my 6 letter secret scene, which will help you memorize the constellation.

Link the minigame in a new tab. A labeled answer input submits on Enter or button. Trim whitespace and match karate case-insensitively. Incorrect answers remain on the puzzle with neutral accessible feedback. Correct answers unlock and navigate to `/epilogue`; remember success in the session so refresh works, and guard an unearned direct epilogue visit.

Below the input, display “If you get stuck, ask your clanker for a hint by pasting the puzzle narrative below.” A labeled readonly selectable textarea holds the user's hint narrative. Encode all brace-delimited content recursively, innermost first, retaining preceding b64: labels. Nested content is encoded once individually and then again within its parent. Use UTF-8-safe encoding and tests for nested content and malformed braces. No decoded spoilers are rendered in the textarea.

## Epilogue and assets

Copy the existing images into this app's public assets; no cross-origin embeds. The eight epilogue slides are greatnana.avif, pose.png, pose_constellation.png, boxes.png, infographic.png, life_saving_game_screenshot.png, overlay_start.png, overlay_end.png, in this order. Show previous/next controls and left/right keyboard navigation, bounded at the first and last slide. Preserve the final slide's existing knight-and-bishop chess URL. Provide useful image alt text, visible focus, and responsive images. Load epilogue assets only when needed.

## BaconDegrees

Remove the `/slideshow` renderer and old slideshow-specific component/styles. Rename the minigame parameter to `?puzzle`. Initialize the Fast Break (1979) root automatically on a fresh visit without a hash, using the existing database and graph initialization. Keep the target fixed even when stale or unrelated hashes are supplied. The old `?slideshow` no longer enables minigame mode. Clicking the b logo clears both puzzle and slideshow parameters and resets to the normal app.

In puzzle mode, results, card names, card images, root cards, node exclusion clicks, and outbound card links are noninteractive. Guess input/submission and arrow edge exclusions remain available; the b logo is the escape. Preserve normal-mode behavior. Keep accumulated guess history and hidden spoiler details. Input suggestions may support keyboard completion, but cannot navigate away or change the fixed root.

Row colors: gold when the submitted film is The Matrix (1999), regardless of which alternative route was found; otherwise green only when Laurence Fishburne is directly adjacent to Fast Break at the end of the result; otherwise red. Use exact film identity, not a substring that includes sequels. Gold outranks green. Do not explain the hidden coloring rule in the public minigame UI.

## Verification and delivery

Unit tests cover answer matching, recursive hint encoding, routing/reset, color precedence, and restricted interactions. Exercise fresh minigame initialization, history, logo reset, answer-to-epilogue flow, and desktop/mobile visuals. Run builds and lint for both repos plus BaconDegrees tests. BaconDegrees lint runs immediately before final handoff. Commit only task-owned changes on main and push both repos. Preserve the user's uncommitted OnePuzzlePuzzleHunt deployment-script edit.

## Self-review

All requested copy, images, navigation, color rules, and removal scope are specified. This is one coordinated migration spanning two apps, with no new backend, dependency platform, or workflow customization.
