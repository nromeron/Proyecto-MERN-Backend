const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const image = require("../utils/image");
const fs = require('fs')

async function getUser(req, res) {

    const {user_id} = req.user;

    const response = await User.findById(user_id);

    if (!response) {
        return res.status(400).send({msg: "No se ha encontrado un usuario"})
    } else {
        res.status(200).send(response)
    }
}

async function getAllUsers(req, res) {
    
    const {active} = req.query;
    let response = null;

    if(active === undefined){
        response = await User.find();
    }else{
        response = await User.find({active});
    }

    if (!response) {
        res.status(200).send({msg:"No se ha encontrado ningun usuario"})
    } else {
        res.status(200).send(response)
    }
}

async function createUser(req, res) {
    const {password} = req.body;
    const user = new User({...req.body, active: false});

    const salt = bcrypt.genSaltSync(10);
    const hashpassword = bcrypt.hashSync(password, salt);
    user.password = hashpassword;

    if(req.files.avatar){
        const imagePath = image.getFilePath(req.files.avatar);
        user.avatar = imagePath;
    }

    const saveUser = async () =>{
        try{
            await user.save();
            res.status(200).send({msg: "Usuario creado correctamente"})
        }
        catch(err){
            res.status(400).send({msg: "Error al crear el usuario"})
        }
    }
    saveUser();
}

async function updateUser(req,res){
    const { id } = req.params;
    const userData = req.body;
 
    if(userData.password){
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(userData.password, salt);
        userData.password = hashPassword
    }else{
        delete userData.password;
    }
 
    if(req.files.avatar){
        const imagePath = image.getFilePath(req.files.avatar)
        userData.avatar = imagePath
    }
 
    try {
        const response = await User.findByIdAndUpdate({ _id: id }, userData);
        if(response.avatar){
            if(fs.existsSync (`./uploads/${response.avatar}`)){
                fs.unlinkSync (`./uploads/${response.avatar}`)
            }
        }
        res.status(200).send({ msg: "Actualizacion correcta" });
    } catch (error) {
        console.log(error);
        res.status(400).send({ msg: "Error al actualizar" });
    }
 
}
 
async function deleteUser(req,res){
    const { id } = req.params;
    try {
        const response = await User.findByIdAndDelete(id)
        if(fs.existsSync (`./uploads/${response.avatar}`)){
            fs.unlinkSync (`./uploads/${response.avatar}`)
        }
        res.status(200).send({ msg: "Usuario eliminado" });
    } catch (error) {
        res.status(400).send({ msg: "Error al eliminar el usuario" });
    }
}

module.exports = {
    getUser,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
}