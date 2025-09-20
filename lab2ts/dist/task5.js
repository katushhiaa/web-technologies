"use strict";
class OnlineCourse {
    constructor(courseName, duration) {
        this.courseName = courseName;
        this.duration = duration;
        this.students = [];
    }
    registerStudent(student) {
        if (!this.isStudentRegistered(student)) {
            this.students.push(student);
            console.log(`${student} has been registered to ${this.courseName}`);
        }
        else {
            console.log(`${student} is already registered to ${this.courseName}`);
        }
    }
    isStudentRegistered(student) {
        return this.students.includes(student);
    }
}
class CourseManager {
    constructor() {
        this.courses = [];
    }
    addCourse(course) {
        this.courses.push(course);
    }
    removeCourse(courseName) {
        this.courses = this.courses.filter(course => course.courseName !== courseName);
    }
    findCourse(courseName) {
        return this.courses.find(course => course.courseName === courseName);
    }
    listCourses() {
        for (const course of this.courses) {
            console.log(`Course: ${course.courseName}, Duration: ${course.duration}h`);
            console.log(`Students: ${course.students.join(", ") || "No students yet"}`);
            console.log("------");
        }
    }
}
const tsCourse = new OnlineCourse("TypeScript for beginners", 20);
const jsCourse = new OnlineCourse("JavaScript for advanced", 30);
const reactCourse = new OnlineCourse("React for work", 25);
const manager = new CourseManager();
manager.addCourse(tsCourse);
manager.addCourse(jsCourse);
manager.addCourse(reactCourse);
tsCourse.registerStudent("Katya");
tsCourse.registerStudent("Liliya");
jsCourse.registerStudent("Peter");
reactCourse.registerStudent("James");
manager.listCourses();
manager.findCourse("tsCourse");
//# sourceMappingURL=task5.js.map