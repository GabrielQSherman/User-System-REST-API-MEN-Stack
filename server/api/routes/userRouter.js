const router = require('express').Router();

const validateUser = require('../../middleware/validateUser');
const checkUserCreds = require('../../middleware/checkUserCreds');
const createJWT = require('../../middleware/createJWT');
const createUser = require('../../middleware/createUser');

const User = require('../../models/User');

//@path: POST *server*/user/register
//@desc: handels user registration, will upload a new User document to MongoDB.
//@access: public 
router.post(
    '/register', 
    validateUser, 
    createUser,
    async (req, res) => {
        try {
            //req.userData is defined by the validation middleware
            res.status(201).json({token: req.token, username: req.username});

        } catch (err) {
            res.status(500).json({
                message: err.message,
                error: err
            })
        }
    }

)

//@desc put/login a user and respond with JWT containing their user DB document _id 
//@path *server*/user/login
//@access public
router.put(
    "/login", 
    checkUserCreds,
    createJWT,
    (req, res) => {
        try {
            res.json({token: req.token, username: req.username});
        } catch (err) {
            res.status(500).json({
                message: err.message,
                error: err
            })
        }
    }
)

module.exports = router