const pages = ['home', 'platform', 'edit_platform', 'new_platform_stats', 'post', 'edit_post', 'new_post_stats'];
const views = {};

pages.forEach(p => {
    const page = require(`./${p}`);
    const entries = Object.entries(page);
    entries.forEach(([key, value]) => {
        views[`${p}_${key}`] = value;
    });
});

module.exports = views;