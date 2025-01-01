const Menu = require("../models/MenuModel");

async function createMenu(req, res) {
    const menu = new Menu(req.body);

    try {
        await menu.save();
        res.status(200).send({msg: "Menú creado exitosamente"})
    } catch (error) {
        res.status(400).send({msg: "Error al crear el menú"})
    }
}

async function getAllmenus(req, res) {
        
    const {active} = req.query;
    let response = null;

    if(active === undefined){
        response = await Menu.find().sort({order: "asc"});
    }else{
        response = await Menu.find({active}).sort({order: "asc"});
    }

    if (!response) {
        res.status(200).send({msg:"No se ha encontrado ningun menú"})
    } else {
        res.status(200).send(response)
    }

    
}

async function updateMenu(req,res){
    const { id } = req.params;
    const menuData = req.body;
 
    try {
        const response = await Menu.findByIdAndUpdate({ _id: id }, menuData);
        if(response){
            res.status(200).send({ msg: "Actualizacion correcta" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ msg: "Error al actualizar el usuario" });
    }
 
}

async function deleteMenu(req,res){
    const { id } = req.params;
    try {
        const response = await Menu.findByIdAndDelete(id)
        if(response){
            res.status(200).send({ msg: "Menú eliminado" });
        }
    } catch (error) {
        res.status(400).send({ msg: "Error al eliminar el Menú" });
    }
}

module.exports = {
    createMenu,
    getAllmenus,
    updateMenu,
    deleteMenu,
};