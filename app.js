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
print_exodus()
