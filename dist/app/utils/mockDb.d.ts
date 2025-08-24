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
    term: string;
};
export type AttendanceRecord = {
    id: string;
    studentId: string;
    date: string;
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
    authorId: string;
    published: boolean;
    createdAt: string;
};
export type TimetableEntry = {
    id: string;
    classId: string;
    subjectId: string;
    teacherId: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
};
export type NotificationMsg = {
    id: string;
    title: string;
    message: string;
    audience: 'all' | 'teachers' | 'parents' | 'students';
    createdAt: string;
};
export declare const db: {
    students: Map<string, Student>;
    parents: Map<string, Parent>;
    teachers: Map<string, Teacher>;
    classes: Map<string, ClassRoom>;
    subjects: Map<string, Subject>;
    enrollments: Map<string, Enrollment>;
    grades: Map<string, GradeRecord>;
    attendance: Map<string, AttendanceRecord>;
    feeStructures: Map<string, FeeStructure>;
    invoices: Map<string, Invoice>;
    blogPosts: Map<string, BlogPost>;
    timetable: Map<string, TimetableEntry>;
    notifications: Map<string, NotificationMsg>;
};
export declare const insert: <T extends {
    id: string;
}>(map: Map<string, T>, data: Omit<T, "id"> & Partial<Pick<T, "id">>) => T;
export declare const list: <T>(map: Map<string, T>) => T[];
export declare const getById: <T>(map: Map<string, T>, id: string) => T | undefined;
export declare const updateById: <T extends {
    id: string;
}>(map: Map<string, T>, id: string, patch: Partial<T>) => T | undefined;
export declare const removeById: <T>(map: Map<string, T>, id: string) => boolean;
//# sourceMappingURL=mockDb.d.ts.map