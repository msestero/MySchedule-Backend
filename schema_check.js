

function check_task_put(obj) {
    if (!obj.hasOwnProperty('UserName')){
        return false;
    }
    if (!obj.hasOwnProperty('TaskName')){
        return false;
    }
    if (!obj.hasOwnProperty('Description')){
        return false;
    }
    if (!obj.hasOwnProperty('RepeatDays')){
        return false;
    }
    if (!obj.hasOwnProperty('UniqueDays')){
        return false;
    }
    if (!obj.hasOwnProperty('Completions')){
        return false;
    }

    return true;
}

function check_task_patch(obj) {
    if (!obj.hasOwnProperty('filter')){
        return false;
    }
    if (!obj.hasOwnProperty('update')){
        return false;
    }
    return check_task_put(obj.update);
}

module.exports = { check_task_put, check_task_patch };