/**
 * Filters are special bits of Code that can be used in templates to mutate data
 * These are global and can be used anywhere, put filters here that will be
 * used throughout the app, DO NOT put code here that is super special and will
 * only be used in one spot.. use your best judgement
 */
export default {
    install(Vue) {
        Vue.filter('formatDate', function (date) {
            if (date instanceof Date) {
                return date.toLocaleDateString();
            } else {
                var d = new Date(date);
                return d ? d.toLocaleDateString() : '';
            }
        });
    }
}

