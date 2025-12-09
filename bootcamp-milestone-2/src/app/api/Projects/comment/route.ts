import { NextRequest, NextResponse } from 'next/server'
import connectDB from "@/database/db"
import Project from "@/database/projectSchema"

export async function POST(req: NextRequest) {
	await connectDB()

	try {
		// Extract the request body
		const body = await req.json()

		// Validate body - check that projectId, user, and comment fields exist
		if (!body.projectId || !body.user || !body.comment) {
			return NextResponse.json(
				{ error: 'Missing required fields: projectId, user, and comment are required' },
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

		// Update the project document by pushing the comment to the comments array
		const project = await Project.findByIdAndUpdate(
			body.projectId,
			{ $push: { comments: newComment } },
			{ new: true } // Return the updated document
		)

		if (!project) {
			return NextResponse.json(
				{ error: 'Project not found' },
				{ status: 404 }
			)
		}

		return NextResponse.json(
			{ message: 'Comment added successfully', project },
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

