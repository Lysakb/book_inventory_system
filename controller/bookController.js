const bookModel = require("../model/bookModel");

const getAllBook = async (req, res)=>{
    try {
        const book = await bookModel.find()
        res.staus(200).send(book)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const createBook = async (req, res) => {
    const {title, description, isbn} = req.body;

    if(!title || !description || !isbn){
        return res.status(500).send("Please input all fields!")
    }

    try{
        const book = await bookModel.create({
            title: title,
            description: description,
            isbn: isbn
        })

        res.status(200).send({message:"book created successfully", book})
    }catch(error){
        res.status(400).send(error.message)
    }
}

module.exports = {getAllBook, createBook}