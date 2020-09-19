let webTable = JSON.parse(localStorage.getItem('hashTable'))
let hashTable = webTable || [
    { url: 'https://element.eleme.cn', ico: 'https://element.eleme.cn/favicon.ico' },
    { url: 'https://jquery.cuishifeng.cn/submit.html', ico: 'https://jquery.cuishifeng.cn/favicon.ico' },
]
const simplifyUrl = (url) => {
    url = url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') // 删除 / 开头的内容
        //console.log(url);
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    return url
}

$(".search-btn").click((e) => {
    $('form').attr('action', '//baidu.com/s?').submit()
});

$('.search-input').bind('keypress', function(event) {
    if (event.keyCode == "13") {
        $('form').attr('action', '//baidu.com/s?').submit()
    }
})
$('.web-input-text').bind('keypress', function(event) {
    if (event.keyCode == "13") {
        console.log('13');
        addweb()
    }
})
getWeb()
$('.add-web-site').on('click', (e) => {
    $('.web-input').css('display', 'block')
    $('.favorites').css('display', 'none')
    $('.mask').css('display', 'block')
    $('.web-input-text').val('').focus()
})

function getWeb() {
    $('ul').find('li:not(.add-web-site)').remove()
    hashTable.forEach((res, index) => {
        let x = $(`
      <li class="web-site">
      <a href="${simplifyUrl(res.url)}" target="_blank">
        <svg class="cancel" t="1600514363392" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3920" width="200" height="200"><path d="M726.016 665.984l-153.984-153.984 153.984-153.984-59.989333-59.989333-153.984 153.984-153.984-153.984-59.989333 59.989333 153.984 153.984-153.984 153.984 59.989333 59.989333 153.984-153.984 153.984 153.984zM512 86.016q176 0 301.013333 125.013333t125.013333 301.013333-125.013333 301.013333-301.013333 125.013333-301.013333-125.013333-125.013333-301.013333 125.013333-301.013333 301.013333-125.013333z" p-id="3921" fill="#d81e06"></path></svg>
          <img width="120px" class="web-ico" src="${res.ico}" alt="">
      </a>
      </li>
      `).insertBefore($('.add-web-site'))
        x.on('click', '.cancel', (e) => {
            e.preventDefault()
            hashTable.splice(index, 1)
            localStorage.setItem('hashTable', JSON.stringify(hashTable))
            getWeb()
        })
    })
}

$('.mask').click(() => {
    $('.web-input').css('display', 'none')
    $('.mask').css('display', 'none')
    $('.favorites').css('display', 'block')
    $('.web-input-text').val('')
})


$('.web-input-btn').on('click', addweb = () => {
    let url = $('.web-input-text').val()
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    //console.log(simplifyUrl(url));
    hashTable.push({
        url: simplifyUrl(url),
        ico: `${simplifyUrl(url)}/favicon.ico`
    })
    localStorage.setItem('hashTable', JSON.stringify(hashTable))
    $('.web-input').css('display', 'none')
    $('.mask').css('display', 'none')
    $('.favorites').css('display', 'block')
    getWeb()
    $('.web-input-text').val('')
})