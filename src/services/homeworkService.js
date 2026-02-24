const STORAGE_KEY = 'sarathi_homework_by_school';

function normalizeSchoolCode(schoolCode = '') {
  return schoolCode.trim().toUpperCase();
}

function readStore() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};

  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function writeStore(store) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function getHomeworkForSchool(schoolCode) {
  const code = normalizeSchoolCode(schoolCode);
  if (!code) return [];

  const store = readStore();
  const homeworks = store[code] || [];

  return [...homeworks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
}

export function createHomeworkForSchool(schoolCode, homework) {
  const code = normalizeSchoolCode(schoolCode);
  if (!code) {
    throw new Error('School code is required to create homework');
  }

  const store = readStore();
  const current = store[code] || [];
  store[code] = [...current, homework];
  writeStore(store);

  return store[code];
}

export function updateHomeworkForSchool(schoolCode, homeworkId, patch) {
  const code = normalizeSchoolCode(schoolCode);
  if (!code) return [];

  const store = readStore();
  const current = store[code] || [];
  store[code] = current.map((homework) =>
    homework.id === homeworkId ? { ...homework, ...patch } : homework
  );
  writeStore(store);

  return store[code];
}

export function deleteHomeworkForSchool(schoolCode, homeworkId) {
  const code = normalizeSchoolCode(schoolCode);
  if (!code) return [];

  const store = readStore();
  const current = store[code] || [];
  store[code] = current.filter((homework) => homework.id !== homeworkId);
  writeStore(store);

  return store[code];
}
