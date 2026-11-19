import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SITE = "https://jazielstory.site";
const PAGE_SIZE = 2;
const GLOBAL_OG = SITE + "/assets/images/og/jaziel-og-cover.png";
const esc = v => String(v ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");
const media = v => /^https?:\/\//i.test(String(v||"")) ? String(v) : "../" + String(v||"").replace(/^\/+/,"");
const absolute = v => /^https?:\/\//i.test(String(v||"")) ? String(v) : SITE + "/" + String(v||"").replace(/^\/+/,"");
const paras = a => (Array.isArray(a)?a:[]).map(p=>"<p>"+esc(p)+"</p>").join("");
function imageHTML(item) {
  const src = typeof item==="string" ? item : item && item.src;
  if (!src) return "";
  const alt = typeof item==="object" && item.alt ? item.alt : "";
  const caption = typeof item==="object" && item.caption ? item.caption : "";
  return '<figure class="article-figure"><img src="'+esc(media(src))+'" alt="'+esc(alt)+'" loading="lazy" decoding="async">'+(caption?'<figcaption>'+esc(caption)+'</figcaption>':"")+"</figure>";
}
function verseHTML(v) {
  if (!v) return "";
  if (typeof v==="string") return '<blockquote class="verse-block">'+esc(v)+"</blockquote>";
  if (!v.text) return "";
  return '<blockquote class="verse-block"><p>'+esc(v.text)+'</p>'+(v.reference?'<cite>'+esc(v.reference)+'</cite>':"")+"</blockquote>";
}
function sectionHTML(s,i,images) {
  return (s && s.heading?'<h2>'+esc(s.heading)+"</h2>":"")+paras(s && s.paragraphs)+(images[i]?imageHTML(images[i]):"");
}
function renderPage(a,page,total) {
  const sections=Array.isArray(a.sections)?a.sections:[];
  const images=Array.isArray(a.images)?a.images:[];
  const first=page===1,last=page===total,start=(page-1)*PAGE_SIZE;
  let out="";
  if(first && a.cover) out+='<div class="article-cover"><img src="'+esc(media(a.cover))+'" alt="'+esc(a.title||"")+'" loading="lazy" decoding="async"></div>';
  if(first && a.intro) out+="<p>"+esc(a.intro)+"</p>";
  if(first) out+='<div class="ad-slot article-ad-slot" aria-label="Advertisement"></div>';
  const slice=sections.slice(start,start+PAGE_SIZE);
  slice.forEach((s,i)=>{out+=sectionHTML(s,start+i,images);if(i<slice.length-1)out+='<div class="ad-slot article-ad-slot" aria-label="Advertisement"></div>';});
  if(last){out+=verseHTML(a.bibleVerse);if(a.closing)out+='<p class="article-closing">'+esc(a.closing)+"</p>";out+='<div class="ad-slot article-ad-slot" aria-label="Advertisement"></div>';}
  else out+='<a class="article-continue" href="?page='+(page+1)+'">Continue Reading <span aria-hidden="true">→</span></a>';
  return '<section class="article-page-content'+(first?" is-active":"")+'" data-article-page="'+page+'"'+(first?"":" hidden")+'>'+out+"</section>";
}
function pagination(total) {
  if(total<=1)return "";
  let links="";
  for(let i=1;i<=total;i++) links+='<a class="article-page-number'+(i===1?" active":"")+'" href="'+(i===1?"?":"?page="+i)+'" aria-current="'+(i===1?"page":"false")+'">'+i+"</a>";
  return '<nav class="article-pagination" aria-label="Article pages"><div class="article-page-status">Page 1 of '+total+'</div><div class="article-page-numbers">'+links+"</div></nav>";
}
function render(a,template) {
  const slug=String(a.slug||"");
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)){console.warn("Skipping invalid slug:",slug);return null;}
  const title=a.og?.title||a.title||"Jaziel Story";
  const description=a.og?.description||a.seo?.description||a.dek||a.description||"";
  const seoTitle=a.seo?.title||((a.title||"Story")+" | Jaziel");
  const image=absolute(a.og?.image||a.cover||GLOBAL_OG);
  const mime=/\.png(?:\?|$)/i.test(image)?"image/png":/\.webp(?:\?|$)/i.test(image)?"image/webp":"image/jpeg";
  const url=SITE+"/articles/"+slug+".html";
  const sections=Array.isArray(a.sections)?a.sections:[];
  const total=Math.max(1,Math.ceil(sections.length/PAGE_SIZE));
  const meta=[a.readTime,a.date].filter(Boolean).map(esc).join(" · ");
  const dek=a.dek||a.description||"";
  let pages="";
  for(let p=1;p<=total;p++)pages+=renderPage(a,p,total);
  const category=a.category?'<a class="story-category" href="../category.html?category='+encodeURIComponent(a.category)+'">'+esc(a.category)+"</a>":"";
  const tags=Array.isArray(a.tags)&&a.tags.length?'<div class="tag-list">'+a.tags.map(t=>'<a class="tag-chip" href="../search.html?q='+encodeURIComponent(t)+'">#'+esc(t)+"</a>").join("")+"</div>":"";
  let html=template;
  const replacements=[
    [/<meta name="description" content="[^"]*">/,'<meta name="description" content="'+esc(a.seo?.description||a.dek||a.description||"")+'">'],
    [/<title>[\s\S]*?<\/title>/,"<title>"+esc(seoTitle)+"</title>"],
    [/<link rel="canonical" href="[^"]*">/,'<link rel="canonical" href="'+url+'">'],
    [/<meta property="og:title" content="[^"]*">/,'<meta property="og:title" content="'+esc(title)+'">'],
    [/<meta property="og:description" content="[^"]*">/,'<meta property="og:description" content="'+esc(description)+'">'],
    [/<meta property="og:image" content="[^"]*">/,'<meta property="og:image" content="'+esc(image)+'">'],
    [/<meta property="og:url" content="[^"]*">/,'<meta property="og:url" content="'+url+'">'],
    [/<meta name="twitter:title" content="[^"]*">/,'<meta name="twitter:title" content="'+esc(title)+'">'],
    [/<meta name="twitter:description" content="[^"]*">/,'<meta name="twitter:description" content="'+esc(description)+'">'],
    [/<meta name="twitter:image" content="[^"]*">/,'<meta name="twitter:image" content="'+esc(image)+'">']
  ];
  replacements.forEach(([re,value])=>{html=html.replace(re,value);});
  html=html.replace("</head>",'<meta property="og:image:alt" content="'+esc(a.title||title)+'"><meta property="og:image:type" content="'+mime+'"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"></head>');
  html=html.replace('href="assets/css/style.css"','href="../assets/css/style.css"').replace('href="assets/css/article-pagination.css"','href="../assets/css/article-pagination.css"');
  ["main.js","article-pagination.js","related-articles.js","jaziel-ads.js"].forEach(f=>{html=html.replace('src="assets/js/'+f+'"','src="../assets/js/'+f+'"');});
  html=html.replace('<body data-page="article">','<body data-page="static-article">');
  html=html.replace('<a class="logo" href="index.html">','<a class="logo" href="../index.html">');
  html=html.replace('<main><div class="container">\n    <div id="article-root"><p class="loading-text">Loading story…</p></div>','<main><div class="container"><article class="article" data-slug="'+esc(slug)+'"><p class="back-link"><a href="../index.html">← Back to Jaziel</a></p>'+category+'<h1 class="article-title">'+esc(a.title||"")+'</h1>'+(dek?'<p class="article-dek">'+esc(dek)+'</p>':"")+(meta?'<div class="story-meta">'+meta+"</div>":"")+pages+pagination(total)+tags+"</article>");
  ["about.html","contact.html","privacy.html","terms.html"].forEach(f=>{html=html.replace('href="'+f+'"','href="../'+f+'"');});
  return html;
}
const data=JSON.parse(fs.readFileSync(path.join(ROOT,"articles.json"),"utf8"));
const template=fs.readFileSync(path.join(ROOT,"article.html"),"utf8");
const articles=Array.isArray(data.articles)?data.articles:[];
const dir=path.join(ROOT,"articles");
fs.mkdirSync(dir,{recursive:true});
let count=0;
for(const a of articles){const html=render(a,template);if(html){fs.writeFileSync(path.join(dir,a.slug+".html"),html);count++;}}
console.log("Generated "+count+" static article pages with per-article Open Graph metadata.");
