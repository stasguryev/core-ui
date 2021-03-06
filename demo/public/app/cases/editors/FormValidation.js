export default function() {
    // Step 1. Create model
    const model = new Backbone.Model({
        boolean: true,
        dropdown: 'id.2',
        membersBubble: [],
        memberSelect: null,
        number: 42,
        radioGroup: 'id.2',
        reference: null,
        textArea: 'Multiline text...\n...Rocks!',
        text: 'What a beautiful text',
        avatar: null,
        date: '2015-07-20T00:00:00Z',
        dateTime: '2015-07-20T10:46:37Z',
        duration: 'P14DT4H15M',
        mention: 'Type @ to get suggestions...',
        multiSelect: [],
        password: '',
        time: '2015-07-20T10:46:37Z'
    });

    // Step 2. Create form schema
    const formSchema = {
        boolean: {
            type: 'Boolean',
            title: 'Boolean',
            validators: ['required'],
            required: true // to display the asterisk left from title
        },
        dropdown: {
            type: 'Datalist',
            title: 'Dropdown',
            enabled: false,
            validators: ['required'],
            required: true, // to display the asterisk left from title
            collection: [{ id: 'id.1', text: 'Item 1' }, { id: 'id.2', text: 'Item 2' }]
        },
        membersBubble: {
            type: 'MembersBubble',
            title: 'MembersBubble',
            validators: ['required'],
            required: true // to display the asterisk left from title
        },
        memberSelect: {
            type: 'MemberSelect',
            title: 'MemberSelect',
            validators: ['required'],
            required: true // to display the asterisk left from title
        },
        number: {
            type: 'Number',
            title: 'Number',
            helpText: 'This text is really helpful',
            validators: ['required'],
            required: true // to display the asterisk left from title
        },
        radioGroup: {
            type: 'RadioGroup',
            title: 'RadioGroup',
            validators: ['required'],
            required: true, // to display the asterisk left from title
            radioOptions: [{ id: 'id.1', displayText: 'Option 1' }, { id: 'id.2', displayText: 'Option 2' }]
        },
        reference: {
            type: 'Datalist',
            title: 'Datalist',
            validators: ['required'],
            required: true, // to display the asterisk left from title
            controller: new Core.form.editors.reference.controllers.DemoReferenceEditorController()
        },
        textArea: {
            type: 'TextArea',
            title: 'TextArea',
            validators: ['required'],
            required: true // to display the asterisk left from title
        },
        text: {
            type: 'Text',
            title: 'Text',
            validators: ['required'],
            required: true // to display the asterisk left from title
        },
        avatar: {
            type: 'Avatar',
            title: 'Avatar',
            validators: ['required'],
            required: true, // to display the asterisk left from title
            fullName: 'Foo Bar',
            autoUpload: true,
            refreshPreviewAfterUpload: true,
            controller: new Core.form.editors.avatar.controllers.DemoAvatarEditorController({
                defaultURL: '/resources/images/defaultAvatar.png'
            })
        },
        date: {
            type: 'Date',
            title: 'Date',
            validators: ['required'],
            required: true // to display the asterisk left from title
        },
        dateTime: {
            type: 'DateTime',
            title: 'DateTime',
            validators: ['required'],
            required: true // to display the asterisk left from title
        },
        duration: {
            type: 'Duration',
            title: 'Duration',
            validators: ['required'],
            required: true // to display the asterisk left from title
        },
        mention: {
            type: 'Mention',
            title: 'Mention',
            validators: ['required'],
            required: true // to display the asterisk left from title
        },
        multiSelect: {
            type: 'MultiSelect',
            title: 'MultiSelect',
            validators: ['required'],
            required: true, // to display the asterisk left from title
            collection: [{ id: 'id.1', text: 'Item 1' }, { id: 'id.2', text: 'Item 2' }]
        },
        password: {
            type: 'Password',
            title: 'Password',
            validators: ['required'],
            required: true // to display the asterisk left from title
        },
        time: {
            type: 'Time',
            title: 'Time',
            validators: ['required'],
            required: true // to display the asterisk left from title
        }
    };

    // Step 3. Build form layout
    const view = new Core.layout.Form({
        model,
        schema: formSchema,
        content: new Core.layout.VerticalLayout({
            rows: [
                Core.layout.createFieldAnchor('boolean'),
                Core.layout.createFieldAnchor('dropdown'),
                Core.layout.createFieldAnchor('membersBubble'),
                Core.layout.createFieldAnchor('memberSelect'),
                Core.layout.createFieldAnchor('number'),
                Core.layout.createFieldAnchor('radioGroup'),
                Core.layout.createFieldAnchor('reference'),
                Core.layout.createFieldAnchor('textArea'),
                Core.layout.createFieldAnchor('text'),
                Core.layout.createFieldAnchor('avatar'),
                Core.layout.createFieldAnchor('date'),
                Core.layout.createFieldAnchor('dateTime'),
                Core.layout.createFieldAnchor('duration'),
                Core.layout.createFieldAnchor('mention'),
                Core.layout.createFieldAnchor('multiSelect'),
                Core.layout.createFieldAnchor('password'),
                Core.layout.createFieldAnchor('time'),
                new Core.layout.Button({
                    text: 'Validate',
                    handler() {
                        view.form.validate();
                    }
                })
            ]
        })
    });

    return view;
}
