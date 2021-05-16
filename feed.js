const urls = {
    'Wired Security'  : 'https://www.wired.com/feed/category/security/latest/rss',
    'TheHackerNews'   : 'http://feeds.feedburner.com/TheHackersNews?format=xml',
    'Dark Reading'    : 'https://www.darkreading.com/rss_simple.asp',
    'KrebsonSecurity' : 'https://krebsonsecurity.com/feed',
    'ThreatPost'      : 'https://threatpost.com/feed',
};

const renderFeeds = (feeds) => {
    const textarea = document.querySelector('#feed-area > ol');
    textarea.value = '';
    document.querySelector('.primary-heading').style.display = 'none';
    feeds.forEach(feed => {
        const date = new Date(feed.date_ms).toLocaleString(),
        li = createEl('li', "list-group-item d-flex justify-content-between align-items-start"),
        divOuter = createEl('div', "ms-2 me-auto"),
        divInner = createEl('div', "fw-bold", `<a href="${feed.link}">${feed.title}</a>`),
        paragraph = createEl('p', '', feed.source),
        span = createEl('span', "badge bg-dark rounded-pill", date);

        divOuter.appendChild(divInner);
        divOuter.appendChild(paragraph);
        li.appendChild(divOuter);
        li.appendChild(span);
        textarea.appendChild(li);
    });
}

const createEl = (el, className, innerHTML) => {
    let ret = document.createElement(el);
    ret.className = className ? className : '';
    ret.innerHTML = innerHTML ? innerHTML : '';
    return ret;
};

const sortByDate = (a, b) => {
    if(a.date_ms > b.date_ms) return -1;
    else if(a.date_ms == b.date_ms) return 0;
    else return 1;
};

(async (urls) => {
    let feeds = [];
    for(el in urls)
        try {
            (await feednami.load(urls[el])).entries.forEach(feed => {
                feed.source = el;
                feeds.push(feed);
            });
        } catch(err) { continue; }

    feeds.sort(sortByDate);
    renderFeeds(feeds);
})(urls);