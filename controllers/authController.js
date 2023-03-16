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


const login = async (req, res) => {

    const { email, password } = req.body;
    // console.log(email, password);
    try {
        const user = await Auth.findOne({email});
        // const email = await Auth.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(400).json({ message: 'user not found' });
        }
        if(password === user.password) {
            res.json({ message: 'login successful' });
        }else{  
            res.status(400).json({ message: 'password incorrect' });
        }


    } catch (error) {
        res.status(500).json({ message: 'server error' });
    }
}

module.exports = {register, login}