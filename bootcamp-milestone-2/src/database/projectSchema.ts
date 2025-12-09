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
type Project = {
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  link: string;
  date?: Date;
  comments?: IComment[]; // Optional array of comments
};
// mongoose schema
const projectSchema = new Schema<Project>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  imageAlt: { type: String, required: true },
  link: { type: String, required: true },
  date: { type: Date, required: false, default: new Date() },
  comments: { type: [commentSchema], required: false, default: [] }, // Array of comment subdocuments
});
// defining the collection and model
const Project =
  mongoose.models["projects"] || mongoose.model("projects", projectSchema);

export default Project;

