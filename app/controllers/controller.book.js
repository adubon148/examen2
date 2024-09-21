

const db = require('../config/db.config.js');
const Libro = db.book;

exports.create = (req, res) => {
    let libro = {};

    try{
        
        libro.titulo = req.body.titulo;
        libro.idautor = req.body.idautor;
        libro.isbn = req.body.isbn;
        libro.editorial = req.body.editorial;
        libro.Año_publicacion = req.body.Año_publicacion;
        libro.direccion = req.body.direccion;
        libro.categoria = req.body.categoria
        libro.Stock = req.body.Stock
        libro.ubicacion = req.body.ubicacion
    
        
        Libro.create(libro).then(result => {    
            
            res.status(200).json({
                message: "Upload Successfully a book with id = " + result.id,
                book: result,
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
    
    Libro.findAll()
        .then(bookInfos => {
            res.status(200).json({
                message: "Get all books Infos Successfully!",
                books: bookInfos
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
  Libro.findByPk(id)
      .then(libro => {
          res.status(200).json({
              message: " Successfully Get a book with id = " + id,
              usuarios: libro
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
        let bookid = req.params.id;
        let book = await Libro.findByPk(bookid);
    
        if(!book){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a book with id = " + bookid,
                user: "",
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
              titulo: req.body.nombre,
              idautor: req.body.idautor,
              isbn: req.body.isbn,
              editorial: req.body.editorial,
              Año_publicacion: req.body.Año_publicacion,
              direccion: req.body.direccion,
              categoria: req.body.categoria,
              Stock: req.body.Stock,
              ubicacion: req.body.ubicacion
            }
            let result = await Libro.update(updatedObject, {returning: true, where: {id: bookid}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a book with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a book with id = " + bookid,
                user: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a book with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try{
        let bookid = req.params.id;
        let libro = await Libro.findByPk(bookid);

        if(!libro){
            res.status(404).json({
                message: "Does Not exist a book with id = " + bookid,
                error: "404",
            });
        } else {
            await libro.destroy();
            res.status(200).json({
                message: "Delete Successfully a book with id = " + bookid,
                book: libro,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a book with id = " + req.params.id,
            error: error.message,
        });
    }
}