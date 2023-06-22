const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// get all tags
router.get('/', async(req, res) => {
  try {
    const tagsData = await Tag.findAll({
        include: [{ model: Product, through: ProductTag, as: 'taggedProducts' }],
    });
    res.status(200).json(tagsData);
} catch (err) {
    res.status(500).json(err);
}
});
// get specific tag based on id
router.get('/:id', async(req, res) => {
  try {
    const tagDataById = await Tag.findByPk(req.params.id, {
        include: [{ model: Product, through: ProductTag, as: 'taggedProducts' }],
    });

    if (!tagDataById) {
        res.status(404).json({ message: 'No tag found with that id!' });
        return;
    }
    res.status(200).json(tagDataById);
} catch (err) {
    res.status(500).json(err);
}
});
// create new tag
router.post('/', async(req, res) => {
  try {
    const newTagData = await Tag.create();

    res.status(201).json(newTagData);
} catch (err) {
    req.status(500).json(err);
}
});

//updates a tags name based on specific id
router.put('/:id', async(req, res) => {
  try {
    const updatedTag = await Tag.update({
        tag_name: req.body.tag_name,
    }, {
        where: {
            id: req.params.id
        },
    });

    res.status(200).json(updatedTag);
} catch (err) {
    res.status(500).json(err);
}
});
//delete specific tag based on id
router.delete('/:id', async(req, res) => {
  try {
    const deletedTag = await Tag.destroy({
        where: {
            id: req.params.id,
        },
    });
    if (!deletedTag) {
        res.status(404).json({ message: "No tag found with that id!" });
        return;
    }

    res.status(200).json(deletedTag);
} catch (err) {
    res.status(500).json(err);
}
});

module.exports = router;
