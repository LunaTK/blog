/**
 * This code is part of for-editor
 * https: //github.com/kkfor/for-editor
 */
import marked from 'marked'
import hljs from 'highlight.js/lib/highlight'

hljs.registerLanguage('css', require('highlight.js/lib/languages/css'))
hljs.registerLanguage('json', require('highlight.js/lib/languages/json'))
hljs.registerLanguage('less', require('highlight.js/lib/languages/less'))
hljs.registerLanguage('scss', require('highlight.js/lib/languages/scss'))
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
hljs.registerLanguage('typescript', require('highlight.js/lib/languages/typescript'))
hljs.registerLanguage('python', require('highlight.js/lib/languages/python'))

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight(code) {
        return hljs.highlightAuto(code).value
    }
})

const renderer = new marked.Renderer()

// 段落解析
const paragraphParse = text => `<p>${text}</p>`

// 链接解析
const linkParse = (href, title, text) => {
    return `<a href=${href}
      title=${title || href}
      target='_blank'
      }>${text}</a>`
}

renderer.paragraph = paragraphParse
renderer.link = linkParse

export default content => {
    if (typeof content != 'string') return ''

    return marked(content, {
        renderer
    })
}