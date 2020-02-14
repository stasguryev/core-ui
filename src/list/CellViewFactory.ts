import { objectPropertyTypes, contextIconType } from '../Meta';
import { Column } from './types/types';
import { dateHelpers } from 'utils';
import UserService from 'services/UserService';
import ExtensionIconService from '../form/editors/impl/document/services/ExtensionIconService';
import DateTimeService from '../form/editors/services/DateTimeService';
import CellFieldView from './views/CellFieldView';
import getIconPrefixer from '../utils/handlebars/getIconPrefixer';
import compositeDocumentCell from './templates/compositeDocumentCell.html';
import compositeUserCell from './templates/compositeUserCell.html';
import compositeReferenceCell from './templates/compositeReferenceCell.html';

const compiledCompositeDocumentCell = Handlebars.compile(compositeDocumentCell);
const compiledCompositeReferenceCell = Handlebars.compile(compositeReferenceCell);
const compiledCompositeUserCell = Handlebars.compile(compositeUserCell);
const compiledStringValueCell = Handlebars.compile('{{{value}}}');
const compiledValueCell = Handlebars.compile('{{value}}');

const getWrappedTemplate = (template: string) => {
    return `<div class="composite-cell__wrp">
        ${template}
        <span class="composite-cell__count">+{{count}}</div>
    </div>`;
};

const compiledWrappedCompositeDocumentCell = Handlebars.compile(getWrappedTemplate(compositeDocumentCell));
const compiledWrappedCompositeReferenceCell = Handlebars.compile(getWrappedTemplate(compositeReferenceCell));
const compiledWrappedCompositeUserCell = Handlebars.compile(getWrappedTemplate(compositeUserCell));
const compiledWrappedStringValueCell = Handlebars.compile(getWrappedTemplate('{{{value}}}'));
const compiledWrappedValueCell = Handlebars.compile(getWrappedTemplate('{{value}}'));


let factory;

type MultivalueCellOptions = {
     childTemplate: HandlebarsTemplateDelegate<any>,
     wrappedTemplate: HandlebarsTemplateDelegate<any>,
     values: Array<any>,
     title: string, column: Column
};

type ValueFormatOption = {
    value: any,
    column: Column
};

export default factory = {
    getCellViewForColumn(column: Column, model: Backbone.Model) {
        if (column.editable) {
            return CellFieldView;
        }

        return this.getCell(column, model);
    },

    getCell(column: Column, model: Backbone.Model) {
        const value = model.get(column.key);

        if (this.__isEmpty(value) || column.getHidden?.(model)) {
            return `<td class="${this.__getCellClass(column, model)}"></td>`;
        }

        let values = Array.isArray(value) ? value : [value];

        switch (column.dataType || column.type) {
            case objectPropertyTypes.EXTENDED_STRING:
                return this.__createContextString({ values, column, model });
            case objectPropertyTypes.INSTANCE:
                return this.__getReferenceCell({ values, column, model });
            case objectPropertyTypes.ACCOUNT:
                return this.__getUserCell({ values, column, model });
            case objectPropertyTypes.ENUM:
                values = value ? value.valueExplained : '';
                return `<td class="${this.__getCellClass(column, model)}" title="${this.__getTitle({ values, column, model })}">${values}</td>`;
            case objectPropertyTypes.INTEGER:
            case objectPropertyTypes.DOUBLE:
            case objectPropertyTypes.DECIMAL:
                return this.__getNumberCell({ values, column, model });
            case objectPropertyTypes.DURATION:
                return this.__getDurationCell({ values, column, model });
            case objectPropertyTypes.BOOLEAN:
                return this.__getBooleanCell(values, column, model);
            case objectPropertyTypes.DATETIME:
                return this.__getDateTimeCell({ values, column, model });
            case objectPropertyTypes.DOCUMENT:
                return this.__getDocumentCell({ values, column, model });
            case objectPropertyTypes.STRING:
            default:
                return this.__getStringCell({ values, column, model });
        }
    },

    tryGetMultiValueCellPanel(column: Column, model: Backbone.Model, cellElement: Element) {
        let value = model.get(column.key);

        if (value === null || value === undefined || !Array.isArray(value) ||  value.length < 2) {
            return null;
        }
        value = value.slice(1);
        let template;
        let formattedValues;
        switch (column.dataType || column.type) {
            case objectPropertyTypes.INSTANCE:
                template = compiledCompositeReferenceCell;
                formattedValues = value.map(v => this.__getFormattedReferenceValue({ value: v, column }));
                break;
            case objectPropertyTypes.ACCOUNT:
                template = compiledCompositeUserCell;
                formattedValues = value.map(v => this.__getFormattedUserValue({ value: v, column }));
                break;
            case objectPropertyTypes.INTEGER:
            case objectPropertyTypes.DOUBLE:
            case objectPropertyTypes.DECIMAL:
                template = compiledValueCell;
                formattedValues = value.map(v => ({ value: this.__getFormattedNumberValue({ value: v, column }) }));
                break;
            case objectPropertyTypes.DURATION:
                template = compiledValueCell;
                formattedValues = value.map(v => ({ value: this.__getFormattedDurationValue({ value: v, column }) }));
                break;
            case objectPropertyTypes.DATETIME:
                template = compiledValueCell;
                formattedValues = value.map(v => ({ value: this.__getFormattedDateTimeValue({ value: v, column }) }));
                break;
            case objectPropertyTypes.DOCUMENT:
                template = compiledCompositeDocumentCell;
                formattedValues = value.map(v => this.__getFormattedDocumentValue({ value: v, column }));
                break;
            case objectPropertyTypes.BOOLEAN:
                return null;
            case objectPropertyTypes.STRING:
            default:
                template = compiledStringValueCell;
                formattedValues = value.map(v => ({ value }));
                break;
        }
        const panelViewOptions = {
            collection: new Backbone.Collection(formattedValues),
            className: 'grid-composite_panel',
            childView: Marionette.View,
            childViewOptions: {
                tagName: 'div',
                className: 'composite-cell_container',
                template
            }
        };
        const menu = Core.dropdown.factory.createDropdown({
            class: 'grid_composite-cell dropdown_root',
            buttonView: Marionette.View,
            panelView: Marionette.CollectionView,
            panelViewOptions,
            element: cellElement
        });
        return menu;
    },

    __getFormattedNumberValue({ value, column }: ValueFormatOption) {
        if (value == null) {
            return '';
        }
        if (column.formatOptions) {
            if (column.formatOptions.intlOptions) {
                return new Intl.NumberFormat(Localizer.langCode, column.formatOptions.intlOptions).format(value);
            } else if (column.formatOptions.allowFloat === false) {
                return Math.floor(value);
            }
        }
        return value;
    },

    __getFormattedDateTimeValue({ value, column }: ValueFormatOption) {
        if (column.formatOptions) {
            const dateDisplayValue = column.formatOptions.dateDisplayFormat ? DateTimeService.getDateDisplayValue(value, column.formatOptions.dateDisplayFormat) : '';
            const timeDisplayValue = column.formatOptions.timeDisplayFormat ? DateTimeService.getTimeDisplayValue(value, column.formatOptions.timeDisplayFormat) : '';
            return `${dateDisplayValue} ${timeDisplayValue}`;
        }
        return dateHelpers.dateToDateTimeString(value, 'generalDateShortTime');
    },

    __getFormattedDurationValue({ value, column }: ValueFormatOption) {
        const defaultOptions = {
            allowDays: true,
            allowHours: true,
            allowMinutes: true,
            allowSeconds: true
        };
        const options = Object.assign(defaultOptions, _.pick(column.formatOptions || {}, Object.keys(defaultOptions)));
        let result = '';
        if (value === 0) {
            return '0';
        }
        if (!value) {
            return '';
        }
        let totalMilliseconds = moment.duration(value).asMilliseconds();

        if (options.allowDays) {
            result += `${Math.floor(totalMilliseconds / (1000 * 60 * 60 * 24)) + Localizer.get('CORE.FORM.EDITORS.DURATION.WORKDURATION.DAYS')} `;
            totalMilliseconds %= 1000 * 60 * 60 * 24;
        }
        if (options.allowHours) {
            result += `${Math.floor(totalMilliseconds / (1000 * 60 * 60)) + Localizer.get('CORE.FORM.EDITORS.DURATION.WORKDURATION.HOURS')} `;
            totalMilliseconds %= 1000 * 60 * 60;
        }
        if (options.allowMinutes) {
            result += `${Math.floor(totalMilliseconds / (1000 * 60)) + Localizer.get('CORE.FORM.EDITORS.DURATION.WORKDURATION.MINUTES')} `;
            totalMilliseconds %= 1000 * 60;
        }
        if (options.allowSeconds) {
            result += `${Math.floor(totalMilliseconds / 1000) + Localizer.get('CORE.FORM.EDITORS.DURATION.WORKDURATION.SECONDS')} `;
            totalMilliseconds %= 1000;
        }
        return result;
    },
    
    __getFormattedBooleanValue({ value, column, model }: ValueFormatOption) {
        // if (value === true) {
        //     result = '<svg class="svg-grid-icons svg-icons_flag-yes"><use xlink:href="#icon-checked"></use></svg>';
        // } else if (value === false) {
        //     result = '<svg class="svg-grid-icons svg-icons_flag-none"><use xlink:href="#icon-remove"></use></svg>';
        // }
        const trueIcon = '<i class="fas fa-check icon-true"></i>';
        if (!column.editable || column.getReadonly?.(model)) {
            if (value === true) {
                return trueIcon;
            } else if (value === false) {
                return '<i class="fas fa-times icon-false"></i>';
            }
            return '';
        }
        const innerHTML = value === true ? trueIcon : '';
        return `<div class="checkbox js-checbox">${innerHTML}</div>`;
    },
    
    __getFormattedReferenceValue({ value, column }: ValueFormatOption) {
        const result = {
            text: value.name,
            ...value
        };
        if (!value.url && typeof column.createValueUrl === 'function') {
            result.url = column.createValueUrl({ value, column });
        }

        return result;
    },
    
    __getFormattedDocumentValue({ value }: ValueFormatOption) {
        const { name, text, isLoading, extension } = value;
        value.icon = ExtensionIconService.getIconForDocument({ isLoading, extension });
        value.name = name || text;
        return {
            icon: ExtensionIconService.getIconForDocument({ isLoading, extension }),
            name: value.text,
            ...value
        };
    },
    
    __getFormattedUserValue({ value }: ValueFormatOption) {        
        return {
            avatar: UserService.getAvatar(value),
            ...value
        };
    },

    __getStringCell({ values, column, model }) {
        const title = this.__getTitle({ values, column, model });
        let cellInnerHTML;
        if (values.length === 1) {
            cellInnerHTML = values[0] || '';
        } else {
            cellInnerHTML = compiledWrappedStringValueCell({ value: values[0], count: values.length - 1} );
        }
        return `<td class="${this.__getCellClass(column, model)}" title="${title}" tabindex="-1">${cellInnerHTML}</td>`;
    },

    __getNumberCell({ values, column, model }) {
        const mappedValues = values.map(value => this.__getFormattedNumberValue({ value, column }));

        const title = this.__getTitle({ column, model, values: mappedValues });

        let cellInnerHTML;
        if (values.length === 1) {
            cellInnerHTML = mappedValues[0];
        } else {
            cellInnerHTML = compiledWrappedValueCell({ value: mappedValues[0], count: values.length - 1 });
        }
        return `<td class="${this.__getCellClass(column, model)} " title="${title}" tabindex="-1">${cellInnerHTML}</td>`;
    },

    __getDateTimeCell({ values, column, model }) {
        const mappedValues = values.map(value => this.__getFormattedDateTimeValue({ value, column }));

        const title = this.__getTitle({ column, model, values: mappedValues });

        let cellInnerHTML;
        if (values.length === 1) {
            cellInnerHTML = mappedValues[0];
        } else {
            cellInnerHTML = compiledWrappedValueCell({ value: mappedValues[0], count: values.length - 1 });
        }
        return `<td class="${this.__getCellClass(column, model)} " title="${title}" tabindex="-1">${cellInnerHTML}</td>`;
    },

    __getDurationCell({ values, column, model }) {
        const mappedValues = values.map(value => this.__getFormattedDurationValue({ value, column }));

        const title = this.__getTitle({ column, model, values: mappedValues });

        let cellInnerHTML;
        if (values.length === 1) {
            cellInnerHTML = mappedValues[0];
        } else {
            cellInnerHTML = compiledWrappedValueCell({ value: mappedValues[0], count: values.length - 1 });
        }
        return `<td class="${this.__getCellClass(column, model)} " title="${title}" tabindex="-1">${cellInnerHTML}</td>`;
    },

    __getBooleanCell(values, column: Column, model: Backbone.Model) {
        const mappedValues = values.map(value => this.__getFormattedBooleanValue({ value, column, model }));

        return `<td class="${this.__getCellClass(column, model)}" tabindex="-1">${mappedValues.join('')}</td>`;
    },

    __getReferenceCell({ values, column, model }) {
        const mappedValues = values.map(value => this.__getFormattedReferenceValue({ value, column }));

        const title = this.__getTitle({ column, model, values: mappedValues.map(v => v.text) });

        let cellInnerHTML;
        if (mappedValues.length === 1) {
            cellInnerHTML = compiledCompositeReferenceCell(mappedValues[0]);
        } else {
            cellInnerHTML = compiledWrappedCompositeReferenceCell({ ...mappedValues[0], count: values.length - 1 });
        }
        return `<td class="${this.__getCellClass(column, model)} " title="${title}" tabindex="-1">${cellInnerHTML}</td>`;
    },

    __getDocumentCell({ values, column, model }) {
        const mappedValues = values.map(value => this.__getFormattedDocumentValue({ value, column }));

        const title = this.__getTitle({ column, model, values: mappedValues.map(v => v.name) });

        let cellInnerHTML;
        if (mappedValues.length === 1) {
            cellInnerHTML = compiledCompositeDocumentCell(mappedValues[0]);
        } else {
            cellInnerHTML = compiledWrappedCompositeDocumentCell({ ...mappedValues[0], count: values.length - 1 });
        }
        return `<td class="${this.__getCellClass(column, model)} " title="${title}" tabindex="-1">${cellInnerHTML}</td>`;
    },

    __getUserCell({ values, column, model }) {
        const mappedValues = values.map(value => this.__getFormattedUserValue({ value, column }));

        const title = this.__getTitle({ column, model, values: mappedValues.map(v => v.name) });

        let cellInnerHTML;
        if (mappedValues.length === 1) {
            cellInnerHTML = compiledCompositeUserCell(mappedValues[0]);
        } else {
            cellInnerHTML = compiledWrappedCompositeUserCell({ ...mappedValues[0], count: values.length - 1 });
        }
        return `<td class="${this.__getCellClass(column, model)} " title="${title}" tabindex="-1">${cellInnerHTML}</td>`;
    },

    __getMultivalueCellView({ childTemplate, wrappedTemplate, values = [], title, column }: MultivalueCellOptions): String {
        const buttonViewData = {
            count: values.length - 1
        };

        if (typeof values[0] === 'object') {
            Object.assign(buttonViewData, values[0]);
        } else {
            buttonViewData.value = values[0];
        }
        return `<td class="${this.__getCellClass(column, model)}" title="${title}" tabindex="-1">${wrappedTemplate(buttonViewData)}</td>`;
    },

    __createContextString({ values, column, model }) {
        const type = contextIconType[model.get('type').toLocaleLowerCase()];
        const getIcon = getIconPrefixer(type);
        return `
            <td class="js-extend_cell_content extend_cell_content ${model.get('isDisabled') ? 'archiveTemplate' : ''}" title="${this.__getTitle({ values, column, model })}">
            <i class="${getIcon(type)} context-icon" aria-hidden="true"></i>
            <div class="extend_cell_text">
                <span class="extend_cell_header">${values.join(', ')}</span>
                <span class="extend_info">${model.get('alias') || ''}</span>
            </div>
            </td>`;
    },

    __getTitle({ values, column, model }) {
        let title;
        if (column.format === 'HTML') {
            title = '';
        } else if (column.titleAttribute) {
            title = model.get(column.titleAttribute);
        } else {
            title = Array.isArray(values) ? values.join(', ') : values;
        }
        title = title !== null && title !== undefined ? title.toString().replace(/"/g, '&quot;') : '';
        return title;
    },

    __getCellClass(column: Column, model: Backbone.Model) {
        return `cell ${column.customClass ? column.customClass : ''}
         ${(column.required || column.getRequired?.(model))  && this.__isEmpty(model.get(column.key)) ? 'required' : ''}
         ${column.hasErrors?.(model) ? 'error' : ''}        
        `;
    },

    __isEmpty(value: any): boolean {
        return value === null || value === undefined || (Array.isArray(value) && value.length === 0);
    }
};
