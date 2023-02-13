import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';
import Model from '@ckeditor/ckeditor5-ui/src/model';
import {
	addListToDropdown,
	createDropdown
} from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import extensionIcon from '../../src/assets/extension.svg';
import Widget from "@ckeditor/ckeditor5-widget/src/widget";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";

// import { getLocalizedOptions } from './utils';
import './theme/dataEntry.css';

import InsertSimpleBoxCommand from "./insertsimpleboxcommand";

import {_defineSchema,_defineConverters,getLocalizedOptions} from "./utils"

let editor;

export default class TADataEntry extends Plugin {

	subMenuItems( option ) {
		const items = new Collection();
		const subOptions = getLocalizedOptions( editor, option.class );
		for ( const subOption of subOptions ) {
			const def = {
				type: 'button',
				model: new Model( {
					label: subOption.title,
					class: subOption.class,
					withText: true
				} )
			};

			items.add( def );
		}

		return items;
	}

	init() {
		editor = this.editor;
		const options = getLocalizedOptions( editor, 'main' );

    _defineSchema(editor);
    _defineConverters(editor);
		this.editor.commands.add(
      "insertSimpleBox",
      new InsertSimpleBoxCommand(this.editor)
    );

		// editor.on('paste', function(evt) {
		// 	console.log('%cEvent is called!', 'color: red', evt);
		// })


		editor.ui.componentFactory.add( 'taDataEntry', locale => {
			const titles = {};
			const dropdownView = createDropdown( locale );

			// Configure dropdown's button properties:
			dropdownView.buttonView.set( {
				isOn: false,
				withText: false,
				icon: extensionIcon
			} );


			editor.editing.view.document.on( 'clipboardInput', ( evt, data ) => {
				console.log("clipboard type",data)
				if ( data.method == 'paste' ) {
					const htmlData = data.dataTransfer.getData( 'text/html' );
					if ( htmlData.indexOf( '<section' ) !== -1 ) {
						const viewFragment = editor.data.processor.toView( htmlData );
						const sectionElement = viewFragment.getChild( 0 );
						if ( sectionElement.hasAttribute( 'id' ) ) {
							// debugger;simple box widget
							const newId = 'newId';
							sectionElement._setAttribute('id',newId)
							console.log(sectionElement.getAttribute('id'),"this is section id after change---------------------------------------------------")
							const modelFragment = editor.data.toModel( viewFragment );
							// editor.model.insertContent( modelFragment );
							// editor.setData(modelFragment);
							// data.preventDefault();
						}
					}
				}
      } );


			for ( const option of options ) {

				if ( ['ta-embed-assessment', 'ta-embed-signature', 'ta-embed-company-logo'].includes(option.class) ) {
					const items = new Collection();
					items.add( {
						type: 'button',
						model: new Model( {
							label: option.title,
							class: option.class,
							withText: true
						} )
					} );
					addListToDropdown( dropdownView, items );
					continue;
				}

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
							'ck-sub-menu-bb-dropdown'
						]
					}
				} );

				submenuView.panelView.set( {
					position: 'sw'
				} );

				// TODO: how to get ElementDefinition

				let next_id = this.getNewId(editor)

				addListToDropdown( submenuView, this.subMenuItems( option ) );
				dropdownView.panelView.children.add( submenuView );
				titles[ option.model ] = option.title;

				this.listenTo( submenuView, 'execute', (nav) => {
          const menu = nav.source.label;
					let current_id = this.getNewId(editor)

					if(current_id > next_id){
						next_id = current_id
					}

          this.insertFields(menu, editor, next_id);
					next_id++;

					dropdownView.set( { isOpen: false } );
				} );

				// Execute command when an item from the dropdown is selected.
				this.listenTo( submenuView, 'execute', evt => {
					if ( evt.source.commandName ) {
						editor.execute( 'insertMultiLine' );
					}

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

			dropdownView.panelView.set( {
				position: 'sw'
			} );

			return dropdownView;
		} );
	}

  insertFields(label, editor, id) {
		editor.execute("insertSimpleBox", label, id)
      }

	getNewId(editor){
		let parser = new DOMParser()
		let ckEditorData = parser.parseFromString(editor.getData(), "text/html");
		return ckEditorData.getElementsByTagName('section').length + 1
	}
}
