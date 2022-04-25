import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import LinterCommand from './lintercommand';

export default class LinterEditing extends Plugin {
    // /**
    //  * @inheritDoc
    //  */
    static get pluginName() {
        return 'linterEditing';
    }

    /**
     * @inheritDoc
     */
    init() {
        const editor = this.editor;

        editor.model.schema.extend( '$text', { allowAttributes: [ 'linter' ] } );

        editor.conversion.for( 'editingDowncast' ).markerToHighlight( {
            model: 'findResult',
            view: ( { markerName } ) => {
                const [ , id ] = markerName.split( ':' );

                // Marker removal from the view has a bug: https://github.com/ckeditor/ckeditor5/issues/7499
                // A minimal option is to return a new object for each converted marker...
                return {
                    name: 'span',
                    classes: [ 'ck-lint-result' ],
                    attributes: {
                        // ...however, adding a unique attribute should be future-proof..
                        'data-find-result': id
                    }
                };
            }
        } );

        editor.commands.add( 'linter', new LinterCommand( editor ) );

        // editor.editing.view.change( writer => {
        //     for ( const root of editor.editing.view.document.roots ) {
        //         console.log('yeetus')
        //     }
        // } );
    }
}
