
tinymce.init({
    selector: 'textarea#content-text',
    content_css: '//www.tiny.cloud/css/codepen.min.css',
    save_onsavecallback: 'save',
    selector: '#content-text',
    plugins: 'save image',
    menubar: true,
    toolbar:
        ['save undo redo | styleselect | bold italic | link image | alignleft aligncenter alignright', 'customInsertButton customDateButton'],
    // toolbar:
    //     'customInsertButton customDateButton | save | undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | increaseindent',
    save_onsavecallback: 'save',

    setup: function (editor) {

        editor.ui.registry.addButton('customInsertButton', {
            text: 'My Button',
            onAction: function (_) {
                editor.insertContent('&nbsp;<strong>It\'s my button!</strong>&nbsp;');
            }
        });

        var toTimeHtml = function (date) {
            return '<time datetime="' + date.toString() + '">' + date.toDateString() + '</time>';
        };

        editor.ui.registry.addButton('customDateButton', {
            icon: 'insert-time',
            tooltip: 'Insert Current Date',
            disabled: true,
            onAction: function (_) {
                editor.insertContent(toTimeHtml(new Date()));
            },
            onSetup: function (buttonApi) {
                var editorEventCallback = function (eventApi) {
                    buttonApi.setDisabled(eventApi.element.nodeName.toLowerCase() === 'time');
                };
                editor.on('NodeChange', editorEventCallback);

                /* onSetup should always return the unbind handlers */
                return function (buttonApi) {
                    editor.off('NodeChange', editorEventCallback);
                };
            }
        });
    }
});

// (B) SAVE FUNCTION
function save(editor) {
    console.log(editor.getContent());
    document.getElementById('html-display').innerHTML = editor.getContent();
    document.getElementById('html-string').innerText = editor.getContent();
}