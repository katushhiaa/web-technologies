
function studentGradeCheck(grade){
    if (grade >= 90 && grade <= 100) {
        return "Відмінно";
    } else if (grade >= 70 && grade <= 89) {
        return "Добре";
    } else if (grade >= 50 && grade <= 69)  {
        return "Задовільно";
    } else {
        return "Незадовільно";
    }
}


/*?

const studentGradeCheck = (grade) =>
    grade >= 90 && grade <= 100 ? "Відмінно" :
    grade >= 70 && grade <= 89  ? "Добре" :
    grade >= 50 && grade <= 69  ? "Задовільно" :
        "Незадовільно";
*/

console.log(studentGradeCheck(65));
console.log(studentGradeCheck(90));
console.log(studentGradeCheck(45));
console.log(studentGradeCheck(75));
