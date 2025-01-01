const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("../utils/jwt")


//function to register a new user in the DB
function register(req, res){
    const {firstName, lastName, email, password} = req.body;
    
    if(!email) res.status(400).send({msg: "El email es obligatorio"});
    if(!password) res.status(400).send({msg: "La contraseña es obligatoria"});

    const user = new User({
        firstName,
        lastName,
        email: email.toLowerCase(),
        role: "user",
        active: false,

    });

    const salt = bcrypt.genSaltSync(10);
    const hashpassword = bcrypt.hashSync(password, salt);
    user.password = hashpassword;

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

//funtion to login a user
async function login (req,res){
    const {email, password }  = req.body;
 
    if(!email) res.status(400).send({msg:"El email es obligatorio"});
    if(!password) res.status(400).send({msg:"El password es obligatorio"});
 
    const emailLowerCase = email.toLowerCase();
 
    try {
        const response = await User.findOne({ email: emailLowerCase })
        bcrypt.compare(password, response.password, (bcryptError, check) => {
            if(bcryptError){
                res.status(500).send({msg:"Error del servidor"});
            }else if (!check){
                res.status(400).send({msg:"Contraseña incorrecta"});
            }else if(!response.active){
                res.status(400).send({msg:"Usuario no autorizado o no activo"});
            }else{
                res.status(200).send({
                    access : jwt.createAccessToken(response),
                    refres :jwt.createRefreshToken(response)
                });
            }
        })
    } catch (error) {
        res.status(500).send({msg:"Error del servidor"});
    }
}

async function refreshAccessToken(req, res) {
    const { token } = req.body;
    try {
      //verificación de token
      if (!token) res.status(400).send({ msg: "Token requerido" });
   
      const { user_id } = jwt.decoded(token);
   
      //Búsqueda de usuario
      const response = await User.findOne({ _id: user_id });
   
      res.status(200).send({
        accessToken: jwt.createAccessToken(response),
      });
   
    } catch (error) {
      res.status(500).send({ msg: "Error del servidor" });
    }
  }

module.exports = {
    register,
    login,
    refreshAccessToken
}