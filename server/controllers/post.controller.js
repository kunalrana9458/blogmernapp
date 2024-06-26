import { errorHandler } from "../utils/error.js"
import Post from "../models/Post.models.js";

export const create = async(req,res,next) => {
    if(!req.user.isAdmin){
        return next(errorHandler(403,'You are Not allowed to create a post'));
    }

    if(!req.body.title || !req.body.content){
        return next(errorHandler(400,'Please Provide all required fields'));
    }

    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g,' ');
    const newPost = new Post ({
        ...req.body
        ,slug
        ,userId:req.user.id,
    });

    try {
        const savedPost = await newPost.save();
        res.status(201).json({
            success:true,
            post:savedPost
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const getPosts = async (req,res,next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const  post = await Post.find({
            ...(req.query.userId && {userId:req.query.userId}),
            ...(req.query.category && {category: req.query.category}),
            ...(req.query.slug && {slug : req.query.slug}),
            ...(req.query.postId && {_id : req.query.postId}),
            ...(req.query.searchTerm && {
                $or: [
                    {title:{$regex:req.query.searchTerm, $options:'i'}},
                    {content:{$regex:req.query.searchTerm, $options:'i'}},
                    
                ],
        }),
    }).sort({updatedAt:sortDirection}).skip(startIndex).limit(limit);

    const totalPost = await Post.countDocuments();
    const now = new Date();
    const oneMonthsAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
        createdAt:{$gte : oneMonthsAgo},
    })

    res.status(200).json({
        post,
        totalPost,
        lastMonthPosts,
    }); 

    } catch (error) {
        next(error);
    }
}

export const deletePost = async(req,res) => {
    if(!req.user.isAdmin || req.user.id !== req.params.userId){
        return next(errorHandler(403,'You are not allowed to delete this post'));
    }
    try {
        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json('The Post has been Deleted')
    } catch (error) {
        next(error)
    }
}

export const updatePost = async(req,res,next) => {
    if(!req.user.isAdmin || req.user.id !== req.params.userId){
        return next(errorHandler(403,'You are Not Allowed to Update that post'))
    }

    try {
        const updatePost = await Post.findByIdAndUpdate(
            req.params.postId,
            {
                $set:{
                    title:req.body.title,
                    content:req.body.content,
                    category:req.body.category,
                    image:req.body.image,
                }
            },
            {new:true}
        );

        console.log(updatePost);

        return res.status(200).json(updatePost);
    } catch (error) {
        next(error)
    }
}