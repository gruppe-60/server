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
    res.status(500).json({ message: "server error", error });
  }
};

const listeDelete = async (req, res) => {
  const { id } = req.params;

  try {
    await Liste.findByIdAndDelete(id);
    res.json({ message: "liste deleted!" });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

const allListe = async (req, res) => {
  try {
    const allListe = await Liste.find().populate("items");
    res.json({ allListe });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

const listeItemCreate = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  try {
    const MyListe = await Liste.findById(id);
    console.log(MyListe);
    if (!MyListe) {
      console.log("not exist");
      return res.status(500).json({ message: "not exist" });
    }

    const newListeItem = new ListeItem({
      name
    });

    MyListe.items.push(newListeItem._id);

    // console.log(MyListe);
    await newListeItem.save();

    await Liste.findOneAndUpdate({ _id: id }, MyListe);
    res.json({ message: "item added!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error", error });
  }
};

// const listeItemDelete = async (req, res) => {
//   const { id, itemid } = req.params;

//   try {
//     const MyListe = await Liste.findById(id);
//     if (!MyListe) {
//       console.log("not exist");
//       return res.status(500).json({ message: "not exist", error });
//     }

//     const f = MyListe.items.map(item => {
//       console.log(item);
//       if (item == new ObjectId("6411bb975ac6cc2c6bb7cf48")) {

//       }
//     });

//     await Liste.findOneAndUpdate({ _id: id }, MyListe);
//     res.json({ message: "item deleted!" });
//   } catch (error) {
//     res.status(500).json({ message: "server error", error });
//   }
// };

// const listeItemUpdate = async (req, res) => {
//   try {
//   } catch (error) {}
// };

module.exports = {
  listeCreate,
  listeItemCreate,
  allListe,
  listeDelete
  // listeItemDelete
};
