var urls = {
    'Wired Security'  : 'https://www.wired.com/feed/category/security/latest/rss',
    'TheHackerNews'   : 'http://feeds.feedburner.com/TheHackersNews?format=xml',
    'Dark Reading'    : 'https://www.darkreading.com/rss_simple.asp',
    'KrebsonSecurity' : 'https://krebsonsecurity.com/feed',
    'ThreatPost'      : 'https://threatpost.com/feed',
};

var entries = {};
const textarea = document.querySelector('#feed-area > ol');

function getEntries(source, url) {
    feednami.load(url)
        .then(feed => {

          for(let entry of feed.entries) {
            let entryLink = entry.link;
            let entryTitle = entry.title;
            let entryDate = new Date(entry.date_ms);
            entries[entryDate] = [entryTitle, entryLink, source];
          }

        });
}

function loadEntries(date, info) {

    let date = new Date(date);
    date = date.toLocaleString();

    let li = document.createElement('li');
    li.className = "list-group-item d-flex justify-content-between align-items-start";
    
    let divOuter = document.createElement('div');
    divOuter.className = "ms-2 me-auto";
    
    let divInner = document.createElement('div');
    divInner.className = "fw-bold";
    divInner.innerHTML = `<a href="`+info[1]+`">`+info[0]+`</a>`;

    let paragraph = document.createElement('p');
    paragraph.innerHTML = info[2];
    
    let span = document.createElement('span');
    span.className = "badge bg-dark rounded-pill";
    span.innerHTML = date;

    divOuter.appendChild(divInner);
    divOuter.appendChild(paragraph);
    li.appendChild(divOuter);
    li.appendChild(span);
    textarea.appendChild(li);
}

for (var url_source in urls) {
    getEntries(url_source, urls[url_source]);
}

entry_dates = Object.keys(entries).sort();
textarea.value = '';
for (var entry_date in entries) {
    loadEntries(entry_date, entries[entry_date]);
}
