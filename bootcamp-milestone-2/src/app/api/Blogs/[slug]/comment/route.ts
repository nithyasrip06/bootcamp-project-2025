import { NextRequest, NextResponse } from 'next/server'
import connectDB from "@/database/db"
import Blog from "@/database/blogSchema"

type IParams = {
	params: Promise<{
		slug: string
	}>
}

export async function POST(req: NextRequest, { params }: IParams) {
	await connectDB()
	const { slug } = await params

	try {
		// Extract the request body
		const body = await req.json()

		// Validate body - check that user and comment fields exist
		if (!body.user || !body.comment) {
			return NextResponse.json(
				{ error: 'Missing required fields: user and comment are required' },
				{ status: 400 }
			)
		}

		// Validate that user and comment are strings and not empty
		if (typeof body.user !== 'string' || typeof body.comment !== 'string') {
			return NextResponse.json(
				{ error: 'user and comment must be strings' },
				{ status: 400 }
			)
		}

		if (body.user.trim() === '' || body.comment.trim() === '') {
			return NextResponse.json(
				{ error: 'user and comment cannot be empty' },
				{ status: 400 }
			)
		}

		// Create the comment object
		const newComment = {
			user: body.user.trim(),
			comment: body.comment.trim(),
			time: new Date()
		}

		// Update the blog document by pushing the comment to the comments array
		const blog = await Blog.findOneAndUpdate(
			{ slug },
			{ $push: { comments: newComment } },
			{ new: true } // Return the updated document
		)

		if (!blog) {
			return NextResponse.json(
				{ error: 'Blog not found' },
				{ status: 404 }
			)
		}

		return NextResponse.json(
			{ message: 'Comment added successfully', blog },
			{ status: 200 }
		)
	} catch (err) {
		console.error('Error adding comment:', err)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}

