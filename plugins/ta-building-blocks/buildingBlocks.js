import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';
import Model from '@ckeditor/ckeditor5-ui/src/model';
import {
	addListToDropdown,
	createDropdown
} from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import extensionIcon from '../../src/assets/extension.svg';

import { getLocalizedOptions } from './utils';
import './theme/buildingBlocks.css';

let editor;

export default class TABuildingBlocks extends Plugin {
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

		editor.ui.componentFactory.add( 'taBuildingBlocks', locale => {
			const titles = {};

			const dropdownView = createDropdown( locale );

			// Configure dropdown's button properties:
			dropdownView.buttonView.set( {
				isOn: false,
				withText: false,
				icon: extensionIcon
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

				addListToDropdown( submenuView, this.subMenuItems( option ) );
				dropdownView.panelView.children.add( submenuView );
				titles[ option.model ] = option.title;

				this.listenTo( submenuView, 'execute', (nav) => {
          const menu = nav.source.label;

          this.insertImage(menu, editor);
					this.insertContent

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

  insertImage(label, editor) {
    editor.model.change( writer => {
      let imageElement;
      switch(label) {
        case "Multi-line field":
          imageElement = writer.createElement( 'imageBlock', {
            src: "template-multi-line.png"
          } );
          break;
        case "Value selection":
          imageElement = writer.createElement( 'imageBlock', {
            src: "template-value-selection.png"
          } );
          break;
        case "Single-line field":
          imageElement = writer.createElement( 'imageBlock', {
            src: "template-single-line.png"
          } );
          break;
				case "Attendance":
					imageElement = writer.createElement( 'imageBlock', {
						src: "template-attendance-table.png"
					} );
					break;
				case "Assessments":
					imageElement = writer.createElement( 'imageBlock', {
						src: "template-assessment-table.png"
					} );
					break;
				case "Reports":
					imageElement = writer.createElement( 'imageBlock', {
						src: "template-reports-table.png"
					} );
					break;
				case "Activity":
					imageElement = writer.createElement( 'imageBlock', {
						src: "template-activity-table.png"
					} );
					break;
				case "Diagnoses":
					imageElement = writer.createElement( 'imageBlock', {
						src: "template-diagnoses-table.png"
					} );
					break;
				case "Collateral contacts":
					imageElement = writer.createElement( 'imageBlock', {
						src: "template-collateral-table.png"
					} );
					break;
				case "Children":
					imageElement = writer.createElement( 'imageBlock', {
						src: "template-children-table.png"
					} );
					break;
				case "Medications":
					imageElement = writer.createElement( 'imageBlock', {
						src: "template-medication-table.png"
					} );
					break;
				case "Schedule":
					imageElement = writer.createElement( 'imageBlock', {
						src: "template-schedule-table.png"
					} );
					break;
				case "Goals":
					imageElement = writer.createElement( 'imageBlock', {
						src: "template-goals-table.png"
					} );
						break;
				case "embed-assessment":
					imageElement = writer.createElement( 'imageBlock', {
						src: "template-embed-assessment.png"
					} );
					break;
				case "embed-signature":
					imageElement = writer.createElement( 'imageBlock', {
						src: "template-embed-signature.png"
					} );
					break;
				case "embed-company-logo":
					imageElement = writer.createElement( 'imageBlock', {
						src: "template-embed-company-logo.png"
					} );
					break;
      }
      // Insert the image in the current selection location.
      editor.model.insertContent( imageElement, editor.model.document.selection );
			const paragraph = writer.createElement( 'paragraph' );
			const position = writer.createPositionAt(imageElement, "after");
			editor.model.insertContent( paragraph, position);
			writer.setSelection( paragraph, 'in' );
    } );
  }
}
