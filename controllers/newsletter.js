const Newsletter = require("../models/newsletterModel");

async function registerEmail(req, res) {
    const { email } = req.body;

    if (!email) {
        res.status(400).send({msg: "Email obligatorio"})
    }

    const newsletter = new Newsletter({
        email: email.toLowerCase()
    });

    try {
        await newsletter.save();
        res.status(201).send({msg: "Email registrado"})
    } catch (error) {
        res.status(400).send({msg: "Error al registrar el email"})
    }
}

async function getEmail(req, res) {
    const {page = 1, limit = 10} = req.query;
    
    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: {createdAt: "desc"}
    };

    Newsletter.paginate({}, options, (error, newsletter) =>{
        if (error) {
            return res.status(400).send({msg: "error al cargar los correos"})
        }

        res.status(200).send(newsletter)
    })  
}

async function deleteEmail(req,res){
    const { id } = req.params;
    try {
        const response = await Newsletter.findByIdAndDelete(id)
        if(response){
            res.status(200).send({ msg: "Email eliminado" });
        }
    } catch (error) {
        res.status(400).send({ msg: "Error al eliminar el email" });
    }
}

module.exports = {
    registerEmail,
    getEmail,
    deleteEmail
}