const express = require("express");
// const { authenticate } = require("../middleware/authenticate.js");

const {
  listeCreate,
  listeDelete,
  listeItemCreate,
  allListe,
  listeItemDelete,
  oneList
} = require("../controllers/listeController");

const router = express.Router();

router.post("/create", listeCreate);
router.post("/item-create/:id", listeItemCreate);
router.get("/allListe", allListe);
router.get("/:id", oneList);

router.post("/delete/:id", listeDelete);
router.post("/delete/:id/:itemid", listeItemDelete);

module.exports = router;
