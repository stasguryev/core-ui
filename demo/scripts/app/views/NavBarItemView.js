/**
 * Developer: Stepan Burguchev
 * Date: 6/7/2016
 * Copyright: 2009-2016 Comindware®
 *       All Rights Reserved
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Comindware
 *       The copyright notice above does not evidence any
 *       actual or intended publication of such source code.
 */

/* global define, require, Handlebars, Backbone, Marionette, $, _, Localizer */

define([
    'comindware/core',
    'text!../templates/navBarItem.html'
], function (core, template) {
    'use strict';
    return Marionette.ItemView.extend({
        className: function () {
            var result = 'demo-nav__i demo-nav__i_' + this.model.id;
            if (this.model.get('selected')) {
                result += ' demo-nav__i_selected';
            }
            return result;
        },

        template: Handlebars.compile(template)
    });
});
