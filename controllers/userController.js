const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
    getUserById: async (req, res) => {
        const id = req.params.id;
        const user = await User.findById(id, '-password');

        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado' });
        }

        res.status(200).json({ user });
    },

    registerUser: async (req, res) => {
        const { name, email, password, confirmpassword } = req.body;

        if (!name || !email || !password || !confirmpassword) {
            return res.status(422).json({ msg: "Todos os campos são obrigatórios" });
        }

        if (password !== confirmpassword) {
            return res.status(422).json({ msg: "As senhas não conferem" });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(422).json({ msg: "Este e-mail já está em uso" });
        }

        const salt = await bcrypt.genSalt(12);
        const passworHash = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: passworHash,
        });

        await user.save();

        res.status(201).json({ msg: "Usuário criado com sucesso" });
    },

    loginUser: async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ msg: "O email e a senha são obrigatórios" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado" });
        }

        const checkPassowrd = await bcrypt.compare(password, user.password);

        if (!checkPassowrd) {
            return res.status(422).json({ msg: "Senha inválida" });
        }

        const secret = process.env.SECRET;
        const token = jwt.sign({ id: user._id }, secret);

        res.status(200).json({ msg: "Autenticação realizada com sucesso", token });
    }
}

module.exports = userController;
