const express = require("express");
const { getFood, getOneFood, createFood, updateFood, deleteFood } = require("../controllers/foodController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.route('/').get(getFood).post(createFood);

router.route('/:id').get(getOneFood).put(updateFood).delete(deleteFood);


module.exports = router;