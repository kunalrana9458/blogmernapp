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