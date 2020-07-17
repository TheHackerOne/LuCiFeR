const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require("../../models/Profile");
const User = require("../../models/User");

const { check, validationResult } = require('express-validator');

// @route    GET api/profile/me
// @desc      get current user profile
// @access   Private
router.get("/me", auth, async (req, res, next) => {
	try {
		const profile = await Profile.findOne({user: req.user.id}).populate('user',['name', 'avatar']);

		if(!profile){
			return res.status(400).json({ msg: "there is no profile for this user" });
		}

		res.json(profile);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("server error")
	}

});



// @route    POST api/profile
// @desc     create or update user profile
// @access   Private

router.post('/', [auth, [
	check('status', 'Status is required').not().isEmpty(),
	check('skills','Skills is required').not().isEmpty()
]], async (req, res, next) => {
	const errors = validationResult(req);

	if(!errors.isEmpty()){
		return res.status(400).json({ errors: errors.array() })
	}

		const {
			company,
			location,
			website,
			bio,
			skills,
			status,
			githubusername,
			youtube,
			twitter,
			instagram,
			linkedin,
			facebook
		} = req.body;

		// Build profile object
		const profileFields = {};
		profileFields.user = req.user.id;
		if (company) profileFields.company = company;
		if (website) profileFields.website = website;
		if (location) profileFields.location = location;
		if (bio) profileFields.bio = bio;
		if (status) profileFields.status = status;
		if (githubusername) profileFields.githubusername = githubusername;
		if (skills) {
			profileFields.skills = skills.split(',').map((skill) => skill.trim());
		}

		// Build socail object
		profileFields.social = {};
		if (youtube) profileFields.social.youtube = youtube;
		if (twitter) profileFields.social.twitter = twitter;
		if (facebook) profileFields.social.facebook = facebook;
		if (linkedin) profileFields.social.linkedin = linkedin;
		if (instagram) profileFields.social.instagram = instagram;

		try {
			let profile = await Profile.findOne({ user: req.user.id })

			if(profile){
				//Update
				profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields },
					{ new: true});

					return res.json(profile);
			}

			//Create
			profile = new Profile(profileFields);
			await profile.save();
			res.json(profile);

		} catch (error) {
			console.error(error.message);
			res.status(500).send('server error')
		}

})

// @route    GET api/profile
// @desc     GEt all profiles
// @access   Public
router.get('/',async (req, res, next) => {
	try {
		const profiles = await Profile.find().populate('user', ['name', 'avatar']);
		res.json(profiles);
	} catch (error) {
		console.log(error.message);
		res.status(500).send("server error")
	}
})

// @route    GET api/profile/user/:user_id
// @desc     GEt profile by user ID
// @access   Public
router.get('/user/:user_id', async (req, res, next) => {
	try {
		const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar']);

		if(!profile){
			return res.status(400).json({ msg:"Profile not found" })
		}
		
		res.json(profile);
	} catch (error) {
		console.log(error.message);
		if(error.kind == 'ObjectId'){
			return res.status(400).json({ msg:"Profile not found" })
		}
		res.status(500).send("server error")
	}
})


// @route    GET api/profile
// @desc     delete profile, user nd posts
// @access   Private
router.delete('/',auth, async (req, res, next) => {
	try {
		await Profile.findOneAndDelete({ user: req.user.id })
		await User.findOneAndDelete({ _id: req.user.id })
		res.json({ msg: 'User deleted' });
	} catch (error) {
		console.log(error.message);
		res.status(500).send("server error")
	}
})


module.exports = router;