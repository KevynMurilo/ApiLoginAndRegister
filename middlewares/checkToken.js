const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ msg: "Acesso negado!" });
    }

    try {
        const secret = process.env.SECRET;
        const decoded = jwt.verify(token, secret);

        // Verifique se o ID do usuário na requisição corresponde ao ID do usuário no token
        if (req.params.id !== decoded.id) {
            return res.status(401).json({ msg: "Acesso negado!" });
        }

        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ msg: "Token inválido!" });
    }
}

module.exports = checkToken;
