/**
 * Created by hope6537 on 16/5/20.
 */
var Service = {
    host: 'http://localhost:8080',
    getEvent: '/event/get',

    fetchEvent: '/event/fetch',
    fetchEventGroupByStudent: '/event/fetch/group/student',
    fetchFullEvent: "/event/fetch/full",
    postEvent: '/event/post',
    putEvent: '/event/put',
    fetchEventClassesId: '/publish/fetch/classesIdList',

    fetchPublish: '/publish/fetch',
    postPublish: '/publish/put',
    batchPostPublish: '/publish/batchPost',

    fetchMeal: '/meal/fetch',
    postMeal: '/meal/post',
    putMeal: '/meal/put',

    fetchPlan: '/plan/fetch',
    postPlan: "/plan/post",
    putPlan: "/plan/put",

    fetchClasses: "/classes/fetch",

    putJoin: "/join/put",
    postJoin: "/join/post",
    fetchJoin: "/join/fetch"
};

module.exports = Service;