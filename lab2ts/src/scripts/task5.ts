interface Course {
    courseName: string;
    duration: number;
    students: string[]
}

class OnlineCourse implements Course {
    public courseName: string;
    public duration: number;
    public students: string[]

    constructor(courseName: string, duration: number) {
        this.courseName = courseName;
        this.duration = duration;
        this.students = [];
    }

    public registerStudent(student: string): void {
        if(!this.isStudentRegistered(student)){
            this.students.push(student);
            console.log(`${student} has been registered to ${this.courseName}`);
        } else {
            console.log(`${student} is already registered to ${this.courseName}`);
        }
    }

    public isStudentRegistered(student: string): boolean {
        return this.students.includes(student);
    }
}

class CourseManager {
    private courses: Course[] = [];

    public addCourse(course: Course): void {
        this.courses.push(course);
    }

    public removeCourse(courseName: string): void {
        this.courses = this.courses.filter(course => course.courseName !== courseName);
    }

    public findCourse(courseName: string): Course | undefined {
        return this.courses.find(course => course.courseName === courseName);
    }

    public listCourses(): void {
        for (const course of this.courses) {
            console.log(`Course: ${course.courseName}, Duration: ${course.duration}h`);
            console.log(`Students: ${course.students.join(", ") || "No students yet"}`);
            console.log("------");
        }
    }
}

const tsCourse = new OnlineCourse("TypeScript for beginners", 20)
const jsCourse = new OnlineCourse("JavaScript for advanced", 30)
const reactCourse = new OnlineCourse("React for work", 25)

const manager = new CourseManager()

manager.addCourse(tsCourse)
manager.addCourse(jsCourse)
manager.addCourse(reactCourse)

tsCourse.registerStudent("Katya")
tsCourse.registerStudent("Liliya")
jsCourse.registerStudent("Peter")
reactCourse.registerStudent("James")

manager.listCourses()

manager.findCourse("tsCourse")