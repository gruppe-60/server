const Auth = require('../models/authModel');

const register = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const newUser = new Auth({
        email,
        password
        });
    
        await newUser.save();
        res.json({ message: 'user created!' });
    } catch (error) {
        res.status(500).json({ message: 'server error' });
    }
}


// const login = async (req, res) => {

//     const { email, password } = req.body;

//     try {
//         const email = Auth.findOne({ email: email });


//     } catch (error) {
//         res.status(500).json({ message: 'server error' });
//     }
// }

module.exports = {register}