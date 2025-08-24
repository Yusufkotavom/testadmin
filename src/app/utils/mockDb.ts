import { v4 as uuid } from 'uuid';

export type Student = {
  id: string;
  name: string;
  email: string;
  classId?: string;
  parentIds: string[];
};

export type Parent = {
  id: string;
  name: string;
  email: string;
  studentIds: string[];
};

export type Teacher = {
  id: string;
  name: string;
  email: string;
  subjectIds: string[];
};

export type ClassRoom = {
  id: string;
  name: string;
  gradeLevel: string;
  teacherId?: string;
};

export type Subject = {
  id: string;
  name: string;
  code: string;
};

export type Enrollment = {
  id: string;
  studentId: string;
  classId: string;
  subjectId?: string;
};

export type GradeRecord = {
  id: string;
  studentId: string;
  subjectId: string;
  score: number;
  term: string; // e.g., 2025-Q1
};

export type AttendanceRecord = {
  id: string;
  studentId: string;
  date: string; // ISO date
  status: 'present' | 'absent' | 'late';
};

export type FeeStructure = {
  id: string;
  name: string;
  amount: number;
  gradeLevel?: string;
};

export type Invoice = {
  id: string;
  studentId: string;
  feeStructureId: string;
  amount: number;
  status: 'unpaid' | 'paid' | 'partial';
  issuedAt: string;
  paidAt?: string;
};

export type BlogPost = {
  id: string;
  title: string;
  content: string;
  authorId: string; // teacher or admin
  published: boolean;
  createdAt: string;
};

export type TimetableEntry = {
  id: string;
  classId: string;
  subjectId: string;
  teacherId: string;
  dayOfWeek: number; // 0-6 (Sun-Sat)
  startTime: string; // HH:mm
  endTime: string; // HH:mm
};

export type NotificationMsg = {
  id: string;
  title: string;
  message: string;
  audience: 'all' | 'teachers' | 'parents' | 'students';
  createdAt: string;
};

export const db = {
  students: new Map<string, Student>(),
  parents: new Map<string, Parent>(),
  teachers: new Map<string, Teacher>(),
  classes: new Map<string, ClassRoom>(),
  subjects: new Map<string, Subject>(),
  enrollments: new Map<string, Enrollment>(),
  grades: new Map<string, GradeRecord>(),
  attendance: new Map<string, AttendanceRecord>(),
  feeStructures: new Map<string, FeeStructure>(),
  invoices: new Map<string, Invoice>(),
  blogPosts: new Map<string, BlogPost>(),
  timetable: new Map<string, TimetableEntry>(),
  notifications: new Map<string, NotificationMsg>(),
};

export const insert = <T extends { id: string }>(map: Map<string, T>, data: Omit<T, 'id'> & Partial<Pick<T, 'id'>>): T => {
  const id = (data as any).id ?? uuid();
  const record = { ...(data as any), id } as T;
  map.set(id, record);
  return record;
};

export const list = <T>(map: Map<string, T>): T[] => Array.from(map.values());

export const getById = <T>(map: Map<string, T>, id: string): T | undefined => map.get(id);

export const updateById = <T extends { id: string }>(map: Map<string, T>, id: string, patch: Partial<T>): T | undefined => {
  const existing = map.get(id);
  if (!existing) return undefined;
  const updated = { ...(existing as any), ...(patch as any), id } as T;
  map.set(id, updated);
  return updated;
};

export const removeById = <T>(map: Map<string, T>, id: string): boolean => map.delete(id);

