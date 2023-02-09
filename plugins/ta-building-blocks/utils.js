export function getLocalizedOptions( editor, mode ) {
	const t = editor.t;

	switch ( mode ) {
		case 'main':
			return [
				{
					class: 'ta-data-entry',
					title: t( 'Data entry' )
				},
				{
					class: 'ta-data-tables',
					title: t( 'Data tables' )
				},
				{
					class: 'ta-embed-assessment',
					title: t( 'Embed assessment' )
				},
				{
					class: 'ta-embed-signature',
					title: t( 'Embed signature' )
				},
				{
					class: 'ta-embed-company-logo',
					title: t( 'Embed company logo' )
				}
			];
		case 'ta-data-entry':
			return [
				{
					class: 'ta-single-line-text',
					title: t( 'Single-line field' )
				},
				{
					class: 'ta-multi-line-text',
					title: t( 'Multi-line field' )
				},
				{
					class: 'ta-value-selection',
					title: t( 'Value selection' )
				},
				{
					class: 'ta-embed-signature-hidden',
					title: t( 'embed-signature' )
				},
				{
					class: 'ta-embed-company-logo-hidden',
					title: t( 'embed-company-logo' )
				}
			];
		case 'ta-data-tables':
			return [
				{
					class: 'ta-activity-table',
					title: t( 'Activity' )
				},
				{
					class: 'ta-attendance-table',
					title: t( 'Attendance' )
				},
				{
					class: 'ta-assessments-table',
					title: t( 'Assessments' )
				},
				{
					class: 'ta-reports-table',
					title: t( 'Reports' )
				},
				{
					class: 'ta-collateral-table',
					title: t( 'Collateral contacts' )
				},
				{
					class: 'ta-diagnoses-table',
					title: t( 'Diagnoses' )
				},
				{
					class: 'ta-children-table',
					title: t( 'Children' )
				},
				{
					class: 'ta-medications-table',
					title: t( 'Medications' )
				},
				{
					class: 'ta-schedule-table',
					title: t( 'Schedule' )
				},
				{
					class: 'ta-goals-table',
					title: t( 'Goals' )
				},
				{
					class: 'ta-embed-assessment-hiden',
					title: t( 'embed-assessment' )
				}
			];
	}
}
