/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties'
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Mention from '@ckeditor/ckeditor5-mention/src/mention'
/* plugins for TreatAnyone report templates */
import TAHeading from '../plugins/ta-heading/heading';
import TABuildingBlocks from '../plugins/ta-building-blocks/buildingBlocks';
import MentionCustomization from '../plugins/ta-mention/mention';
import TADataEntry from '../plugins/ta-data-entry/dataEntry';
import Font from '@ckeditor/ckeditor5-font/src/font'
import { FONT_BACKGROUND_COLOR, FONT_COLOR } from './const';
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert';
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';

function DisallowNestingTables( editor ) {
	editor.model.schema.addChildCheck( ( context, childDefinition ) => {
			if ( childDefinition.name == 'table' && Array.from( context.getNames() ).includes( 'table' ) ) {
					return false;
			}
	} );
}
export default class ClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
	Alignment,
	Essentials,
	UploadAdapter,
	Autoformat,
	Bold,
	Italic,
	BlockQuote,
	CKFinder,
	Heading,
	Image,
	Indent,
	Link,
	List,
	MediaEmbed,
	Paragraph,
	PasteFromOffice,
	Underline,
	Table,
	TableToolbar,
	TextTransformation,
	TAHeading,
	TABuildingBlocks,
	Mention,
	MentionCustomization,
	TADataEntry,
	Font,
	ImageInsert,
	SimpleUploadAdapter,
	TableProperties,
	DisallowNestingTables,
	ImageToolbar,
	ImageResize,
	ImageStyle,
	ImageCaption
];

// Editor configuration.
ClassicEditor.defaultConfig = {
	toolbar: {
		items: [
			'heading',
			'taHeading',
			'|',
			'bold',
			'italic',
			'underline',
			'|',
			"fontFamily",
			"fontSize",
			"fontColor",
			"fontBackgroundColor",
			'|',
			'alignment:left',
			'alignment:center',
			'alignment:right',
			'alignment:justify',
			'|',
			'bulletedList',
			'numberedList',
			'|',
			'imageUpload',
			'link',
			'insertImage',
			'insertTable',
			'taBuildingBlocks',
			'taDataEntry',
			'simpleBox'
		]
	},
	image: {
		resizeOptions: [
			{
				name: 'resizeImage:original',
				value: null,
				icon: 'original'
			},
			{
				name: 'resizeImage:50',
				value: '50',
				icon: 'medium'
			},
			{
				name: 'resizeImage:75',
				value: '75',
				icon: 'large'
			}
		],
		toolbar: [
			'resizeImage:50',
			'resizeImage:75',
			'resizeImage:original',
			'|',
			'imageStyle:block',
			'imageStyle:alignLeft',
			'imageStyle:alignRight'
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells',
			'tableProperties',
			'tableCellProperties'
		]
	},
	fontFamily: {
    options: [
			'default',
			'Arial, Helvetica, sans-serif',
			'Courier New, Courier, monospace',
			'Georgia, serif',
			'Lucida Sans Unicode, Lucida Grande, sans-serif',
			'Tahoma, Geneva, sans-serif',
			'Times New Roman, Times, serif',
			'Trebuchet MS, Helvetica, sans-serif',
			'Verdana, Geneva, sans-serif'
		],
    supportAllValues: true
  },
	fontSize: {
		options: [
				'default',
				9,
				11,
				13,
				17,
				19,
				21
		]
	},
	fontColor: {
		colors: FONT_COLOR
	},
	fontBackgroundColor: {
		colors: FONT_BACKGROUND_COLOR
	},
	heading: {
		options: [
			{ model: 'heading1', view: 'h2', title: 'Heading 1', class: 'ck-heading_heading1' },
			{ model: 'heading2', view: 'h3', title: 'Heading 2', class: 'ck-heading_heading2' },
			{ model: 'heading3', view: 'h4', title: 'Heading 3', class: 'ck-heading_heading3' },
			{ model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' }
		]
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en'
};
