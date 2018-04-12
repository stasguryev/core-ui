import core from 'coreApi';
import { initializeCore } from '../../utils/helpers';
import 'jasmine-jquery';

describe('Editors', () => {
    beforeEach(function () {
        this.rootRegion = initializeCore();
    });

    describe('MemberEditorView', () => {
        it('should initialize', function () {
            const model = new Backbone.Model({
                selected: []
            });

            const view = new core.form.editors.MembersSplitPanelEditor({
                model,
                key: 'selected',
                autocommit: true,
                users: Core.services.UserService.listUsers(),
                groups: new Backbone.Collection()
            });

            this.rootRegion.show(view);
            // assert
            expect(true).toBe(true);
        });
    });
});
