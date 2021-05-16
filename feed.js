const url = 'https://www.wired.com/feed/category/security/latest/rss'

const textarea = document.querySelector('#feed-area > ul')

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
