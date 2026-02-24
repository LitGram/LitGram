# Sarathi AI: Features and Intended Features

## Product Intent
Sarathi AI is a dual-role education assistant for RBSE Class 11-12 users.
It is designed to support students with guided learning and support teachers with high-frequency school workflows.

## Current Features (Implemented)

### Core Platform
- Role-based login for Student, Guardian, and Teacher.
- Route protection by role.
- Local session persistence using Zustand + localStorage.
- Responsive React + Tailwind UI.
- In-app notifications center.
- Toast-based feedback and common export utilities.

### Student Module
- Socratic Tutor Chat with language choice (English, Hinglish, Hindi).
- Subject-based dashboard navigation.
- Mock Test Engine with configurable questions/time.
- Test runner with timer, progress, and result summary.
- Revision Scheduler with comfort-level-based planning.
- Formula Flashcards with deck selection and mastery tracking.
- Doubt History screen with filtering/search and resolution tracking.
- Previous Year Papers explorer with topic trend highlights.
- Voice Input module (browser speech recognition flow).
- Study Streak Tracker with goals and badge-style progress.
- Concept Maps viewer/editor-style experience.
- Video Suggestions library with filtering/search.

### Teacher Module
- Daily Diary Generator.
- Lesson Plan Maker.
- Question Paper Generator.
- Teaching Ideas helper.
- Circular Tracker.
- Parent Communication helper.
- APAR Assistant.
- Result Analysis tool.
- Timetable Builder.
- Student Progress Tracker.
- Homework Manager.
- Scheme of Work Planner.
- Meeting Notes Generator.
- Worksheet Creator.
- Development Log.
- Observation Report Generator.

### Data/Utility Layer
- RBSE curriculum master data.
- Flashcards data packs.
- PDF export and text export utilities.
- IndexedDB helper utilities for local-first persistence patterns.

## Intended Features (Next)

### AI and Backend
- Replace mock AI responses with real backend endpoints for student and teacher agents.
- Add structured prompt + template orchestration per tool (diary, lesson, APAR, worksheet, etc.).
- Add backend validation so generated outputs match Rajasthan school formats consistently.

### Student Product Enhancements
- True doubt-history auto-save from real chat sessions.
- Better previous-year paper analytics (frequency, chapter weightage, likely high-yield topics).
- Smarter adaptive revision plans from past test performance.
- Topic-level weak-area recommendations after each mock test.

### Teacher Product Enhancements
- School-code-based teacher-student homework linking (real multi-user flow).
- Submission tracking with class-level and student-level status analytics.
- Better progress graphs and longitudinal performance views.
- Reusable templates and institution presets for school-specific formats.

### Collaboration and Notifications
- Real event-driven notifications (homework deadlines, pending checks, revision reminders).
- Cross-role notification routing by school, class, and subject.

### Reliability, Security, and Ops
- Real authentication/authorization with backend identity.
- Cloud persistence layer replacing local-only storage for production use.
- Audit logs and role-safe data boundaries.
- Test coverage for critical flows (auth, generators, exports, test engine).
- Performance tuning for large bundles and slow mobile devices.

## Practical Positioning
- Student value: guided learning, planning, exam readiness.
- Teacher value: time saved on repetitive academic/admin tasks.
- Institutional value: standardized output quality and better tracking visibility.
