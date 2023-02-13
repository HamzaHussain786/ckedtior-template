import {
  toWidget,
  toWidgetEditable,
} from "@ckeditor/ckeditor5-widget/src/utils";
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
				},
			];
	}
}



export function _defineSchema(editor) {
	console.log('in define schema')
	const schema = editor.model.schema;

	schema.register("simpleBox", {
		isObject: true,
		allowWhere: "$block",
		allowAttributes: ['id']
	});

	schema.register("simpleBoxTitle", {
		isLimit: true,
		isInline: true,
		allowIn: "simpleBox",
		allowContentOf: "$block",
		// allowAttributes: ['value', 'type']
	});

	schema.register("simpleBoxDescription", {
		isLimit: true,
		isInline: true,
		allowIn: "simpleBox",
		allowContentOf: "$block",		
	});

	schema.register("singleLineDescriptionParagraph", {
		isLimit: true,
		isInline: true,
		allowIn: "simpleBoxDescription",
		allowContentOf: "$block",
		// allowChildren: '$text'
	});

	schema.register("multiLineBoxDescription", {
		isLimit: true,
		isInline: true,
		allowIn: "simpleBox",
		allowContentOf: "$block",
	});

	schema.register("multiLineDescriptionParagraph", {
		isLimit: true,
		isInline: true,
		allowIn: "multiLineBoxDescription",
		allowContentOf: "$block",
	});

}



export function _defineConverters(editor) {
	console.log('in define convertors')
	const conversion = editor.conversion;

	// <simpleBox> converters
	conversion.for("upcast").elementToElement({
		view: {
			name: "section",
			classes: "simple-box",
		},
		// model: "simpleBox",
		model: ( viewElement, { writer: modelWriter } ) => {
      // Extract the "name" from "{name}".
      debugger
      console.log("this is view element---------------------->>>>>", viewElement)
      // const name = viewElement.getChild( 0 ).data.slice( 1, -1 );

      return modelWriter.createElement( 'simpleBox');
  }
	});

	conversion.for("dataDowncast").elementToElement({
		model: "simpleBox",
		// view: {
		// 	name: "section",
		// 	classes: "simple-box",
		// },
		view: (modelElement, { writer: viewWriter }) => {
			debugger
			const section = viewWriter.createContainerElement("section", {
				class: "simple-box",
			});

			return toWidget(section, viewWriter);
		},
	});


	conversion.attributeToAttribute( {
		model: {
			name: 'simpleBox',
			key: 'id',
		},
		view: {
			name: 'section',
			key: 'id',
		}
	} );


	conversion.for("editingDowncast").elementToElement({
		model: "simpleBox",
		view: (modelElement, { writer: viewWriter }) => {
			debugger
			const section = viewWriter.createContainerElement("section", {
				class: "simple-box",
			});

			return toWidget(section, viewWriter, { label: "simple box widget" });
		},
	});

	// <simpleBoxTitle> converters
	conversion.for("upcast").elementToElement({
		model: "simpleBoxTitle",
		view: {
			name: "p",
			classes: "simple-box-title",
		},
	});


	// conversion.attributeToAttribute( {
	// 	model: {
	// 		name: 'simpleBoxTitle',
	// 		key: 'value',
	// 	},
	// 	view: {
	// 			name: 'input',
	// 			key: 'value',
	// 		}
	// } );

	// conversion.attributeToAttribute( {
	// 	model: {
	// 		name: 'simpleBoxTitle',
	// 		key: 'type',
	// 	},
	// 	view: {
	// 		name: 'input',
	// 		key: 'type',
	// 	}
	// } );



	conversion.for("dataDowncast").elementToElement({
		model: "simpleBoxTitle",
		view: {
			name: "p",
			classes: "simple-box-title",
		},
	});

	conversion.for("editingDowncast").elementToElement({
		model: "simpleBoxTitle",
		view: (modelElement, { writer: viewWriter }) => {
			const paragraph = viewWriter.createEditableElement("p", {
				class: "simple-box-title",
			});
			return toWidget(paragraph, viewWriter);
		},
	});
	

	// <simpleBoxDescription> converters
	conversion.for("upcast").elementToElement({
		model: "simpleBoxDescription",
		view: {
			name: "div",
			classes: "simple-box-description",
		},
	});

	conversion.for("downcast").elementToElement({
		model: "simpleBoxDescription",
		view: {
			name: "div",
			classes: "simple-box-description",
		},
	});

	conversion.for("editingDowncast").elementToElement({
		model: "simpleBoxDescription",
		view: (modelElement, { writer: viewWriter }) => {
			const div = viewWriter.createEditableElement("div", {
				class: "simple-box-description",
			});

			return toWidgetEditable(div, viewWriter);
		},
	});


	// <singleLineDescriptionParagraph> converters
	conversion.for("upcast").elementToElement({
		model: "singleLineDescriptionParagraph",
		view: {
			name: "p",
			classes: "singleLine-box-description-paragraph",
		},
	});
	conversion.for("downcast").elementToElement({
		model: "singleLineDescriptionParagraph",
		view: {
			name: "p",
			classes: "singleLine-box-description-paragraph",
		},
	});

	conversion.for("editingDowncast").elementToElement({
		model: "singleLineDescriptionParagraph",
		view: (modelElement, { writer: viewWriter }) => {
			const paragraph = viewWriter.createEditableElement("p", {
				classes: "singleLine-box-description-paragraph",
			});
			return toWidgetEditable(paragraph, viewWriter);
		},
	});


	// <multiBoxDescription> converters
	conversion.for("upcast").elementToElement({
		model: "multiLineBoxDescription",
		view: {
			name: "div",
			classes: "multiLine-box-description",
		},
	});

	conversion.for("downcast").elementToElement({
		model: "multiLineBoxDescription",
		view: {
			name: "div",
			classes: "multiLine-box-description",
		},
	});

	conversion.for("editingDowncast").elementToElement({
		model: "multiLineBoxDescription",
		view: (modelElement, { writer: viewWriter }) => {
			const div = viewWriter.createEditableElement("div", {
				class: "multiLine-box-description",
			});

			return toWidgetEditable(div, viewWriter);
		},
	});


		// <multiLineDescriptionParagraph> converters
		conversion.for("upcast").elementToElement({
			model: "multiLineDescriptionParagraph",
			view: {
				name: "p",
				classes: "multiLine-box-description-paragraph",
			},
		});

		conversion.for("downcast").elementToElement({
			model: "multiLineDescriptionParagraph",
			view: {
				name: "p",
				classes: "multiLine-box-description-paragraph",
			},
		});
	
		conversion.for("editingDowncast").elementToElement({
			model: "multiLineDescriptionParagraph",
			view: (modelElement, { writer: viewWriter }) => {
				const paragraph = viewWriter.createEditableElement("p", {
					classes: "multiLine-box-description-paragraph",
				});
	
				return toWidgetEditable(paragraph, viewWriter);
			},
		});
}