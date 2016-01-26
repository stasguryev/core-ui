/**
 * Developer: Alexander Makarov
 * Date: 14.07.2015
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
    'text!../templates/navigation.html'
], function (core, template) {
    'use strict';
    return Marionette.ItemView.extend({
        className: "demo-nav-wrapper",

        template: Handlebars.compile(template)
    });
});
