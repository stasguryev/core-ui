/**
 * Developer: Stepan Burguchev
 * Date: 07/27/2015
 * Copyright: 2009-2015 Comindware®
 *       All Rights Reserved
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Comindware
 *       The copyright notice above does not evidence any
 *       actual or intended publication of such source code.
 */

/* global define, require, Handlebars, Backbone, Marionette, $, _ */

define([
    './cases/editors/TextEditor',
    'text!./cases/editors/TextEditor.js',

    './cases/editors/TextAreaEditor',
    'text!./cases/editors/TextAreaEditor.js',

    './cases/editors/BooleanEditor',
    'text!./cases/editors/BooleanEditor.js',

    './cases/editors/NumberEditor',
    'text!./cases/editors/NumberEditor.js',

    './cases/editors/DateEditor',
    'text!./cases/editors/DateEditor.js',

    './cases/editors/TimeEditor',
    'text!./cases/editors/TimeEditor.js',

    './cases/editors/DateTimeEditor',
    'text!./cases/editors/DateTimeEditor.js',

    './cases/editors/DurationEditor',
    'text!./cases/editors/DurationEditor.js',

    './cases/editors/DurationEditorWithPartialDisplay',
    'text!./cases/editors/DurationEditorWithPartialDisplay.js',

    './cases/editors/DropdownEditor',
    'text!./cases/editors/DropdownEditor.js',

    './cases/editors/ReferenceEditor',
    'text!./cases/editors/ReferenceEditor.js',

    './cases/editors/ReferenceEditorWithAddNewButton',
    'text!./cases/editors/ReferenceEditorWithAddNewButton.js',

    './cases/editors/RadioGroupEditor',
    'text!./cases/editors/RadioGroupEditor.js',

    './cases/editors/MemberSelectEditor',
    'text!./cases/editors/MemberSelectEditor.js',

    './cases/editors/MembersBubbleEditor',
    'text!./cases/editors/MembersBubbleEditor.js',

    './cases/editors/MentionEditor',
    'text!./cases/editors/MentionEditor.js',

    './cases/editors/MultiSelectEditor',
    'text!./cases/editors/MultiSelectEditor.js',

    './cases/editors/MaskedTextEditor',
    'text!./cases/editors/MaskedTextEditor.js',
    
    './cases/editors/AvatarEditor',
    'text!./cases/editors/AvatarEditor.js',

    './cases/editors/PasswordEditor',
    'text!./cases/editors/PasswordEditor.js',

    './cases/editors/Form',
    'text!./cases/editors/Form.js',

    './cases/editors/FormValidation',
    'text!./cases/editors/FormValidation.js',

    './cases/dropdown/actionMenu',
    'text!./cases/dropdown/actionMenu.js',

    './cases/dropdown/popoutCustomization',
    'text!./cases/dropdown/popoutCustomization.js',

    './cases/dropdown/popoutCustomAnchor',
    'text!./cases/dropdown/popoutCustomAnchor.js',

    './cases/dropdown/popoutDialog',
    'text!./cases/dropdown/popoutDialog.js',

    './cases/dropdown/dropdownCustomization',
    'text!./cases/dropdown/dropdownCustomization.js',

    './cases/dropdown/dropdownPanelPosition',
    'text!./cases/dropdown/dropdownPanelPosition.js',

    './cases/list/listBasicUsage',
    'text!./cases/list/listBasicUsage.js',

    './cases/list/listSearchHighlight',
    'text!./cases/list/listSearchHighlight.js',

    './cases/list/listGroupBy',
    'text!./cases/list/listGroupBy.js',

    './cases/list/grid',
    'text!./cases/list/grid.js',

    './cases/list/gridHeightAuto',
    'text!./cases/list/gridHeightAuto.js',

    './cases/list/gridSearchHighlight',
    'text!./cases/list/gridSearchHighlight.js',

    './cases/list/nativeGrid',
    'text!./cases/list/nativeGrid.js',

    './cases/other/splitPanel',
    'text!./cases/other/splitPanel.js',

    './cases/other/messageService',
    'text!./cases/other/messageService.js',

    './cases/other/windowsService',
    'text!./cases/other/windowsService.js',

    './cases/other/localizationService',
    'text!./cases/other/localizationService.js',

    './cases/other/loadingBehavior',
    'text!./cases/other/loadingBehavior.js'
], function () {
    "use strict";

    /**
     * Case path is gonna be like: core/demo/cases/{sectionId}/{groupId}/{caseId}.js
     */
    return {
        sections: [
            {
                id: 'editors',
                displayName: 'Editors',
                groups: [
                    {
                        id: 'TextEditor',
                        displayName: 'Text Editor'
                    },
                    {
                        id: 'TextAreaEditor',
                        displayName: 'Text Area Editor'
                    },
                    {
                        id: 'NumberEditor',
                        displayName: 'Number Editor'
                    },
                    {
                        id: 'BooleanEditor',
                        displayName: 'Boolean Editor'
                    },
                    {
                        id: 'DateEditor',
                        displayName: 'Date Editor'
                    },
                    {
                        id: 'DateTimeEditor',
                        displayName: 'DateTime Editor'
                    },
                    {
                        id: 'TimeEditor',
                        displayName: 'Time Editor'
                    },
                    {
                        id: 'DurationEditor',
                        displayName: 'Duration Editor'
                    },
                    {
                        id: 'DropdownEditor',
                        displayName: 'Dropdown Editor'
                    },
                    {
                        id: 'MultiSelectEditor',
                        displayName: 'MultiSelect Editor'
                    },
                    {
                        id: 'RadioGroupEditor',
                        displayName: 'Radio Group Editor'
                    },
                    {
                        id: 'PasswordEditor',
                        displayName: 'Password Editor'
                    },
                    {
                        id: 'MemberSelectEditor',
                        displayName: 'Member Select Editor'
                    },
                    {
                        id: 'MembersBubbleEditor',
                        displayName: 'Members Bubble Editor'
                    },
                    {
                        id: 'MentionEditor',
                        displayName: 'Mention Editor'
                    },
                    {
                        id: 'ReferenceEditor',
                        displayName: 'Reference Editor'
                    },
                    {
                        id: 'MaskedTextEditor',
                        displayName: 'Masked Text Editor'
                    },
                    {
                        id: 'AvatarEditor',
                        displayName: 'Avatar Editor'
                    },
                    {
                        id: 'DurationEditorWithPartialDisplay',
                        displayName: 'Duration Editor (partial display)'
                    },
                    {
                        id: 'ReferenceEditorWithAddNewButton',
                        displayName: 'Reference Editor (Add new button)'
                    },
                    {
                        id: 'Form',
                        displayName: 'Form'
                    },
                    {
                        id: 'FormValidation',
                        displayName: 'Form Validation (all editors)'
                    }
                ]
            },
            {
                id: 'dropdown',
                displayName: 'Dropdown & Popout',
                groups: [
                    {
                        id: 'actionMenu',
                        displayName: 'Action Menu',
                        description: 'Для создания простого меню с командами мы используем метод core.dropdown.factory.createMenu из фабрики дропдаунов.' +
                        '\r\n\r\n' +
                        'Метод возвращает обычный PopoutView, настроенный для отображения меню.'
                    },
                    {
                        id: 'popoutCustomization',
                        displayName: 'Popout (Custom Views)',
                        description: ''
                    },
                    {
                        id: 'popoutCustomAnchor',
                        displayName: 'Popout (Custom Anchor)',
                        description: ''
                    },
                    {
                        id: 'popoutDialog',
                        displayName: 'Popout (Dialog)',
                        description: ''
                    },
                    {
                        id: 'dropdownCustomization',
                        displayName: 'Dropdown (Customization)',
                        description: ''
                    },
                    {
                        id: 'dropdownPanelPosition',
                        displayName: 'Dropdown (Panel Position)',
                        description: ''
                    }
                ]
            },
            {
                id: 'list',
                displayName: 'List & Grid',
                groups: [
                    {
                        id: 'listBasicUsage',
                        displayName: 'List (Basic Usage)'
                    },
                    {
                        id: 'listSearchHighlight',
                        displayName: 'List (Search & Highlight)'
                    },
                    {
                        id: 'listGroupBy',
                        displayName: 'List (Group By)'
                    },
                    {
                        id: 'grid',
                        displayName: 'Grid'
                    },
                    {
                        id: 'gridHeightAuto',
                        displayName: 'Grid (Height: Auto)'
                    },
                    {
                        id: 'gridSearchHighlight',
                        displayName: 'Grid (Search & Highlight)'
                    },
                    {
                        id: 'nativeGrid',
                        displayName: 'Grid (With native scroll)'
                    }

                ]
            },
            {
                id: 'other',
                displayName: 'Other stuff',
                groups: [
                    {
                        id: 'splitPanel',
                        displayName: 'Split Panel',
                        description: 'Panels are resizable, drag the splitter!'
                    },
                    {
                        id: 'messageService',
                        displayName: 'Message Service'
                    },
                    {
                        id: 'windowsService',
                        displayName: 'Windows Service'
                    },
                    {
                        id: 'localizationService',
                        displayName: 'Localization Service'
                    },
                    {
                        id: 'loadingBehavior',
                        displayName: 'Loading Behavior'
                    }
                ]
            }
        ]
    };
});
