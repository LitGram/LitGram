# Sarathi AI Rajasthan Roadmap

## Direction Locked In
This roadmap reflects product choices for Rajasthan RBSE Class 11-12 government-school usage.

## Keep (Core Product)

### Student Features to Keep
- Socratic Tutor Chat with English/Hinglish/Hindi toggle.
- Mock Test Engine with timer and results.
- Previous Year Papers with topic trend view.
- Revision Scheduler.
- Formula Flashcards.
- Study Streak Tracker.
- Doubt History with search.
- Voice Input for low-bandwidth/question capture flows.

### Teacher Features to Keep
- Daily Diary Generator.
- Lesson Plan Maker.
- Question Paper Generator.
- Worksheet Creator.
- APAR Assistant.
- Observation Report Generator.
- Result Analysis Tool.
- Homework Manager.
- Timetable Builder.
- Parent Communication Helper.
- Circular Tracker.

## De-prioritize / Drop
- Concept Maps module (de-prioritize from active roadmap).
- Development Log module (de-prioritize from active roadmap).

Reason:
- lower impact vs exam/admin core flows,
- extra maintenance cost on low-end devices,
- available alternatives in existing learning ecosystem.

## Add (Missed High-Impact Features)
1. DIKSHA integration (videos, QR-linked chapters, NISHTHA modules, offline-first).
2. ShalaDarpan sync (attendance/student profile ingest + homework/attendance push where allowed).
3. Handwritten answer upload + AI-assisted grading.
4. Board-style answer writing practice (5/10 mark descriptive prompts + rubric).
5. Science practical helper (steps, viva questions, error checklists).
6. Official syllabus tracker (latest RBSE schedule alignment + completion tracking).

## Phased Execution

### Phase 1 (Now): School-Code Foundation + Core Reliability
- Implement real school-code linking for teacher-assigned homework and student visibility.
- Harden existing core modules for production reliability (chat, tests, papers, teacher generators).
- Remove lint/build blockers and stabilize release branch.

### Phase 2: Exam Impact Layer
- Official syllabus tracker.
- Answer writing practice.
- Practicals helper.
- Stronger paper analytics (chapter/topic frequency, high-weight chapter signals).

### Phase 3: Ecosystem Integrations
- DIKSHA integration.
- ShalaDarpan sync.
- Unified notification routing across student/guardian/teacher roles.

### Phase 4: Advanced Evaluation
- Handwritten answer upload and AI-assisted rubric grading.
- Human-in-loop controls for teacher validation.
- Cost and model quality optimization.

## Technical Priorities
- Local-first UX with graceful offline behavior.
- Backend APIs behind clear service boundaries.
- School-code scoped data model for cross-role sharing.
- Role-safe access control from day one.
- Performance target for low-memory Android devices.

## Immediate Work Started in This Iteration
- Phase 1 task initiated: school-code homework linking between teacher and student experiences.
