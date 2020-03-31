import { dataCourses } from "./dataCourses.js";
import { dataStudent } from "./dataStudent.js";
var coursesTbody = document.getElementById('courses');
var coursesFiltered = dataCourses;
var btnfilterByName = document.getElementById("button-filterByName");
var btnfilterByCredits = document.getElementById("button-filterByCredits");
var inputSearchBox = document.getElementById("search-box");
var inputMinBox = document.getElementById("min-box");
var inputMaxBox = document.getElementById("max-box");
var totalCreditElm = document.getElementById("total-credits");
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentInfoInTable(student) {
    console.log('Desplegando estudiante');
    var nombre = document.getElementById("nombre");
    nombre.innerHTML = student.nombre;
    var codigo = document.getElementById("codigo");
    codigo.innerHTML = student.codigo;
    var cedula = document.getElementById("cedula");
    cedula.innerHTML = student.cedula;
    var edad = document.getElementById("edad");
    edad.innerHTML = "<p> " + student.edad + "</p>";
    var direccion = document.getElementById("direccion");
    direccion.innerHTML = student.direccion;
    var telefono = document.getElementById("telefono");
    telefono.innerHTML = student.telefono;
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
    totalCreditElm.innerHTML = "" + getTotalCredits(coursesFiltered);
}
function applyFilterByCredits() {
    var min = Number(inputMinBox.value);
    var max = Number(inputMaxBox.value);
    min = (min == null) ? 0 : min;
    max = (max == null) ? Math.max.apply(Math, dataCourses.map(function (o) { return o.credits; })) : max;
    clearCoursesInTable();
    coursesFiltered = searchCourseByCredits(min, max, dataCourses);
    renderCoursesInTable(coursesFiltered);
    totalCreditElm.innerHTML = "" + getTotalCredits(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchCourseByCredits(min, max, courses) {
    return min === 0 && max === Math.max.apply(Math, dataCourses.map(function (o) { return o.credits; })) ? dataCourses : courses.filter(function (c) {
        return c.credits >= min && c.credits <= max;
    });
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredits.onclick = function () { return applyFilterByCredits(); };
renderCoursesInTable(dataCourses);
renderStudentInfoInTable(dataStudent);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
