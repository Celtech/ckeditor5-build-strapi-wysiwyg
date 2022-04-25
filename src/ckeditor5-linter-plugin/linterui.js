import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

import LinterIcon from './icons/linter.svg';


/**
 * The standard editing mode UI feature.
 *
 * It introduces the `'restrictedEditingException'` button that marks text as unrestricted for editing.
 *
 * @extends module:core/plugin~Plugin
 */
export default class LinterUI extends Plugin {
    /**
     * @inheritDoc
     */
    init() {
        const editor = this.editor;
        const t = editor.t;
        this.isEnabled = true;
        this.isOn = true;

        editor.ui.componentFactory.add( 'linter', locale => {
            const command = editor.commands.get( 'linter' );
            const view = new ButtonView( locale );

            view.set( {
                icon: LinterIcon,
                tooltip: true,
                isToggleable: true,
                isOn: this.isOn,
                isEnabled: this.isEnabled,
            } );

            this.listenTo( view, 'execute', () => {
                this.isOn = !this.isOn;
                this._toggleLinter(command, editor, view)
            } );

            this.listenTo( this.editor.model.document.selection, 'change:range', ( evt, { directChange } ) => {
                if(this.isOn) {
                    editor.execute('linter');
                }
            });

            return view;
        } );
    }

    _toggleLinter(command, editor, view) {
        view.set( 'isOn', this.isOn );
        command.set( 'isOn', this.isOn );
    }
}
