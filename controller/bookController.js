const bookModel = require("../model/bookModel");
const {readingTime} = require("../readingTime");
const userModel = require("../model/userModel");


const createBook = async (req, res) => {
    const {title, description, isbn, body} = req.body;
    const user = req.user;

    if(!title || !description || !isbn || !body){
        return res.status(500).send("Please input all fields!")
    }


    try{
        const Book = new bookModel({
            title: title,
            description: description,
            isbn: isbn,
            body: body,
            user: user._id,
            readingTime: readingTime(body)
        })
        user.book = user.book.concat(Book._id)
        await user.save()

        await Book.save()
        res.status(200).send({message:"book created successfully", Book})
    }catch(error){
        res.status(400).send(error.message)
    }
}

const getAllBook = async (req, res)=>{
    try {
        const book = await bookModel.find()
        res.status(200).send(book)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const updateBook = async(req, res)=>{
    const {title, description, isbn, body} = req.body;
    const id = req.params.id;

    try{
        const book = await bookModel.findByIdAndUpdate(id, {
            $set:{
                title: title,
                description: description,
                isbn: isbn,
                body: body
            },
        },
        {new: true}
        );

        if(!book){
            return res.status(500).send("Book not found!")
        }
        res.status(200).send({message: "book updated successsfully!", book})
    }catch(error){
        res.status(400).send(error.message)
    }
}

module.exports = {getAllBook, createBook, updateBook}