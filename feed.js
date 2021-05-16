var urls = {
    'Wired Security'  : 'https://www.wired.com/feed/category/security/latest/rss',
    'TheHackerNews'   : 'http://feeds.feedburner.com/TheHackersNews?format=xml',
    'Dark Reading'    : 'https://www.darkreading.com/rss_simple.asp',
    'KrebsonSecurity' : 'https://krebsonsecurity.com/feed',
    'ThreatPost'      : 'https://threatpost.com/feed',
};

const textarea = document.querySelector('#feed-area > ol');
function loadFeed(source, url) {
    feednami.load(url)
        .then(feed => {
          textarea.value = '';
          console.log(feed);
          for(let entry of feed.entries) {
              let date = new Date(entry.date_ms);
              date = date.toLocaleString();
              let li = document.createElement('li');
              li.className = "list-group-item d-flex justify-content-between align-items-start";

              let divOuter = document.createElement('div');
              divOuter.className = "ms-2 me-auto";

              let divInner = document.createElement('div');
              divInner.className = "fw-bold";
              divInner.innerHTML = `<a href="${entry.link}">${entry.title}</a>`;

              let paragraph = document.createElement('p');
              paragraph.innerHTML = source;

              let span = document.createElement('span');
              span.className = "badge bg-dark rounded-pill";
              span.innerHTML = date;

              divOuter.appendChild(divInner);
              divOuter.appendChild(paragraph);
              li.appendChild(divOuter);
              li.appendChild(span);
              textarea.appendChild(li);
          }
        });
}
for (var url_source in urls) {
    loadFeed(url_source, urls[url_source]);
}
