import Book from "../model/book.model.js";

export const getBook = async(req, res) => {
    try {
        const book = await Book.find({ category: "Free" });
        res.status(200).json(book);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};

export const getAllBook = async(req, res) => {
    try {
        const book = await Book.aggregate([
            {
              $addFields: {
                isPaid: { $cond: { if: { $eq: ["$category", "Free"] }, then: 1, else: 0 } }
              }
            },
            {
              $sort: { isPaid: 1 }
            },
            {
              $project: {
                isPaid: 0 // Remove the computed field if not needed in the result
              }
            }
          ]);
        res.status(200).json(book);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};