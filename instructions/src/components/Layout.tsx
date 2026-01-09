import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

export const TermsPage = (): JSX.Element => {
	const [tosText, setTosText] = useState('Terms of Use content will be displayed here.')
	const [privacyPolicyText, setPrivacyPolicyText] = useState('Privacy Policy content will be displayed here.')

	return (
		<div>
			<ReactMarkdown children={tosText} />
			<ReactMarkdown children={privacyPolicyText} />
		</div>
	)
}
