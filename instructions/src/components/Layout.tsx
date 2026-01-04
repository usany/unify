import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

// Terms of Use and Privacy Policy
import TermsOfUse from './texts/terms_of_use.md'
import PrivacyPolicy from './texts/privacy_policy.md'

export const TermsPage = (): JSX.Element => {
	const [tosText, setTosText] = useState('')
	const [privacyPolicyText, setPrivacyPolicyText] = useState('')

	// Fetch Terms of Use
	useEffect(() => {
		fetch(TermsOfUse).then(res => res.text()).then(text => setTosText(text))
	})

	useEffect(() => {
		fetch(PrivacyPolicy).then(res => res.text()).then(text => setPrivacyPolicyText(text))
	})

	return (
		<div>
			<ReactMarkdown children={tosText} />
			<ReactMarkdown children={privacyPolicyText} />
		</div>
	)
}
