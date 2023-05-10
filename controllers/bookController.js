import {Book} from "../models/bookModel.js"
import { Request } from "../models/requestBookModel.js"
import { catchAsyncError } from "../middelware/catchAsyncError.js"
import ErrorHandler from "../utils/errorHandler.js"

// All Books
export const allBooks = catchAsyncError(async(req, res, next)=>{
    const books = await Book.find();
    if(!books) return next(new ErrorHandler("No Books Found", 404));
    res.status(200).json({
        success:true,
        books
    })
})

// Add Book --Admin
export const addBook = catchAsyncError(async(req, res, next)=>{
    const {title, author} = req.body;
    const createdBy = req.body.user = req.user.id
    if(!title || !author) return next(new ErrorHandler("Please Fill All Fields", 400));

    const book = await Book.create({
        title, author, createdBy
    })

    res.status(201).json({
        success:true,
        book
    })
})

// Update Book --Admin
export const updateBook = catchAsyncError(async(req, res, next)=>{
    const {title, author} = req.body;
    const book = await Book.findById(req.params.id);
    if(title) book.title = title;
    if(author) book.author = author;

    await book.save();

    res.status(200).json({
        success:true,
        message:"Book Updated Succesfully"
    })
})

// Delete Book --Admin
export const deleteBook = catchAsyncError(async(req, res, next)=>{
    let book = await Book.findById(req.params.id);
    if(!book) return next(new ErrorHandler("Book not Found", 404));

    await book.deleteOne();

    res.status(200).json({
        success:true,
        message:"Book Deleted Successfully"
    })
})

// Get All Book Who Created that Book
export const userBooks = catchAsyncError(async(req, res, next)=>{
    const createdBy = req.body.user = req.user.id;
    const books = await Book.find({createdBy}).populate("createdBy", "id name email");
    res.status(200).json({
        success:true,
        books
    })
})

// Request Book
export const requestBook = catchAsyncError(async(req, res, next)=>{
    const {bookId} = req.body;
    const requestedBy = req.body.user = req.user.id

    const book = await Book.findById(bookId);
    if(!book) return next(new ErrorHandler("Book Not Found", 404));

    const request = new Request({book : bookId, requestedBy});
    await request.save();

    res.status(200).json({
        success:true,
        request
    })
})

// View All Requested Book --Admin
export const requestList = catchAsyncError(async(req, res, next)=>{
    const requests = await Request.find();
    res.status(200).json({
        success:true,
        requests
    })
})

// Update Book Status --Admin
export const updateStatus = catchAsyncError(async(req, res, next)=>{
    const {id} = req.params;
    const status = req.body;
    const request = await Request.findByIdAndUpdate(id, status, {
        new:true
    })
    if(!request) return next(new ErrorHandler("Request Not Found", 404));
    res.status(200).json({
        success:true,
        request
    })
})