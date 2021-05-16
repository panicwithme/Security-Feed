const url = 'https://www.wired.com/feed/category/security/latest/rss'

const textarea = document.getElementByID('feed-area')

feednami.load(url)
    .then(feed => {
      textarea.value = ''
      console.log(feed)
      for(let entry of feed.entries) {
          textarea.value += `${entry.title}\n${entry.link}\n\n`
      }
    })
