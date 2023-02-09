import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';
import Model from '@ckeditor/ckeditor5-ui/src/model';
import {
	addListToDropdown,
	createDropdown
} from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import formatIcon from '../../src/assets/format.svg';

import { getLocalizedOptions } from './utils';
import './theme/heading.css';

let headingCommand;
let paragraphCommand;
let commands;
let editor;

export default class TAHeading extends Plugin {
	subMenuItems( option ) {
		const arr = option.class.split( '-' );
		arr[ 0 ] = '';
		const newClass = 'ta' + arr.join( '-' );

		const items = new Collection();

		const def = {
			type: 'button',
			model: new Model( {
				label: 'Apply ' + option.title.toLowerCase(),
				class: newClass + '-apply',
				withText: true
			} )
		};

		const updateDef = {
			type: 'button',
			model: new Model( {
				label: 'Update ' + option.title.toLowerCase(),
				class: newClass + '-update',
				withText: true
			} )
		};

		if ( option.model === 'paragraph' ) {
			def.model.bind( 'isOn' ).to( paragraphCommand, 'value' );
			def.model.set( 'commandName', 'paragraph' );
			commands.push( paragraphCommand );
		} else {
			def.model.bind( 'isOn' ).to( headingCommand, 'value', value => value === option.model );
			def.model.set( {
				commandName: 'heading',
				commandValue: option.model
			} );
		}

		items.add( def );
		items.add( updateDef );

		return items;
	}

	init() {
		editor = this.editor;
		const t = editor.t;
		const options = getLocalizedOptions( editor );
		const defaultTitle = t( 'Paragraph' );

		editor.ui.componentFactory.add( 'taHeading', locale => {
			const titles = {};

			const dropdownView = createDropdown( locale );
			headingCommand = editor.commands.get( 'heading' );
			paragraphCommand = editor.commands.get( 'paragraph' );
			commands = [ headingCommand ];

			// Configure dropdown's button properties:
			dropdownView.buttonView.set( {
				isOn: false,
				withText: true,
				label: 'Paragraph',
				icon: formatIcon
			} );

			for ( const option of options ) {
				const submenuView = createDropdown( locale );
				submenuView.extendTemplate( {
					attributes: {
						style: {
							display: 'inherit'
						}
					}
				} );

				submenuView.buttonView.set( {
					label: option.title,
					withText: true
				} );

				submenuView.panelView.extendTemplate( {
					attributes: {
						class: [
							'ck-sub-menu-dropdown'
						]
					}
				} );

				// TODO: how to get ElementDefinition

				addListToDropdown( submenuView, this.subMenuItems( option ) );
				dropdownView.panelView.children.add( submenuView );
				titles[ option.model ] = option.title;

				submenuView.bind( 'isEnabled' ).toMany( commands, 'isEnabled', ( ...areEnabled ) => {
					return areEnabled.some( isEnabled => isEnabled );
				} );

				// Execute command when an item from the dropdown is selected.
				this.listenTo( submenuView, 'execute', evt => {
					if ( evt.source.commandName || evt.source.commandValue ) {
						editor.execute( evt.source.commandName, evt.source.commandValue ?
							{ value: evt.source.commandValue } : undefined );
					}
					editor.editing.view.focus();
					dropdownView.set( { isOpen: false } );
				} );
			}

			dropdownView.extendTemplate( {
				attributes: {
					class: [
						'ta-heading-dropdown'
					]
				}
			} );

			dropdownView.bind( 'isEnabled' ).toMany( commands, 'isEnabled', ( ...areEnabled ) => {
				return areEnabled.some( isEnabled => isEnabled );
			} );

			dropdownView.buttonView.bind( 'label' ).to( headingCommand, 'value', paragraphCommand, 'value', ( value, para ) => {
				const whichModel = value || para && 'paragraph';
				// If none of the commands is active, display default title.
				return titles[ whichModel ] ? titles[ whichModel ] : defaultTitle;
			} );

			return dropdownView;
		} );
	}
}
