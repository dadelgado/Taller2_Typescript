import { Course } from "./course";
import { dataCourses } from "./dataCourses";
import { student } from "./student";
import { dataStudent } from "./dataStudent";

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentTbody: HTMLElement = document.getElementById('student')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnfilterByCredits: HTMLElement = document.getElementById("button-filterByCredits")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const inputMinBox: HTMLInputElement = <HTMLInputElement> document.getElementById("min-box")!;
const inputMaxBox: HTMLInputElement = <HTMLInputElement> document.getElementById("max-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;



function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function renderStudentInfoInTable(student: student): void {
  console.log('Desplegando estudiante');
  let nombre = document.getElementById("nombre")!;
  nombre.innerHTML = student.nombre;
  let codigo = document.getElementById("codigo")!;
  codigo.innerHTML = student.codigo;
  let cedula = document.getElementById("cedula")!;
  cedula.innerHTML = student.cedula;
  let edad = document.getElementById("edad")!;
  edad.innerHTML = `<p> ${student.edad}</p>`;
  let direccion = document.getElementById("direccion")!;
  direccion.innerHTML = student.direccion;
  let telefono = document.getElementById("telefono")!;
  telefono.innerHTML = student.telefono;  
}

function getTotalCredits(courses: Course[]): number {
    let totalCredits: number = 0;
    courses.forEach((course) => totalCredits = totalCredits + course.credits);
    return totalCredits;
}

function applyFilterByName() { 
    let text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
    totalCreditElm.innerHTML = `${getTotalCredits(coursesFiltered)}`
}

function applyFilterByCredits() { 
  let min: number = Number(inputMinBox.value);
  let max: number = Number(inputMaxBox.value);
  min = (min == null) ? 0 : min;
  max = (max == null) ? dataCourses.length : max;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByCredits(min, max, dataCourses);
  renderCoursesInTable(coursesFiltered);
  totalCreditElm.innerHTML = `${getTotalCredits(coursesFiltered)}`
}
  
function searchCourseByName(nameKey: string, courses: Course[]) {
    return nameKey === '' ? dataCourses : courses.filter( c => 
      c.name.match(nameKey));
}

function searchCourseByCredits(min: number, max: number, courses: Course[]) {
  return min === 0 && max === dataCourses.length ? dataCourses : courses.filter( c => 
    c.credits >= min && c.credits <= max);
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}

btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredits.onclick = () => applyFilterByCredits();

renderCoursesInTable(dataCourses);
renderStudentInfoInTable(dataStudent);
totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`