ww_client = {
    section_worker: null, prop_save_worker: null, current_variables: {}, init: function () { var that = this; delete that; }, createWorker: function () {
        var that = this; var webWorkerObj = null; if (typeof (Worker) !== "undefined") { webWorkerObj = new Worker(site_url + "/www.hiddenbrains.com/public/js/worker/ww_server.js"); webWorkerObj.onmessage = function (event) { that.getResponse(event); }; webWorkerObj.onerror = function (error) { that.onerror(error); }; }
        delete that; return webWorkerObj;
    }, getResponse: function (event) {
        var that = this; var data = event.data; var task_id = data[2]; var response = data[1]; if (typeof (that.current_variables[task_id]) == 'undefined') { return; }
        var args = that.current_variables[task_id]; var funcObj = args.callback; if (data[3] != 'abort') { that.CallDynamicfunc(funcObj, response, args); }
        delete that.current_variables[task_id]; delete data; delete response; delete args; delete that; delete event;
    }, sendTask: function (task_name, options, args) {
        var that = this; var task_id = task_name + '#' + new Date().getTime(); that.current_variables[task_id] = args; var current_worker; var current_worker_index; switch (task_name) {
            case 'svg': if (that.svg_worker == null) { that.svg_worker = that.createWorker(); }
                current_worker = that.svg_worker; current_worker_index = 1; break; case 'get_section_data': if (that.section_worker == null) { that.section_worker = that.createWorker(); }
                current_worker = that.section_worker; current_worker_index = 2; break;
        }
        current_worker.postMessage([task_name, options, task_id]); delete args; delete options; delete that;
    }, terminate: function () { var that = this; that.section_worker.terminate(); }, onerror: function (error) { console.log(error, "error"); }, CallDynamicfunc: function (funcObj, response, args) {
        if ((typeof funcObj === "string")) { funcObj = JSON.parse(funcObj); }
        if (typeof (funcObj) == 'undefined') { return false; }
        var funcName = funcObj['name']; if (window[funcName] != 'undefined' && typeof window[funcName] == 'function') { window[funcName](response, args); }
    }, flushGarbageValues: function () { setInterval(function (e) { var currenttimestamp = new Date().getTime(); if (!$.isEmptyObject(ww_client.current_variables)) { $.each(ww_client.current_variables, function (index, data) { var splitData = index.split('#'); var taskTimestamp = splitData[1]; if ((currenttimestamp - taskTimestamp) > 180000) { delete ww_client.current_variables[index]; console.log(index); } }) } }, 30000); }
}; ww_client.init();