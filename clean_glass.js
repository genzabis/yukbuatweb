const fs = require('fs');
let html = fs.readFileSync('d:/Proyek/jasaweb/index.html', 'utf8');

// The regex matches elements with liquid-glass, liquid-glass-shine, and liquid-glass-content
// It strips the liquid-glass class and removes the two inner wrapper divs.

const tags = ['article', 'div', 'form'];

tags.forEach(tag => {
    const regex = new RegExp(`<${tag} ([^>]*)liquid-glass([^>]*)>\\s*<div class="liquid-glass-shine"><\\/div>\\s*<div class="liquid-glass-content">([\\s\\S]*?)<\\/div>\\s*<\\/${tag}>`, 'g');
    html = html.replace(regex, (match, p1, p2, p3) => {
        // cleanup trailing space if liquid-glass was at the end
        let classAttr = (p1 + p2).replace(/\s+/g, ' ').replace(/class="\s+/, 'class="').replace(/\s+"/, '"');
        return `<${tag} ${classAttr}>${p3}</${tag}>`;
    });
});

fs.writeFileSync('d:/Proyek/jasaweb/index.html', html);
console.log('Cleaned index.html');
