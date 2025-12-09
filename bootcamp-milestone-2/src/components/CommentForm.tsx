'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type CommentFormProps = {
	blogSlug?: string
	projectId?: string
}

export default function CommentForm({ blogSlug, projectId }: CommentFormProps) {
	const [user, setUser] = useState('')
	const [comment, setComment] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const router = useRouter()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError(null)
		setIsSubmitting(true)

		try {
			let url: string
			let body: any

			if (blogSlug) {
				// Blog comment endpoint
				url = `/api/Blogs/${blogSlug}/comment`
				body = { user, comment }
			} else if (projectId) {
				// Project comment endpoint
				url = `/api/Projects/comment`
				body = { projectId, user, comment }
			} else {
				throw new Error('Either blogSlug or projectId must be provided')
			}

			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || 'Failed to post comment')
			}

			// Clear the form
			setUser('')
			setComment('')

			// Refresh the page to show the new comment
			router.refresh()
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className="comment-form">
			<h3>Add a Comment</h3>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="user">Name:</label>
					<input
						type="text"
						id="user"
						value={user}
						onChange={(e) => setUser(e.target.value)}
						required
						disabled={isSubmitting}
					/>
				</div>
				<div>
					<label htmlFor="comment">Comment:</label>
					<textarea
						id="comment"
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						required
						disabled={isSubmitting}
						rows={4}
					/>
				</div>
				{error && <div className="error-message">{error}</div>}
				<button type="submit" disabled={isSubmitting}>
					{isSubmitting ? 'Submitting...' : 'Submit Comment'}
				</button>
			</form>
		</div>
	)
}

