/**
 * Developer: Stepan Burguchev
 * Date: 8/17/2015
 * Copyright: 2009-2015 Comindware®
 *       All Rights Reserved
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Comindware
 *       The copyright notice above does not evidence any
 *       actual or intended publication of such source code.
 */

/* global define, require, Handlebars, Backbone, Marionette, $, _, Localizer */

define([
    'comindware/core',
    'text!../templates/listSearchCanvas.html'
], function (core, template) {
    'use strict';
    return Marionette.LayoutView.extend({
        initialize: function () {
        },

        template: Handlebars.compile(template),

        regions: {
            searchRegion: '.js-search-region',
            contentRegion: '.js-content-region',
            scrollbarRegion: '.js-scrollbar-region'
        },

        className: 'dev-demo-core__list-canvas__view_search',

        onShow: function () {
            this.contentRegion.show(this.options.content);
            this.scrollbarRegion.show(this.options.scrollbar);
            this.searchRegion.show(this.options.search);
        }
    });
});
