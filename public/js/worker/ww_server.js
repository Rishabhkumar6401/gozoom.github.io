importScripts("workerFakeDOM.js");
importScripts("jquery-2.1.4.min.js");
var xhr_array = {};
var abort_xhrs = [];
var task_arr = {};
onmessage = function(e) {
    var taskName = e.data[0];
    var options = e.data[1];
    var taskId = e.data[2];
    dynamicAjaxRequest(options, taskName, taskId);
    delete taskName;
    delete options;
    delete taskId;
}

function dynamicAjaxRequest(options, taskName, taskId) {
    switch (taskName) {
        case 'svg':
            var current_id = options.current_id;
            break;
        default:
            var current_id = taskName;
            break;
    }
    if ($.inArray(taskName, abort_xhrs) != -1) {
        if (xhr_array[current_id] && xhr_array[current_id].readyState !== 4) {
            postMessage([taskName, '', task_arr[current_id], 'abort']);
            xhr_array[current_id].abort();
        }
    }
    let dataType = 'json';
    if (taskName == 'get_section_data') {
        dataType = 'html';
    } else if (taskName == 'svg') {
        dataType = 'html';
    }
    task_arr[current_id] = taskId;
    if (taskName == 'get_section_data') {
        xhr_array[current_id] = fetch(options.url).then(function(response) {
            return response.text();
        }).then(function(html) {
            xhr_array[current_id] = null;
            task_arr[current_id] = null;
            postMessage([taskName, html, taskId]);
            delete options;
            delete taskName;
            delete taskId;
        }).catch(function(err) {
            console.warn('Something went wrong.', err);
        });
    } else {
        xhr_array[current_id] = $.ajax({
            type: options.type,
            dataType: dataType,
            url: options.url,
            data: options.params,
            success: function(response) {
                xhr_array[current_id] = null;
                task_arr[current_id] = null;
                postMessage([taskName, response, taskId]);
            },
            async: true
        }).done(function() {
            delete options;
            delete taskName;
            delete taskId;
        });
    }
}