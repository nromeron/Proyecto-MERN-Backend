const Course = require("../models/courseModel");
const image = require("../utils/image");
const fs = require('fs')

async function createCurse(req, res) {
    const course = new Course(req.body);

    if (req.files.miniature) {

        if (req.files.miniature) {
            const imagePath = image.getFilePath(req.files.miniature);
            course.miniature = imagePath;
        }
    }

    try {
        await course.save();
        res.status(200).send({msg: "curso creado exitosamente"})
    } catch (error) {
        res.status(400).send({msg: "Error al crear el curso"})
    }
}

async function getAllcourses(req, res) {
    const {page = 1, limit = 10} = req.query;
    
    const options = {
        page: parseInt(page),
        limit: parseInt(limit)
    };

    Course.paginate({}, options, (error, courses) =>{
        if (error) {
            return res.status(400).send({msg: "error al cargar los cursos"})
        }

        res.status(200).send(courses)
    })
    
}

async function updateCourse(req,res){
    const { id } = req.params;
    const courseData = req.body;

    if (req.files.miniature) {
        const imagePath = image.getFilePath(req.files.miniature);
        courseData.miniature = imagePath;
    }
 
    try {
        const response = await Course.findByIdAndUpdate({ _id: id }, courseData);
        if(response){
            res.status(200).send({ msg: "Actualizacion correcta" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ msg: "Error al actualizar el curso" });
    }
 
}

async function deleteCourse(req,res){
    const { id } = req.params;
    try {
        const response = await Course.findByIdAndDelete(id)
        if(response.miniature){
            fs.unlinkSync(`./uploads/${response.miniature}`)
        }
        res.status(200).send({ msg: "Curso eliminado" });
    } catch (error) {
        res.status(400).send({ msg: "Error al eliminar el curso" });
    }
}



module.exports = {
    createCurse,
    getAllcourses,
    updateCourse,
    deleteCourse
}