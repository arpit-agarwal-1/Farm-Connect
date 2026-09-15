const jwt = require('jsonwebtoken');

const SECRET_KEY = 'yudsjfhysdjfnjv8J&UJDF*$HDSAFSDG';

exports.generateToken = (id) => {
    return jwt.sign({ id }, SECRET_KEY, { expiresIn: "7d" });
}

exports.validateToken = (req, res, next) => {
    try {        
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({message:'Authentication failed'});
        }

        const token =authHeader.split(" ")[1];
        // const token=authHeader;

        jwt.verify(token,SECRET_KEY);
        next();
    } catch (error) {
        return res.status(401).json({message:'Authentication failed'});
    }
}