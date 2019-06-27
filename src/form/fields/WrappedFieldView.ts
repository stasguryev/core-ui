import FieldView from './FieldView';

export default class extends FieldView {
    constructor(options) {
        super(options);
    }

    getEditorConstructor(options, editorOptions) {
        const { template, schema } = options;
        const EditorConstructor = super.getEditorConstructor(options);
        const editorTemplateContext = EditorConstructor.prototype.templateContext;
        const editorHTML = function(opt) {
            return EditorConstructor.prototype.template(editorTemplateContext ? editorTemplateContext.call(this, opt) : opt);
        };
        const WrappedEditorConstructor = EditorConstructor.extend({
            template: Handlebars.compile(template),
            templateContext() {
                return { editorHTML: editorHTML.call(this, editorOptions), ...schema };
            }
        });

        return WrappedEditorConstructor;
    }
}
