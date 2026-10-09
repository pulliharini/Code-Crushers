# AI-Powered Adaptive Learning System — Development Prompt

## Project Context

**Team:** Code Crushers  
**Event:** TechSprint 2026 — SDG Hackathon  
**SDG:** 4 — Quality Education  
**Project:** AI-Powered Adaptive Learning System for Personalized Education

## Master Prompt

Act as an experienced full-stack developer, AI engineer, UX/UI designer, and education-technology product architect. Build a functional hackathon MVP for an **AI-Powered Adaptive Learning System for Personalized Education**.

The platform must do more than behave like a general-purpose chatbot. Its central feature is a closed-loop learning process:

**Diagnose → Identify → Adapt → Practice → Retest → Measure**

The system should identify the specific concepts a student struggles with, provide personalized learning support, and verify through reassessment whether the support improved the student's understanding.

## Problem to Solve

Traditional learning environments often give students the same content, teaching method, and pace. An overall test score may not show which concepts a student misunderstood, why errors occurred, or what to study next. The platform should make learning gaps visible and give each student targeted support based on demonstrated performance.

## MVP Scope

Build a focused, demonstrable prototype using **one subject: introductory programming**, with these four topics:

1. Variables
2. Conditions
3. Loops
4. Arrays

Include the following end-to-end student journey.

### 1. Student Landing Page and Diagnostic Assessment

- Create a welcoming, accessible dashboard for a student.
- Let the student start a short diagnostic quiz.
- Include a small set of multiple-choice questions tagged to one of the four topics.
- Show one question at a time, with answer choices, progress, and clear navigation.
- Record the selected answer and whether it is correct.
- Calculate the overall score and a separate score for each topic.
- Do not rely on the overall score alone to decide what the student needs.

### 2. Performance Analysis and Gap Detection

- Analyze results by topic.
- Classify each topic as **Strong**, **Moderate**, **Weak**, or **Needs Attention**.
- Use clear, consistent thresholds and make them easy to configure. A reasonable starting point is:
  - Strong: 80–100%
  - Moderate: 60–79%
  - Weak: 40–59%
  - Needs Attention: below 40%
- Explain that these thresholds are prototype defaults, not validated educational standards.
- Show which concepts the student answered correctly or incorrectly.
- Give concise, supportive feedback explaining the likely concept gap, without shaming the student.

### 3. Personalized Learning Path

- Recommend what the student should learn next, prioritizing weak topics.
- Show a clear sequence of topics and learning activities.
- Include the reason each topic is recommended.
- Avoid recommending extensive practice on topics the student has already demonstrated they understand, unless needed as review.

### 4. Adaptive Learning Experience

For each topic, provide:

- A beginner-friendly explanation.
- A worked example.
- A short hint or analogy when useful.
- Targeted practice questions.
- Immediate feedback after an answer, including why the answer is correct or incorrect.
- A next-step recommendation.

Adapt support to performance. If the student repeatedly struggles, simplify the explanation, add a different example or hint, and/or reduce question difficulty. If the student answers correctly consistently, gradually increase difficulty. Do not merely repeat the same explanation or question.

If an external AI API is not configured, the MVP must still work using prepared explanations, examples, hints, and question banks. Keep any AI integration behind a clearly defined service or function, and never expose API keys in frontend code.

### 5. Retest

- After the learning intervention, offer a reassessment focused on the topics that were weak or needed attention.
- Use different but comparable questions that assess the same concepts; avoid simply repeating the exact same questions.
- Score the retest by topic and overall.
- Make it clear which concepts were reassessed.

### 6. Progress Dashboard

Display:

- Initial diagnostic score.
- Retest score.
- Difference in percentage points.
- Topic-level scores before and after the intervention.
- Status for each topic.
- Topics that improved, stayed the same, or still need practice.
- Recommended next topic or activity.

Use an easy-to-understand chart or progress indicators. For example, a student's overall score might change from 42% to 76%, but treat this only as an illustrative example—not a promised or hard-coded outcome. Calculate all displayed values from actual quiz answers.

## Design and User Experience

Create a polished, modern, student-friendly interface suitable for a live hackathon demonstration.

- Use a consistent visual system, readable typography, sufficient contrast, and clear spacing.
- Make the main journey obvious: **Take Diagnostic → Review Gaps → Learn → Retest → View Progress**.
- Include helpful empty states, loading states, validation, and error messages where appropriate.
- Provide responsive layouts for desktop, tablet, and mobile.
- Use accessible labels and keyboard-friendly controls.
- Use encouraging, respectful language.
- Avoid clutter and avoid presenting the product as just a chatbot.
- Keep the dashboard focused on actionable learning insights.

## Suggested Screens

1. **Welcome / Student Home** — project introduction and start diagnostic button.
2. **Diagnostic Quiz** — topic-tagged questions and progress.
3. **Results and Gap Analysis** — overall score, topic scores, and gap classifications.
4. **Personalized Learning Path** — prioritized topics and recommended activities.
5. **Learning Module** — explanation, example, hint, and adaptive practice.
6. **Retest** — reassessment of targeted concepts.
7. **Progress Dashboard** — before/after comparisons and next steps.

## Data and Logic Requirements

Create a simple, maintainable data model for:

- Topics
- Questions and answer choices
- Correct answers and explanations
- Student responses
- Diagnostic attempts
- Learning activities or interventions
- Retest attempts
- Topic-level and overall scores

Each question should have a topic tag and, where appropriate, a difficulty level. Keep scoring and topic-classification logic separate from UI components so it can be tested and adjusted.

For the MVP, a single demo student and local or in-memory persistence are acceptable if no backend is available. If persistence is implemented, ensure refreshing the page does not unexpectedly erase the demo journey. Clearly document any limitations.

## Technical Implementation Instructions

1. First inspect the existing project structure and use its current framework and conventions if a project already exists.
2. If starting from scratch, choose a practical, widely supported stack appropriate for a hackathon prototype. Briefly state the chosen stack before implementation.
3. Build a working end-to-end application, not just static mockups or a landing page.
4. Implement real quiz interactions, scoring, topic analysis, recommendations, adaptive practice, retesting, and calculated progress comparisons.
5. Use reusable components and keep question data separate from presentation.
6. Include realistic sample questions for all four topics, with correct answers and explanatory feedback.
7. Add sensible validation and handle edge cases, such as unanswered questions or a topic with no scored questions.
8. Do not invent successful learning outcomes; compute them from the student's actual answers.
9. Do not require paid services for the basic demo to work.
10. If something cannot be implemented in the available environment, explain the limitation and provide the best functional fallback rather than pretending it works.

## Demo Acceptance Criteria

The MVP is ready to demonstrate when a reviewer can:

- Start and complete a diagnostic quiz.
- See an overall score and separate scores for Variables, Conditions, Loops, and Arrays.
- See each topic classified as Strong, Moderate, Weak, or Needs Attention.
- Understand why a topic was flagged and what to study next.
- Open a personalized learning activity with explanations and practice.
- Experience a change in support or difficulty after struggling or answering correctly.
- Complete a retest with new, comparable questions.
- Compare diagnostic and retest performance overall and by topic.
- See a data-driven next-step recommendation.
- Use the app on both desktop and mobile-sized screens.

## Expected Deliverables

Provide:

- Complete source code for the working MVP.
- A concise README with setup and run instructions.
- A description of the architecture and scoring thresholds.
- Sample question data for all four topics.
- Any required environment-variable example file, without real secrets.
- A short demo walkthrough showing the full Diagnose → Identify → Adapt → Practice → Retest → Measure cycle.
- A list of assumptions and known limitations.

## Final Instruction

Begin by briefly summarizing the implementation plan and proposed stack. Then implement the application in the current workspace. Prioritize a reliable, polished end-to-end demo that proves the core innovation: **the system uses a student's demonstrated performance to decide what support is needed and checks whether that support produces measurable improvement.**

Keep the solution aligned with **SDG 4 — Quality Education** and the project definition:

> An AI-powered learning system that identifies where a student struggles, adapts how it teaches, and measures whether the student actually improves.
