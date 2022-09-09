const {User} = require('../../models')
const bcrypt = require("bcrypt")

module.exports = {
    handlerGetAllUser : async (req,res) => {
        const users = await User.findAll();
        const showUser = await users.map((e) => {
            const { id, fullName, shortName, photo } = e;
            return { id, fullName, shortName, photo }
        })
        res.status(200).json(showUser);
    },
    handlerPostUser: async (req,res) => {
        const {email, password, fullName, shortName, biodata, angkatan, jabatan} = req.body;
        const hashPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            password: hashPassword, email, fullName, shortName, biodata, angkatan, jabatan,
        })
        
        res.status(200).json({status: "success",
        message: "Succesfully create user",
        data:{id: user.id, email: user.email, fullName: user.fullName, shortName: user.shortName,
        biodata: user.biodata, angkatan: user.angkatan, jabatan: user.jabatan}})
    },
    handlerPutUser: async (req,res) => {
        const {id} = req.params;
        const {fullName, shortName, biodata, angkatan, jabatan} = req.body;
        const user = await User.findByPk(id);
        if(!user){
            res.status(404).json({
                message: `User with ${id} doesn't exist!!!`
            })
        }else{
            await user.update({
                fullName, shortName, biodata, angkatan, jabatan
            });
            res.status(200).json({ status: "success", message: "Successfully update user" });
        }
    }, handlerDeleteUser: async (req, res) => {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404).json({
                message: `User with id ${id} doesn't exist!!!`
            })
        } else {
            await user.destroy();
            res.status(200).json({status: "success", message: "Successfully delete user"});
        }
    }, handlerFindByPk: async (req,res) => {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404).json({
                message: `User with id ${id} doesn't exist!!!`
            })
        } else {
            res.status(200).json({status: "success", message : "Successfully get user by id", data: User});
        }
    }
}