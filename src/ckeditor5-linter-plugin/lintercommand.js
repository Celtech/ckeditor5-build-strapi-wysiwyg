import Command from '@ckeditor/ckeditor5-core/src/command';
import { updateFindResultFromRange, findByTextCallback } from './utils';
import LinterState from "./linterstate";

/**
 * @extends module:core/command~Command
 */
export default class LinterCommand extends Command {
    constructor( editor ) {
        super( editor );

        // The find command is always enabled.
        this.isEnabled = true;

        // It does not affect data so should be enabled in read-only mode.
        this.affectsData = false;

        this._state = new LinterState( editor.model );
    }

    /**
     * @inheritDoc
     */
    execute( options = {} ) {
        console.log('yeet')

        let callbackOrText = "testing";
        let matchCase = true;
        let wholeWords = false;

        const { editor } = this;
        const { model } = editor;

        let findCallback;

        // Allow to execute `find()` on a plugin with a keyword only.
        findCallback = findByTextCallback(callbackOrText, {matchCase, wholeWords});
        this._state.searchText = callbackOrText;

        // Initial search is done on all nodes in all roots inside the content.
        const results = model.document.getRootNames()
            .reduce( ( ( currentResults, rootName ) => updateFindResultFromRange(
                model.createRangeIn( model.document.getRoot( rootName ) ),
                model,
                findCallback,
                currentResults
            ) ), null );

        this._state.clear( model );
        this._state.results.addMany( Array.from( results ) );
        this._state.highlightedResult = results.get( 0 );

        if ( typeof callbackOrText === 'string' ) {
            this._state.searchText = callbackOrText;
        }

        this._state.matchCase = !!matchCase;
        this._state.matchWholeWords = !!wholeWords;

        console.log(results)

        return {
            results,
            findCallback
        };
    }
}
