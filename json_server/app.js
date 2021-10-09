/* var coursesApi = 'http://localhost:3000/coursers';

function start() {
    getCourses(renderCourses);

    handleCreateForm();
}

start();

function getCourses(callBack) {
    fetch(coursesApi)
        .then(function(response) {
            return response.json();
        })
        .then(callBack);
}

// Tư duy 1 chút này : callBack = renderCourses(courses),
// mà callBack là cái tham số của getCourses,
// mà trong getCourses có .then(callBack),
// chính .then này trả về courses = [mảng các giá trị JSON mà API truyền vào]


function renderCourses(courses) {
    var listCoursesBlock = document.getElementById('list-courses');

    var htmls = courses.map(function(course) {
        return `
            <li class="course-${course.id}">
                <h4>${course.name}</h4>
                <p>${course.description}</p>
                <button onclick="deleteCourse(${course.id})">Xóa</button>
                <button onclick="updateCourse(${course.id})">Change</button>
            </li>
        `;
    });

    listCoursesBlock.innerHTML = htmls.join('');
}

function addCourses(course) {
    var listCoursesBlock = document.getElementById('list-courses');
    html = `
        <li class="course-${course.id}">
            <h4>${course.name}</h4>
            <p>${course.description}</p>
            <button onclick="deleteCourse(${course.id})">Xóa</button>
            <button onclick="updateCourse(${course.id})">Change</button>

        </li>
    `;

    listCoursesBlock.innerHTML += html;
}

function createCourser(data, callBack) {
    var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
    };

    fetch(coursesApi, options)
        .then(function(response) {
            return response.json();
        })
        .then(callBack);
}

function handleCreateForm() {
    var createBtn = document.querySelector('#create');

    createBtn.onclick = function() {
        if (createBtn.innerHTML == 'Save') {
            return;
        }
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;

        var formData = {
            name: name,
            description: description
        };

        createCourser(formData, addCourses);
    }
    
}

function deleteCourse(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(coursesApi + '/' + id, options)
        .then(function(response) {
            return response.json();
        })
        .then(function() {
            var course = document.querySelector('.course-' + id);
            if (course) {
                course.remove();
            }
        })
}

function changeCourse(course) {
    var change_html = document.querySelector('.course-' + course.id);
    change_html.innerHTML = `
        <h4>${course.name}</h4>
        <p>${course.description}</p>
        <button onclick="deleteCourse(${course.id})">Xóa</button>
        <button onclick="updateCourse(${course.id})">Change</button>
    `;

    var save = document.getElementById('create');
    save.innerHTML = 'Create';
    start();
}

function update(data, id, callBack) {
    var optionsU = {
        method:'PUT',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch(coursesApi + '/' + id, optionsU)
        .then(function(response){
            return response.json();
        })
        .then(callBack);
}

function updateCourse(id) {
    var save = document.getElementById('create');
    save.innerHTML = 'Save';

    save.onclick = function() {
        if (save.innerHTML == 'Create') {
            return;
        }

        var nameU = document.querySelector('input[name="name"]').value;
        var descriptionU = document.querySelector('input[name="description"]').value;

        var formDataU = {
            name: nameU,
            description: descriptionU
        };

        update(formDataU, id, changeCourse);
    }
} */

