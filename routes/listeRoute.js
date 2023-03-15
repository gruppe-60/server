const express = require("express");

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
router.post("/:id/item-create", listeItemCreate);
router.get("/allListe", allListe);
router.get("/:id", oneList);

router.post("/:id/delete", listeDelete);
router.post("/:id/:itemid/delete", listeItemDelete);

module.exports = router;
