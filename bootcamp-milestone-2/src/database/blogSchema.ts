import mongoose, { Schema } from "mongoose"; 

// Comment type and schema
type IComment = {
	user: string;
	comment: string;
	time: Date;
};

const commentSchema = new Schema<IComment>({
	user: { type: String, required: true },
	comment: { type: String, required: true },
	time: { type: Date, required: true, default: new Date() },
}, { _id: false }); // _id: false prevents Mongoose from adding an _id to each comment

// typescript type (can also be an interface) 
type Blog = { 
	title: string; 
	date: Date; 
	description: string; 
	image: string; 
	imageAlt: string; 
	slug: string; 
	content: string;
	comments?: IComment[]; // Optional array of comments
}; 

// mongoose schema 
const blogSchema = new Schema<Blog>({ 
	title: { type: String, required: true }, 
	date: { type: Date, required: false, default: new Date() }, 
	description: { type: String, required: true }, 
	image: { type: String, required: true }, 
	imageAlt: { type: String, required: true }, 
	slug: { type: String, required: true }, 
	content: { type: String, required: true },
	comments: { type: [commentSchema], required: false, default: [] }, // Array of comment subdocuments
}) 
// defining the collection and model 
const Blog = mongoose.models['blogs'] || mongoose.model('blogs', blogSchema); 

export default Blog;