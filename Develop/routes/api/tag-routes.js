const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/:id', async (req, res) => {
//   // find a single tag by its `id`
//   // be sure to include its associated Product data
//   try {
//     const tagData = await tagData.findOne({
//       where: {
//         id:req.params.id,}, 
//       include: [{ model: Product, through: ProductTag }],
//     });

//     if (!tagData) {
//       res.status(404).json({ message: 'Nothing with that id!' });
//       return;
//     }

//     res.status(200).json(tagData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  })
    .then((tag) => res.status(200).json(tag))
    .catch((err) => res.status(404).json(err));
});


router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
      }); 
      res.status(200).json(tagData)
  } catch (err) {
   res.status(400).json(err)
  }
  });

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
const tagData = await Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
  res.status(200).json(tagData)
  } catch (err) {
res.status(500).json(err)
  }
  
});

module.exports = router;


// The tagData variable is not 
// The Product model is not properly associated with the Tag model: If the Product model is not properly associated with the Tag model using the belongsTo() or belongsToMany() method in the model definition, the include option in the findByPk() method will not work properly and an error will occur.

// The route is not properly defined: If the route for the get request is not properly defined, the request will not be handled properly and an error will occur. 
// The request parameter is not properly defined: If the id parameter in the request URL is not properly defined, the findByPk() method will not be able to retrieve the correct data and an error will occur. For example, the id parameter might be missing or have the wrong data type.
