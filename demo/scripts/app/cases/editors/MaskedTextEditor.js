﻿define(['comindware/core', 'demoPage/views/EditorCanvasView'], function(core, EditorCanvasView) {
    'use strict';
    return function() {
        var model = new Backbone.Model({
            textValue: 'FAX7'
        });

        return new EditorCanvasView({
            editor: new core.form.editors.TextEditor({
                model: model,
                key: 'textValue',
                changeMode: 'keydown',
                autocommit: true,
                mask: 'aa*: +9(999)999-9999',
                maskPlaceholder: '_'
            }),
            presentation: "{{#isNull textValue}}null{{else}}'{{textValue}}'{{/isNull}}"
        });
    };
});
