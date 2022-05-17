var StudentModel = require('../../models/student/StudentModel');



let students = [
    { _id: 0, name: "Mayara Almeida", course: "Redes de Computdores", ira: 8.2 },
    { _id: 1, name: "Luana Costa", course: "Sistemas de Informação", ira: 7.5 },
    { _id: 2, name: "Fernando Silva", course: "Engenharia da Computação", ira: 5.0 },
    { _id: 3, name: "João Lima", course: "Sistemas de Informação", ira: 7.8 }
]
let _id = 4

class StudentService {

    static create(data) {
        let student = new StudentModel(
            _id++,
            data.name,
            data.course,
            data.ira
        )
        students.push(student)
        return student

    }

    static list() {
        return students
    }

    static update(_id, data) {
        for (let s of students) {
            if (s._id == _id) {
                s.name = data.name
                s.course = data.course
                s.ira = data.ira
                return s
            }
        }
        return null
    }

    static delete(_id) {
        for (let i = 0; i < students.length; i++) {
            if (students[i]._id == _id) {
                students.splice(i, 1)
                return true
            }
        }
        return false
    }

    static retrieve(_id) {
        for (let i = 0; i < students.length; i++) {
            if (students[i]._id == _id) {
                return students[i]
            }
        }
        return {}
    }

}

module.exports = StudentService;