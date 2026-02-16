import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Core React/ReactDOM stays in vendor
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor';
          }

          // Other node_modules grouped
          if (id.includes('node_modules')) {
            return 'vendor';
          }

          // Lazy-loaded student feature chunks
          if (id.includes('components/student/MockTestEngine')) return 'student-mock-test';
          if (id.includes('components/student/RevisionScheduler')) return 'student-revision';
          if (id.includes('components/student/FormulaFlashcards')) return 'student-flashcards';
          if (id.includes('components/student/DoubtHistory')) return 'student-doubts';
          if (id.includes('components/student/PreviousYearPapers')) return 'student-papers';
          if (id.includes('components/student/VoiceInput')) return 'student-voice';
          if (id.includes('components/student/StreakTracker')) return 'student-streak';
          if (id.includes('components/student/ConceptMaps')) return 'student-concepts';
          if (id.includes('components/student/VideoSuggestions')) return 'student-videos';

          // Teacher features
          if (id.includes('components/teacher/DailyDiaryGenerator')) return 'teacher-diary';
          if (id.includes('components/teacher/LessonPlanMaker')) return 'teacher-lesson';
          if (id.includes('components/teacher/QuestionPaperGenerator')) return 'teacher-question';
          if (id.includes('components/teacher/TimetableBuilder')) return 'teacher-timetable';
          if (id.includes('components/teacher/StudentProgressTracker')) return 'teacher-progress';
          if (id.includes('components/teacher/HomeworkManager')) return 'teacher-homework';
          if (id.includes('components/teacher/SchemeOfWorkPlanner')) return 'teacher-scheme';
          if (id.includes('components/teacher/WorksheetCreator')) return 'teacher-worksheet';

          // Other teacher features grouped
          if (id.includes('components/teacher')) {
            return 'teacher-other';
          }

          // Core app
          if (id.includes('components/') || id.includes('pages/')) {
            return 'app-core';
          }
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
})
