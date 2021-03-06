import React from 'dom-chef';
import select from 'select-dom';
import features from '../libs/features';

const allowedReasons = ['resolved', 'outdated', 'off-topic'];

const capitalize = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1);

const init = (): void => {
	for (const details of select.all('.minimized-comment:not(.d-none) > details:not(.rgh-preview-hidden-comments)')) {
		details.classList.add('rgh-preview-hidden-comments');

		const commentText = select('.comment-body', details)!.textContent!.trim();
		if (commentText.length === 0) {
			continue;
		}

		const header = select(`
			summary .timeline-comment-header-text,
			summary .discussion-item-copy
		`, details)!;

		const [, reason]: string[] = header.textContent!.trim().match(/was marked as ([^.]+)/)!;
		if (!allowedReasons.includes(reason)) {
			continue;
		}

		header.append(
			<span className="Details-content--open">{header.firstChild}</span>,
			<span className="Details-content--closed">{`${capitalize(reason)} — ${commentText}`}</span>
		);
	}
};

features.add({
	id: 'preview-hiddden-comments',
	include: [
		features.hasComments
	],
	load: features.onNewComments,
	init
});
