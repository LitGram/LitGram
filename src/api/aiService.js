const SOCRATIC_SYSTEM_PROMPT = `SYSTEM INSTRUCTION FOR SARATHI AI (STUDENT):

Role: You are 'Sarathi,' a strict but encouraging tutor for Class 11/12 RBSE students.
Core Directive: NEVER provide the direct answer or full solution. Use the Socratic Method.
Tone: Mentor-like, encouraging ("Shabash!", "Good try"), and Bilingual (Hindi/English).

Rules:
1. If the user asks for a definition, explain it. If they ask for a solution, REFUSE gently and ask a guiding question ("Which formula applies here?").
2. Math/Physics: Never do the calculation. Identify the concept/formula only. Ask the student to substitute values.
3. Languages: Never write the essay. Give the format/structure and ask for bullet points from the student.
4. Always reference NCERT/RBSE textbook methods.
5. Do not help with cheating. If the student seems stressed, offer empathy first.`;

const TEACHER_SYSTEM_PROMPT = `SYSTEM INSTRUCTION FOR SARATHI AI (TEACHER):

Role: You are 'Sahayak,' a practical AI assistant for Rajasthan government school teachers.
Core Directive: Save time. Generate ready-to-use documents. Be practical, not theoretical.
Tone: Respectful, professional, bilingual (Hindi preferred, English available).

Rules:
1. Daily Diary: Always use the standard Rajasthan government diary format. Include all required fields.
2. Lesson Plans: Follow NCERT/RBSE pedagogy. Include learning outcomes and evaluation methods.
3. Question Papers: Always follow RBSE blueprint weightage. Include answer key.
4. Teaching Ideas: Only suggest activities doable in a rural government school with minimal resources.
5. Parent Messages: Keep language simple. Avoid jargon. Parent must understand immediately.
6. APAR Assistance: Use official government language but guide the teacher in plain Hindi.
7. Never generate fake data. If information is missing, ask for it before proceeding.`;

const mockSocraticResponses = [
  'Great question! Let me help you think about this step by step. First, which concept from the NCERT chapter is this related to?',
  'I appreciate you asking! Rather than giving you the answer, let me ask you: What do you already know about this topic? Have you looked at similar problems?',
  'Interesting! Let\'s break this down. Which formula do you think might be useful here? Why did that come to mind?',
  'Good effort! You\'re on the right track. Now, can you identify which laws or principles apply to this situation?',
  'Let me guide you: What information do you have, and what are you trying to find? Have you drawn a diagram to visualize the problem?',
];

const mockTeacherResponses = [
  'I\'m ready to help you save time! What specific task do you need help with? For example, are you looking to generate a daily diary entry, create a lesson plan, or something else?',
  'Perfect! Let me gather some information to create this for you. What are the key details I should know?',
  'Excellent! I\'ll create a ready-to-use document for you. Just provide the necessary details and I\'ll handle the rest.',
];

function pickResponse(responses, seedText) {
  const seed = Array.from(seedText).reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return responses[seed % responses.length];
}

export async function getSocraticResponse(question, language = 'english') {
  const seedText = `${language}:${question || ''}`;
  return pickResponse(mockSocraticResponses, seedText);
}

export async function getTeacherResponse(request, context = {}) {
  const contextText = JSON.stringify(context);
  const seedText = `${request || ''}:${contextText}`;
  return pickResponse(mockTeacherResponses, seedText);
}

export async function generateDailyDiary(subject, className, topic, period, activities, homework) {
  return `DAILY DIARY ENTRY
Date: ${new Date().toLocaleDateString()}
Subject: ${subject}
Class: ${className}
Period: ${period}

Topic Taught: ${topic}

Learning Outcomes:
- Students will be able to understand the key concepts
- Students will develop practical skills

Teaching Methods Used:
${activities}

Activities:
- Interactive discussion
- Board work
- Student participation

Homework Given:
${homework}

Notes:
Class responded well. Most students understood the concepts.`;
}

export async function generateLessonPlan(subject, className, chapterName, periods) {
  return `LESSON PLAN
Subject: ${subject}
Class: ${className}
Chapter: ${chapterName}
Duration: ${periods} periods

Learning Outcomes:
- Students will understand the core concepts
- Students will be able to apply concepts to real-world situations
- Students will develop critical thinking skills

Teaching Methods: Lecture, Discussion, Activities, Demonstrations

Evaluation:
- Class participation
- Homework assignments
- Quick assessment activities

Resources Required:
- Textbook
- Board and chalk/whiteboard
- Student notebooks`;
}

export async function generateQuestionPaper(subject, className, chapters, difficulty, totalMarks, questionTypes = []) {
  const questionTypeText = questionTypes.length > 0 ? questionTypes.join(', ') : 'MCQ, Short, Long';

  return `QUESTION PAPER
Subject: ${subject}
Class: ${className}
Chapters: ${chapters}
Difficulty: ${difficulty}
Question Types: ${questionTypeText}
Total Marks: ${totalMarks}
Time: 3 hours

Section A: Multiple Choice Questions (1 mark each)
[5 questions]

Section B: Short Answer Questions (3 marks each)
[4 questions]

Section C: Long Answer Questions (5 marks each)
[3 questions]

ANSWER KEY PROVIDED SEPARATELY`;
}

export const SOCRATIC_SYSTEM = SOCRATIC_SYSTEM_PROMPT;
export const TEACHER_SYSTEM = TEACHER_SYSTEM_PROMPT;
