var urls = [
    'https://www.wired.com/feed/category/security/latest/rss',
    'http://feeds.feedburner.com/TheHackersNews?format=xml'
];

const textarea = document.querySelector('#feed-area > ul');

function loadFeed(url) {
    feednami.load(url)
        .then(feed => {
          textarea.value = ''
          console.log(feed);
          for(let entry of feed.entries) {
              let li = document.createElement('li');
              li.innerHTML = `<a href="${entry.link}">${entry.title}</a>`;
              textarea.appendChild(li);
          }
        });
}

urls.forEach(loadFeed);
