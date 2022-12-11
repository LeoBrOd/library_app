import Library from "../model/LibraryModel.js";

export const addbook = async (req, res) => {
  const {
    bookId,
    userId,
    review,
    mark,
    status,
    favorite,
  } = req.body;
  console.log(bookId);
  try {
    await Library.create({
      bookId: bookId,
      userId: userId,
      review: review,
      mark: mark,
      status: status,
      favorite: favorite,
    });
    res.json({ msg: "Book added successfully!" });
  } catch (e) {
    console.log(e);
    res.status(404).json({
      msg: e,
    });
  }
};

var object_query = JSON.parse(req.params.object_query)

export const getbooks = async (req, res) => {
  try {
    const books = await Library.findAll({
      attributes: ["userId", "bookId"],
      where: { userId: whereStatement.id },
    });
    res.json(books);
    console.log(books);
  } catch (e) {
    console.log(e);
    res
      .status(404)
      .json({ msg: "List of books is empty" });
  }
};
