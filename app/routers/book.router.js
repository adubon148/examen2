
let express = require('express');
let router = express.Router();
 
const books = require('../controllers/controller.book.js');

router.post('/api/books/crear', books.create);
router.get('/api/books/all', books.retrieveAllCustomers);
router.get('/api/books/onebyid/:id', books.getCustomerById);
router.put('/api/books/update/:id', books.updateById);
router.delete('/api/books/delete/:id', books.deleteById);

module.exports = router;