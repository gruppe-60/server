const Liste = require("../models/listeModel");
const ListeItem = require("../models/listeItemModel");

const listeCreate = async (req, res) => {
  const { name } = req.body;

  try {
    const newListe = new Liste({
      name,
      items: []
    });

    await newListe.save();
    res.json({ message: " liste  created!" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const listeDelete = async (req, res) => {
  const { id } = req.params;
  // const token = req.cookies.token;
  // console.log(token)
  try {
    await Liste.findByIdAndDelete(id);
    res.json({ message: "liste deleted!" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const allListe = async (req, res) => {
  try {
    const allListe = await Liste.find().populate("items");
    res.json({ allListe });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const oneList = async (req, res) => {
  const { id } = req.params;

  try {
    const oneList = await Liste.findById(id).populate("items");
    if (!oneList) {
      return res.status(500).json({ message: "not exist" });
    }
    res.json({ oneList });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const listeItemCreate = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  try {
    const MyListe = await Liste.findById(id);

    if (!MyListe) {
      return res.status(500).json({ message: "not exist" });
    }

    const newListeItem = new ListeItem({
      name
    });

    MyListe.items.push(newListeItem._id);

    await newListeItem.save();

    await Liste.findOneAndUpdate({ _id: id }, MyListe);
    res.json({ message: "item added!" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const listeItemDelete = async (req, res) => {
  const { id, itemid } = req.params;
  // const token = req.cookies.token;
  // console.log(token);
  try {
    const MyListe = await Liste.findById(id);
    if (!MyListe) {
      return res.status(500).json({ message: "not exist" });
    }

    await Liste.updateOne({ _id: id }, { $pull: { items: itemid } });
    res.json({ message: "item deleted!" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

// const listeItemUpdate = async (req, res) => {
//   try {
//   } catch (error) {}
// };

module.exports = {
  listeCreate,
  listeItemCreate,
  allListe,
  listeDelete,
  listeItemDelete,
  oneList
};
