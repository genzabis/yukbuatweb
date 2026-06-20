const fs = require('fs');
let html = fs.readFileSync('d:/Proyek/jasaweb/index.html', 'utf8');

// Ensure we don't double wrap by stripping first if it exists
html = html.replace(/<article class="why-item([^"]*)liquid-glass([^"]*)">\s*<div class="liquid-glass-shine"><\/div>\s*<div class="liquid-glass-content">([\s\S]*?)<\/div>\s*<\/article>/g, '<article class="why-item$1$2">$3</article>');
html = html.replace(/<article class="faq-item([^"]*)liquid-glass([^"]*)">\s*<div class="liquid-glass-shine"><\/div>\s*<div class="liquid-glass-content">([\s\S]*?)<\/div>\s*<\/article>/g, '<article class="faq-item$1$2">$3</article>');

// Wrappers
html = html.replace(/<article class="why-item([^"]*)">([\s\S]*?)<\/article>/g, '<article class="why-item$1 liquid-glass">\n    <div class="liquid-glass-shine"></div>\n    <div class="liquid-glass-content">$2</div>\n</article>');
html = html.replace(/<article class="faq-item([^"]*)">([\s\S]*?)<\/article>/g, '<article class="faq-item$1 liquid-glass">\n    <div class="liquid-glass-shine"></div>\n    <div class="liquid-glass-content">$2</div>\n</article>');
html = html.replace(/<div class="hero-panel([^"]*)">([\s\S]*?)<\/div>\n/g, '<div class="hero-panel$1 liquid-glass">\n    <div class="liquid-glass-shine"></div>\n    <div class="liquid-glass-content">$2</div>\n</div>\n');
html = html.replace(/<div class="hero-stat([^"]*)">([\s\S]*?)<\/div>\n/g, '<div class="hero-stat$1 liquid-glass">\n    <div class="liquid-glass-shine"></div>\n    <div class="liquid-glass-content">$2</div>\n</div>\n');
html = html.replace(/<div class="compare-table-wrapper([^"]*)">([\s\S]*?)<\/div>\n/g, '<div class="compare-table-wrapper$1 liquid-glass">\n    <div class="liquid-glass-shine"></div>\n    <div class="liquid-glass-content">$2</div>\n</div>\n');
html = html.replace(/<div class="pricing-breakdown([^"]*)"([^>]*)>([\s\S]*?)<\/div>\n/g, '<div class="pricing-breakdown$1 liquid-glass"$2>\n    <div class="liquid-glass-shine"></div>\n    <div class="liquid-glass-content">$3</div>\n</div>\n');
html = html.replace(/<div class="tech-item([^"]*)">([\s\S]*?)<\/div>\n/g, '<div class="tech-item$1 liquid-glass">\n    <div class="liquid-glass-shine"></div>\n    <div class="liquid-glass-content">$2</div>\n</div>\n');
html = html.replace(/<form class="contact-form([^"]*)"([^>]*)>([\s\S]*?)<\/form>\n/g, '<form class="contact-form$1 liquid-glass"$2>\n    <div class="liquid-glass-shine"></div>\n    <div class="liquid-glass-content">$3</div>\n</form>\n');
html = html.replace(/<div class="contact-info-card([^"]*)">([\s\S]*?)<\/div>\n/g, '<div class="contact-info-card$1 liquid-glass">\n    <div class="liquid-glass-shine"></div>\n    <div class="liquid-glass-content">$2</div>\n</div>\n');

// Also increment cache buster
html = html.replace(/style\.css\?v=\d+/, 'style.css?v=' + Date.now());

fs.writeFileSync('d:/Proyek/jasaweb/index.html', html);
console.log('Done');
