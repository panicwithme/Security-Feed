var urls = {
    'Wired Security'  : 'https://www.wired.com/feed/category/security/latest/rss',
    'TheHackerNews'   : 'http://feeds.feedburner.com/TheHackersNews?format=xml',
    'Dark Reading'    : 'https://www.darkreading.com/rss_simple.asp',
    'KrebsonSecurity' : 'https://krebsonsecurity.com/feed',
    'ThreatPost'      : 'https://threatpost.com/feed',
};

const textarea = document.querySelector('#feed-area > ul');

function loadFeed(source, url) {
    feednami.load(url)
        .then(feed => {
          textarea.value = '';
          console.log(feed);
          for(let entry of feed.entries) {
              let date = new Date(entry.date_ms);
              date = date.toLocaleString();
              let li = document.createElement('li');
              li.innerHTML = source + ` <a href="${entry.link}">${entry.title}</a>` + date;
              textarea.appendChild(li);
          }
        });
}

for (var url_source in urls) {
    loadFeed(url_source, urls[url_source]);
}
