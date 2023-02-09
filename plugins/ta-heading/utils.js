/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module heading/utils
 */

/**
 * Returns heading options as defined in `config.heading.options` but processed to consider
 * the editor localization, i.e. to display {@link module:heading/heading~HeadingOption}
 * in the correct language.
 *
 * Note: The reason behind this method is that there is no way to use {@link module:utils/locale~Locale#t}
 * when the user configuration is defined because the editor does not exist yet.
 *
 * @param {module:core/editor/editor~Editor} editor
 * @returns {Array.<module:heading/heading~HeadingOption>}.
 */
export function getLocalizedOptions( editor ) {
	const t = editor.t;
	const localizedTitles = {
		Paragraph: t( 'Paragraph' ),
		'Heading 1': t( 'Heading 1' ),
		'Heading 2': t( 'Heading 2' ),
		'Heading 3': t( 'Heading 3' )
	};

	return editor.config.get( 'heading.options' ).map( option => {
		const title = localizedTitles[ option.title ];

		if ( title && title != option.title ) {
			option.title = title;
		}

		return option;
	} );
}

/* TODO generate  ElementDefinition based on currently selected text */
/* API:
	https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_view_elementdefinition-ElementDefinition.html
	https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_conversion_conversion-Conversion.html#function-elementToElement
*/
export function getView( model, newStyle ) {
	newStyle = {
		'color': 'red'
	};

	switch ( model ) {
		case 'paragraph':
			return {
				name: 'p',
				styles: newStyle
			};
		case 'heading1':
			return {
				name: 'h1',
				styles: newStyle
			};
		case 'heading2':
			return {
				name: 'h2',
				styles: newStyle
			};
		case 'heading3':
			return {
				name: 'h3',
				styles: newStyle
			};
	}
}
