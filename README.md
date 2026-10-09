# Code Crushers — AI-Powered Adaptive Learning Prototype

A no-build, browser-based hackathon prototype for TechSprint 2026 / SDG 4: Quality Education.

## Run locally
1. Download and unzip the project.
2. Open `index.html` in Chrome, Edge, Firefox, or another modern browser.
3. Click **Start diagnostic** and complete the eight questions.
4. Review the topic-level results, open lessons from the learning path, answer practice questions, and take the retest.
5. Open **My progress** to compare diagnostic and retest scores.

No installation, backend, or API key is required. For the smoothest experience, use a local static server or deploy the folder to Vercel.

## Prototype flow
**Diagnose → Identify → Adapt → Practice → Retest → Measure**

- Diagnostic and retest contain different questions across Variables, Conditions, Loops, and Arrays.
- Overall and per-topic scores are calculated from the answers submitted.
- Topic labels use configurable prototype thresholds in `app.js`: Strong ≥ 80%, Moderate ≥ 60%, Weak ≥ 40%, Needs Attention < 40%.
- The learning path prioritizes the lowest-scoring topics.
- Lessons provide a beginner-friendly explanation, a worked example, a hint, and two levels of practice.
- Progress comparisons are based on the actual diagnostic and retest attempts in the current browser session.

## Architecture
- `index.html` — page structure and screen containers.
- `styles.css` — responsive visual design.
- `app.js` — question banks, scoring, topic classification, learning recommendations, practice feedback, retest, and progress comparison.

The lesson/adaptation logic is a prepared-content fallback. No external AI service is connected in this prototype. It is intentionally usable without paid APIs or exposed secrets.

## Limitations
- Demo student only; no authentication, server, teacher console, or cross-device persistence.
- Results are held in browser memory and reset when the page is refreshed.
- Thresholds are prototype defaults, not validated educational standards.
- The prepared adaptive rules demonstrate the product concept but are not a trained AI model.
- This is a prototype for demonstration, not a validated educational assessment tool.

## Jury demo walkthrough (about 3 minutes)
1. Start the diagnostic and answer a mix of questions correctly and incorrectly.
2. Review the overall score and the four topic-level classifications.
3. Show how the learning path sorts topics by performance.
4. Open a lesson; explain the worked example and hint.
5. Answer the practice question incorrectly once to show supportive feedback, then continue to the challenge.
6. Return to the learning path and start the retest.
7. Compare the new scores with the diagnostic on **My progress**. Do not promise a specific improvement; the result depends on answers.
