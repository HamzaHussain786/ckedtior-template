
export default function MentionCustomization( editor ) {
  editor.conversion.for( 'upcast' ).elementToAttribute( {
    view: {
      name: 'a',
      key: 'data-mention',
      classes: 'ta-mention',
      attributes: {
        href: true,
        'data-uuid': true,
        'data-value': true,
        'data-type': true
      }
    },
    model: {
      key: 'mention',
      value: viewItem => editor.plugins.get( 'Mention' )
        .toMentionAttribute( viewItem, {
          path: viewItem.getAttribute( 'href' ),
          uuid: viewItem.getAttribute( 'data-uuid' ),
          value: viewItem.getAttribute( 'data-value' ),
          type: viewItem.getAttribute( 'data-type' )
        })
    },
    converterPriority: 'high'
  } );

  editor.conversion.for( 'downcast' ).attributeToElement( {
    model: 'mention',
    view: ( modelAttributeValue, { writer } ) => {
      if ( !modelAttributeValue ) return;

      return writer.createAttributeElement( 'a', {
        class: 'ta-mention',
        'data-mention': modelAttributeValue.id,
        'data-uuid': modelAttributeValue.uuid,
        'data-value': modelAttributeValue.value,
        'data-type': modelAttributeValue.type,
        'href': modelAttributeValue.path
      }, {
        priority: 20,
        id: modelAttributeValue.uid
      } );
    },
    converterPriority: 'high'
  } );
}