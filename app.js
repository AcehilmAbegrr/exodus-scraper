const request = require('request')
const $ = require('cheerio');

const exodus_wiki = {
    url: 'https://en.wikisource.org/wiki/Bible_(King_James)/Exodus',
    headers: {
        'User-Agent': 'request'
    },
    method: 'GET',
};

const request_promise = options => {
    return new Promise((resolve, reject) => {
        request(options, (error, response, data) => {
            if (error) {
                reject(new Error(`${error.message}`))
            } else {
                resolve(data)
            }
        })    
    })
}
    

const print_exodus = async () => {
    const html = await request_promise(exodus_wiki)
    const book_of_exodus = $('#mw-content-text', html).text()
    console.log(book_of_exodus)
}
//print_exodus()

const print_chapter_links = async () => {
    const html = await request_promise(exodus_wiki)
    const exodus_chapters = $('#toc > ul:nth-child(3) a', html)
    const chapter_anchored_links = exodus_chapters.map(
        (i, chapter) => exodus_wiki.url + chapter.attribs.href
    )
    console.log(chapter_anchored_links.toArray())
}
print_chapter_links()
