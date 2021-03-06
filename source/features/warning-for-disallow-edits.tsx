import React from 'dom-chef';
import select from 'select-dom';
import features from '../libs/features';

function init(): void {
	const checkbox = select<HTMLInputElement>('[name="collab_privs"]');
	if (!checkbox) {
		return;
	}

	const warning = (
		<div className="flash flash-error mt-3 rgh-warning-for-disallow-edits">
			<strong>Note:</strong> Maintainers may require changes. It’s easier and faster to allow them to make direct changes before merging.
		</div>
	);
	const update = (): void => {
		if (checkbox.checked) {
			warning.remove();
		} else {
			// Select every time because the sidebar content may be replaced
			select(`
				.new-pr-form .timeline-comment,
				.discussion-sidebar .js-collab-form + .dropdown
			`)!.after(warning);
		}
	};

	update(); // The sidebar checkbox may already be un-checked
	checkbox.addEventListener('change', update);
}

features.add({
	id: 'warning-for-disallow-edits',
	include: [
		features.isCompare,
		features.isPRConversation
	],
	load: features.onAjaxedPages,
	init
});
