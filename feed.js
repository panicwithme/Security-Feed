const urls = {
    'Wired Security'                  : 'https://www.wired.com/feed/category/security/latest/rss',
    'TheHackerNews'                   : 'http://feeds.feedburner.com/TheHackersNews?format=xml',
    'Dark Reading'                    : 'https://www.darkreading.com/rss_simple.asp',
    'KrebsonSecurity'                 : 'https://krebsonsecurity.com/feed',
    'ThreatPost'                      : 'https://threatpost.com/feed',
    'National Vulnerability Database' : 'https://nvd.nist.gov/feeds/xml/cve/misc/nvd-rss-analyzed.xml',
    'Schneier on Security'            : 'https://www.schneier.com:443/blog/atom.xml',
};

const renderFeeds = (feeds) => {

    const textarea = document.querySelector('#feed-area > ol');
    textarea.value = '';
    document.querySelector('.primary-heading').style.display = 'none';
    
    feeds.forEach(feed => {
        
        const date = new Date(feed.date_ms).toLocaleString(),
        
        li = createEl('li', "list-group-item d-flex justify-content-between align-items-start"),
        divOuter = createEl('div', "ms-2 me-auto"),
        divInner = createEl('div', "fw-bold", `<a href="${feed.link}">${feed.title.slice(0,150)}</a>`),
        divInner2 = createEl('div', '', ''),
        span_source = createEl('span', "badge bg-secondary rounded-pill", `<i class="bi bi-newspaper"></i>  `+feed.source),
        paragraph = createEl('p', '', feed.description.slice(0,300)),
        span = createEl('span', "badge bg-dark rounded-pill", `<i class="bi bi-calendar4-event">  </i>`+date);

        divInner2.appendChild(span_source);
        divOuter.appendChild(divInner);
        divOuter.appendChild(divInner2);
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
                const month = new Date(feed.date_ms).getMonth();
                const year = new Date(feed.date_ms).getFullYear();
                const current_month = new Date().getMonth();
                const current_year = new Date().getFullYear();
                if (month == current_month && year == current_year) {
                    feed.source = el;
                    feeds.push(feed);
                }
            });
        } catch(err) { continue; }

    feeds.sort(sortByDate);
    renderFeeds(feeds);

})(urls);
