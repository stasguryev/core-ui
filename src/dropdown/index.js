import PopoutView from './views/PopoutView';
import DropdownView from './views/DropdownView';
import MenuPanelView from './views/MenuPanelView';
import CustomAnchorBehavior from './views/behaviors/CustomAnchorBehavior';
import factory from './factory';

export default /** @lends module:core.dropdown */ {
    /**
     * DropdownView, PopoutView and panel/button views useful in common cases.
     * @namespace
     * */
    views: {
        /**
         * Marionette Behavior which are required on panel/button views when some config options are enabled.
         * @namespace
         * */
        behaviors: {
            CustomAnchorBehavior
        },
        PopoutView,
        DropdownView,
        MenuPanelView
    },
    factory
};
