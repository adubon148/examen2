

const db = require('../config/db.config.js');
const Usuario = db.user;

exports.create = (req, res) => {
    let usuario = {};

    try{
        
        usuario.nombre = req.body.nombre;
        usuario.apellido = req.body.apellido;
        usuario.email = req.body.email;
        usuario.telefono = req.body.telefono;
        usuario.direccion = req.body.direccion;
        usuario.FechaRegistro = req.body.FechaRegistro;
        usuario.Estado = req.body.Estado
    
        
        Usuario.create(usuario).then(result => {    
            
            res.status(200).json({
                message: "Upload Successfully a user with id = " + result.id,
                user: result,
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllCustomers = (req, res) => {
    
    Usuario.findAll()
        .then(userInfos => {
            res.status(200).json({
                message: "Get all users Infos Successfully!",
                usuarios: userInfos
            });
        })
        . catch(error => {
          
          console.log(error);

          res.status(500).json({
              message: "Error!",
              error: error
          });
        });
}

exports.getCustomerById = (req, res) => {
 
  let id = req.params.id;
  Usuario.findByPk(id)
      .then(usuario => {
          res.status(200).json({
              message: " Successfully Get a user with id = " + id,
              usuarios: usuario
          });
      })
      . catch(error => {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
      });
}



exports.updateById = async (req, res) => {
    try{
        let userid = req.params.id;
        let usuario = await Usuario.findByPk(userid);
    
        if(!usuario){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a user with id = " + userid,
                user: "",
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
              nombre: req.body.nombre,
              apellido: req.body.apellido,
              email: req.body.email,
              telefono: req.body.telefono,
              direccion: req.body.direccion,
              FechaRegistro: req.body.FechaRegistro,
              Estado: req.body.Estado
            }
            let result = await Usuario.update(updatedObject, {returning: true, where: {id: userid}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a user with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a user with id = " + songid,
                user: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a user with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try{
        let userid = req.params.id;
        let usuario = await Usuario.findByPk(userid);

        if(!usuario){
            res.status(404).json({
                message: "Does Not exist a song with id = " + userid,
                error: "404",
            });
        } else {
            await Usuario.destroy(usuario);
            res.status(200).json({
                message: "Delete Successfully a user with id = " + userid,
                song: usuario,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a user with id = " + req.params.id,
            error: error.message,
        });
    }
}
