import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import LinterUI from './linterui';
import LinterEditing from './linterediting';

import './css/style.css';

export default class Ckeditor5LinterPlugin extends Plugin {

    static get pluginName() {
        return 'linter'
    }

    /**
     * @inheritDoc
     */
    static get requires() {
        return [ LinterEditing, LinterUI ];
    }
}
