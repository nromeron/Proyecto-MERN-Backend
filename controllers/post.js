const Post = require("../models/post");
const image = require("../utils/image");
const fs = require('fs')

async function createPost(req, res) {
    const post = new Post(req.body);
    post.createdAt = new Date();

    if (req.files.miniature) {

        if (req.files.miniature) {
            const imagePath = image.getFilePath(req.files.miniature);
            post.miniature = imagePath;
        }
    }

    try {
        await post.save();
        res.status(201).send({msg: "Post creado exitosamente"})
    } catch (error) {
        res.status(400).send({msg: "Error al crear el post"})
    }
}

async function getPost(req, res) {
    const {page = 1, limit = 10} = req.query;
    
    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: {createdAt: "desc"}
    };

    Post.paginate({}, options, (error, posts) =>{
        if (error) {
            return res.status(400).send({msg: "error al cargar los posts"})
        }

        res.status(200).send(posts)
    })  
}

async function updatePost(req,res){
    const { id } = req.params;
    const postData = req.body;

    if (req.files.miniature) {
        const imagePath = image.getFilePath(req.files.miniature);
        postData.miniature = imagePath;
    }
 
    try {
        const response = await Post.findByIdAndUpdate({ _id: id }, postData);
        if(response){
            res.status(200).send({ msg: "Actualizacion correcta" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ msg: "Error al actualizar el Post" });
    }
 
}

async function deletePost(req,res){
    const { id } = req.params;
    try {
        const response = await Post.findByIdAndDelete(id)
        if(response.miniature){
            fs.unlinkSync(`./uploads/${response.miniature}`)
        }
        res.status(200).send({ msg: "Post eliminado" });
    } catch (error) {
        res.status(400).send({ msg: "Error al eliminar el post" });
    }
}

async function getOnePost(req, res) {
    const { path } = req.params;

    const response = await Post.findOne({path: path});
    
    if (!response) {
        return res.status(400).send({msg: "No se ha encontrado ningun post"})
    }else{
        res.status(200).send(response)
    } 
}

module.exports ={
    createPost,
    getPost,
    updatePost,
    deletePost,
    getOnePost
}