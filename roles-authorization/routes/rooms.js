const router = require("express").Router();
const Room = require('../models/Room');
// const { loginCheck } = require('./middlewares');

router.get('/', (req, res, next) => {
	Room.find()
		.then(rooms => res.render('rooms/index', { rooms }))
		.catch(err => next(err))


	// this only displays rooms that the user created
	// Room.find({ owner: req.user._id })
	// 	.then(rooms => res.render('rooms/index', { rooms }))
	// 	.catch(err => next(err))
});


router.get('/add', (req, res, next) => {
	res.render('rooms/add')
});

router.post('/', (req, res, next) => {
	const { name, price } = req.body
	Room.create({
		name,
		price,
		owner: req.user._id
	})
		.then(() => res.redirect('/rooms'))
		.catch(err => next(err))
});

router.get('/:id/delete', (req, res, next) => {
	// if you are an admin you can delete any room
	// if you are a user you can only delete your rooms
	const roomId = req.params.id
	const query = { _id: roomId }
	if (req.user.role !== 'admin') {
		query.owner = req.user._id
	}
	// not an admin -> {_id: 49302jkdls, owner: itorp920}
	Room.findOneAndDelete(query)
		.then(() => res.redirect('/rooms'))
		.catch(err => next(err))
});


module.exports = router;