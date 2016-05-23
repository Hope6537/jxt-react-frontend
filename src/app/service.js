/**
 * Created by hope6537 on 16/5/20.
 */
var Service = {
    host: 'http://ding.hope6537.com:8080',

    fetchStudent: "/student/fetch",

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
    postPlanRich: '/plan/post/rich',
    putPlan: "/plan/put",

    fetchClasses: "/classes/fetch",

    putJoin: "/join/put",
    postJoin: "/join/post",
    fetchJoin: "/join/fetch",

    getNotice: "/notice/get",
    getNoticeRich: "/notice/get/rich",
    fetchNotice: '/notice/fetch',
    fetchNoticeRich: '/notice/fetch/rich',
    postNotice: '/notice/post',
    postNoticeRich: '/notice/post/rich',
    putNotice: '/notice/put',

    fetchFeedBack: "/feedback/fetch",
    postFeedBack: "/feedback/post",

    fetchRequire: "/require/fetch",
    fetchRequireRich: "/require/fetch/rich",
    fetchRequireRichByTeacherId: '/require/fetch/rich/teacher',
    getRequire: '/require/get',
    putRequire: '/require/put',
    postRequire: '/require/post',
    deleteRequire: '/require/delete'
};

module.exports = Service;