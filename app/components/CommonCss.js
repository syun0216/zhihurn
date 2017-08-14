const CommonCss = `article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
main,
nav,
section,
summary {
  display: block;
}
audio,
canvas,
video {
  display: inline-block;
}
audio:not([controls]) {
  display: none;
  height: 0;
}
html {
  font-family: sans-serif;
  -webkit-text-size-adjust: 100%;
}
body {
  font-family: 'Helvetica Neue', Helvetica, Arial, Sans-serif;
  background: #fff;
  padding-top: 0;
  margin: 0;
}
a:focus {
  outline: thin dotted;
}
a:active,
a:hover {
  outline: 0;
}
h1 {
  margin: .67em 0;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 16px;
}
abbr[title] {
  border-bottom: 1px dotted;
}
hr {
  box-sizing: content-box;
  height: 0;
}
mark {
  background: #ff0;
  color: #000;
}
code,
kbd,
pre,
samp {
  font-family: monospace,serif;
  font-size: 1em;
}
pre {
  white-space: pre-wrap;
}
q {

}
small {
  font-size: 80%;
}
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}
sup {
  top: -0.5em;
}
sub {
  bottom: -0.25em;
}
img {
  border: 0;
  vertical-align: middle;
  color: transparent;
  font-size: 0;
}
svg:not(:root) {
  overflow: hidden;
}
figure {
  margin: 0;
}
fieldset {
  border: 1px solid silver;
  margin: 0 2px;
  padding: .35em .625em .75em;
}
legend {
  border: 0;
  padding: 0;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
  overflow: hidden;
}
a {
  text-decoration: none;
}
blockquote {
  border-left: 3px solid #D0E5F2;
  font-style: normal;
  display: block;
  vertical-align: baseline;
  font-size: 100%;
  margin: .5em 0;
  padding: 0 0 0 1em;
}
ul,
ol {
  padding-left: 20px;
}
.main-wrap {
  max-width: 100%;
  min-width: 300px;
  margin: 0 auto;
}
.content-wrap {
  overflow: hidden;
  background-color: #f9f9f9;
}
.content-wrap a {
  word-break: break-all;
}
.headline {
  border-bottom: 4px solid #f6f6f6;
}
.headline-title.onlyheading {
  margin: 20px 0;
}
.headline img {
  max-width: 100%;
  vertical-align: top;
}
.headline-background-link {
  line-height: 2em;
  position: relative;
  display: block;
  padding: 20px 45px 20px 20px !important;
}
.icon-arrow-right {
  position: absolute;
  top: 50%;
  right: 20px;
  background-image: url(http://static.daily.zhihu.com/img/share-icons.png);
  background-repeat: no-repeat;
  display: inline-block;
  vertical-align: middle;
  background-position: -70px -20px;
  width: 10px;
  height: 15px;
  margin-top: -7.5px;
}
.headline-background .heading {
  color: #999;
  font-size: 15px!important;
  margin-bottom: 8px;
  line-height: 1em;
}
.headline-background .heading-content {
  color: #444;
  font-size: 17px!important;
  line-height: 1.2em;
}
.headline-title {
  line-height: 1.2em;
  color: #000;
  font-size: 22px;
  margin: 20px 0 10px;
  padding: 0 20px!important;
  font-weight: bold;
}
.meta {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 16px;
  color: #b8b8b8;
}
.meta .source-icon {
  width: 20px;
  height: 20px;
  margin-right: 4px;
}
.meta .time {
  float: right;
  margin-top: 2px;
}
.content {
  color: #444;
  line-height: 1.6em;
  font-size: 17px;
  margin: 10px 0 20px;
}
.content img {
  max-width: 100%;
  display: block;
  margin: 30px auto;
}

.content img + img {
  margin-top: 15px;
}

.content img[src*="zhihu.com/equation"] {
  display: inline-block;
  margin: 0 3px;
}
.content a {
  color: #259;
}
.content a:hover {
  text-decoration: underline;
}
.view-more {
  margin-bottom: 25px;
  text-align: center;
}
.view-more a {
  font-size: 16px;
  display: inline-block;
  width: 125px;
  height: 30px;
  line-height: 30px;
  background: #f0f0f0;
  color: #B8B8B8;
}
.question {
  overflow: hidden;
  padding: 0 20px!important;
}
.question + .question {
  border-top: 5px solid #f6f6f6;
}
.question-title {
  line-height: 1.4em;
  color: #000;
  font-weight: 700;
  font-size: 18px;
  margin: 20px 0;
}
.meta .author {
  color: #444;
  font-weight: 700;
}
.answer + .answer {
  border-top: 2px solid #f6f6f6;
  padding-top: 20px;
}
.footer {
  text-align: center;
  color: #b8b8b8;
  font-size: 13px;
  padding: 20px 0;
}
.footer a {
  color: #b8b8b8;
}
.question .view-more a {
  width: 100%;
  display: block;
}
.hot-comment {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.comment-label {
  font-size: 16px;
  color: #333;
  line-height: 1.5em;
  font-weight: 700;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin: 0;
  padding: 9px 20px;
}
.comment-list {
  margin-bottom: 20px;
}
.comment-item {
  font-size: 15px;
  color: #666;
  border-bottom: 1px solid #eee;
  padding: 15px 20px;
}
.comment-meta {
  position: relative;
  margin-bottom: 10px;
}
.comment-meta .author {
  vertical-align: middle;
  color: #444;
}
.comment-meta .vote {
  position: absolute;
  color: #b8b8b8;
  font-size: 12px;
  right: 0;
}
.night .comment-label {
  color: #b8b8b8;
  border-top: 1px solid #303030;
  border-bottom: 1px solid #303030;
}
.night .comment-item {
  color: #7f7f7f;
  border-bottom: 1px solid #303030;
}
.icon-vote,
.icon-voted {
  background-repeat: no-repeat;
  display: inline-block;
  vertical-align: 0;
  width: 11px;
  height: 12px;
  margin-right: 4px;
  background-image: url(http://static.daily.zhihu.com/img/app/Comment_Vote.png) !important;
}
.icon-voted {
  background-image: url(http://static.daily.zhihu.com/img/app/Comment_Voted.png) !important;
}
.night .icon-vote {
  background-image: url(http://static.daily.zhihu.com/img/app/Dark_Comment_Vote.png) !important;
}
.img-wrap .headline-title {
  bottom: 5px;
}
.img-wrap .img-source {
  right: 10px!important;
  font-size: 9px;
}
.global-header {
  position: static;
}
.button {
  width: 60px;
}
.button i {
  margin-right: 0;
}
.headline .img-place-holder {
  height: 200px;
}
.from-column {
  width: 280px;
  line-height: 30px;
  height: 30px;
  padding-left: 90px;
  color: #2aacec;
  background-image: url(http://static.daily.zhihu.com/img/News_Column_Entrance.png);
  box-sizing: border-box;
  margin: 0 20px 20px;
}
.from-column:active {
  background-image: url(http://static.daily.zhihu.com/img/News_Column_Entrance_Highlight.png);
}
.night .headline {
  border-bottom: 4px solid #303030;
}
.night img {
  -webkit-mask-image: -webkit-gradient(linear, 0 0, 0 100%, from(rgba(0, 0, 0, 0.7)), to(rgba(0, 0, 0, 0.7)));
}
body.night,
.night .content-wrap {
  background: #343434;
}
.night .answer + .answer {
  border-top: 2px solid #303030;
}
.night .question + .question {
  border-top: 4px solid #303030;
}
.night .view-more a {
  background: #292929;
  color: #666;
}
.night .icon-arrow-right {
  background-image: url(http://static.daily.zhihu.com/img/share-icons.png);
  background-repeat: no-repeat;
  display: inline-block;
  vertical-align: middle;
  background-position: -70px -35px;
  width: 10px;
  height: 15px;
}
.night blockquote,
.night sup {
  border-left: 3px solid #666;
}
.night .content a {
  color: #698ebf;
}
.night .from-column {
  color: #2b82ac;
  background-image: url(http://static.daily.zhihu.com/img/Dark_News_Column_Entrance.png);
}
.night .from-column:active {
  background-image: url(http://static.daily.zhihu.com/img/Dark_News_Column_Entrance_Highlight.png);
}
.large .question-title {
  font-size: 24px;
}
.large .meta {
  font-size: 18px;
}
.large .content {
  font-size: 20px;
}
.large blockquote,
.large sup {
  line-height: 1.6;
}
.meta .meta-item {
  -o-text-overflow: ellipsis;
  width: 39%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
  color: #929292;
  margin-right: 7px;
}
.headline .meta {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 11px;
  color: #b8b8b8;
  margin: 15px 0;
  padding: 0 20px;
}
.headline .meta a,
.headline .meta a:hover {
  padding-left: 1em;
  margin-top: 2px;
  float: right;
  font-size: 11px;
  color: #0066cf;
  text-decoration: none;
}
.highlight {
  width: auto;
  overflow: auto;
  word-wrap: normal;
}
.highlight::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.highlight code {
  overflow: auto;
}
.highlight::-webkit-scrollbar-thumb:horizontal {
  border-radius: 6px;
  background-color: rgba(0,0,0,.5);
}
.highlight::-webkit-scrollbar-thumb:horizontal:hover {
  background-color: rgba(0,0,0,.6);
}
.highlight pre {
  margin: 0;
  white-space: pre;
}
.highlight .hll {
  background-color: #ffc;
}
.highlight .err {
  color: #a61717;
  background-color: #e3d2d2;
}
.highlight .cp {
  color: #999;
  font-weight: 700;
}
.highlight .cs {
  color: #999;
  font-weight: 700;
  font-style: italic;
}
.highlight .gd {
  color: #000;
  background-color: #fdd;
}
.highlight .gi {
  color: #000;
  background-color: #dfd;
}
.highlight .gu {
  color: #aaa;
}
.highlight .ni {
  color: purple;
}
.highlight .nt {
  color: navy;
}
.highlight .w {
  color: #bbb;
}
.highlight .sr {
  color: olive;
}
[hidden],
.button span {
  display: none;
}
b,
strong,
.highlight .k,
.highlight .o,
.highlight .gs,
.highlight .kc,
.highlight .kd,
.highlight .kn,
.highlight .kp,
.highlight .kr,
.highlight .ow {
  font-weight: 700;
}
dfn,
.highlight .ge {
  font-style: italic;
}
.meta span,
.meta .source {
  vertical-align: middle;
}
.meta .avatar,
.comment-meta .avatar {
  width: 20px;
  height: 20px;
  border-radius: 2px;
  margin-right: 5px;
}
.meta .bio,
.highlight .gh,
.highlight .bp {
  color: #999;
}
.night .comment-meta .author,
.night .content,
.night .meta .author,
.highlight .go {
  color: #888;
}
.night .headline-title,
.night .headline-background .heading-content,
.night .question-title {
  color: #B8B8B8;
}
.highlight .c,
.highlight .cm,
.highlight .c1 {
  color: #998;
  font-style: italic;
}
.highlight .gr,
.highlight .gt {
  color: #a00;
}
.highlight .gp,
.highlight .nn {
  color: #555;
}
.highlight .kt,
.highlight .nc {
  color: #458;
  font-weight: 700;
}
.highlight .m,
.highlight .mf,
.highlight .mh,
.highlight .mi,
.highlight .mo,
.highlight .il {
  color: #099;
}
.highlight .s,
.highlight .sb,
.highlight .sc,
.highlight .sd,
.highlight .s2,
.highlight .se,
.highlight .sh,
.highlight .si,
.highlight .sx,
.highlight .s1,
.highlight .ss {
  color: #d32;
}
.highlight .na,
.highlight .nb,
.highlight .no,
.highlight .nv,
.highlight .vc,
.highlight .vg,
.highlight .vi {
  color: teal;
}
.highlight .ne,
.highlight .nf {
  color: #900;
  font-weight: 700;
}
.answer h1,
.answer h2,
.answer h3,
.answer h4,
.answer h5 {
  font-size: 19px;
}
@media only screen and (-webkit-min-device-pixel-ratio2), only screen and (min-device-pixel-ratio2) {
  .icon-arrow-right {
    background-image: url(http://static.daily.zhihu.com/img/share-icons@2x.png);
    -webkit-background-size: 82px 55px;
    background-size: 82px 55px;
  }
  .icon-vote,
  .icon-voted {
    background-image: url(http://static.daily.zhihu.com/img/app/Comment_Vote@2x.png) !important;
    background-size: 11px 12px;
  }
  .icon-voted {
    background-image: url(http://static.daily.zhihu.com/img/app/Comment_Voted@2x.png) !important;
  }
  .night .icon-vote {
    background-image: url(http://static.daily.zhihu.com/img/app/Dark_Comment_Vote@2x.png) !important;
  }
  .from-column {
    background-image: url(http://static.daily.zhihu.com/img/News_Column_Entrance@2x.png) !important;
    background-size: 280px 30px;
  }
  .from-column:active {
    background-image: url(http://static.daily.zhihu.com/img/News_Column_Entrance_Highlight@2x.png) !important;
  }
  .night .from-column {
    color: #2b82ac;
    background-image: url(http://static.daily.zhihu.com/img/Dark_News_Column_Entrance@2x.png) !important;
  }
  .night .from-column:active {
    background-image: url(http://static.daily.zhihu.com/img/Dark_News_Column_Entrance_Highlight@2x.png) !important;
  }
}
.meta .meta-item {
  width: 39%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
  color: #929292;
  margin-right: 7px;
}
.headline .meta {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 11px;
  color: #b8b8b8;
  margin: 20px 0;
  padding: 0 20px;
}
.headline .meta a,
.headline .meta a:hover {
  margin-top: 2px;
  float: right;
  font-size: 11px;
  color: #0066cf;
  text-decoration: none;
}
.answer h1,
.answer h2,
.answer h3,
.answer h4,
.answer h5 {
  font-size: 19px;
}
.origin-source,
a.origin-source:link {
  display: block;
  margin: 25px 0;
  height: 50px;
  overflow: hidden;
  background: #f0f0f0;
  color: #888;
  position: relative;
  -webkit-touch-callout: none;
}
.origin-source .source-logo,
a.origin-source:link .source-logo {
  float: left;
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.origin-source .text,
a.origin-source:link .text {
  line-height: 50px;
  height: 50px;
  font-size: 13px;
}
.origin-source.with-link .text {
  color: #333;
}
.origin-source.with-link:after {
  display: block;
  position: absolute;
  border-color: transparent transparent transparent #f0f0f0;
  border-width: 7px;
  border-style: solid;
  height: 0;
  width: 0;
  top: 18px;
  right: 4px;
  line-height: 0;
  content: "";
}
.origin-source.with-link:before {
  display: block;
  height: 0;
  width: 0;
  position: absolute;
  top: 18px;
  right: 3px;
  border-color: transparent transparent transparent #000;
  border-width: 7px;
  border-style: solid;
  line-height: 0;
  content: "";
}
.origin-source-wrap {
  position: relative;
  background: #f0f0f0;
}
.origin-source-wrap .focus-link {
  position: absolute;
  right: 0;
  top: 0;
  width: 45px;
  color: #00a2ed;
  height: 50px;
  display: none;
  text-align: center;
  font-size: 12px;
  -webkit-touch-callout: none;
}
.origin-source-wrap .focus-link .btn-label {
  text-align: center;
  display: block;
  margin-top: 8px;
  border-left: solid 1px #ccc;
  height: 34px;
  line-height: 34px;
}
.origin-source-wrap.unfocused .focus-link {
  display: block;
}
.origin-source-wrap.unfocused .origin-source:before,
.origin-source-wrap.unfocused .origin-source:after {
  display: none;
}
.night .origin-source-wrap {
  background: #292929;
}
.night .origin-source-wrap .focus-link {
  color: #116f9e;
}
.night .origin-source-wrap .btn-label {
  border-left: solid 1px #3f3f3f;
}
.night .origin-source,
.night .origin-source.with-link {
  background: #292929;
  color: #666;
}
.night .origin-source .text,
.night .origin-source.with-link .text {
  color: #666;
}
.night .origin-source.with-link:after {
  border-color: transparent transparent transparent #292929;
}
.night .origin-source.with-link:before {
  border-color: transparent transparent transparent #666;
}
/* ==== */
.question-title {
  color: #494b4d;
}

blockquote {
  color: #9da3a6;
  border-left: 3px solid #Dfe3e6;
}

.content a {
  color: #4786b3;
}

.content {
  font-size: 17px;
  color: #616466;
}

.content-wrap {
  background: #fff;
}

hr {
  margin: 30px 0;
  border-top-width: 0;
}


p {
  margin: 20px 0 !important;
}

.dudu-night .content {
  color: #797b80;
}

.dudu-night hr {
  color: #27282b;
  border-color: #27282b;
}
.dudu-night .meta .author,
.dudu-night .meta .bio {
  color: #555659;
}
.dudu-night .headline-title,
.dudu-night .headline-background .heading-content,
.dudu-night .question-title {
  color: #919499;
}

.dudu-night .headline {
  border-bottom: none;
}
.dudu-night img {
  -webkit-mask-image: -webkit-gradient(linear, 0 0, 0 100%, from(rgba(0, 0, 0, 0.7)), to(rgba(0, 0, 0, 0.7)));
}
body.dudu-night,
.dudu-night .content-wrap {
  background: #1d1e1f;
}
.dudu-night .answer + .answer {
  border-top: 2px solid #27282b;
}
.dudu-night .question + .question {
  border-top: 4px solid #27282b;
}
.dudu-night .view-more a {
  background: #1d1e1f;
  color: #396280;
}
.dudu-night .icon-arrow-right {
  background-image: url(http://static.daily.zhihu.com/img/share-icons.png);
  background-repeat: no-repeat;
  display: inline-block;
  vertical-align: middle;
  background-position: -70px -35px;
  width: 10px;
  height: 15px;
}
.dudu-night blockquote,
.dudu-night sup {
  border-left: 3px solid #2e3033;
  color: #555659;
}
.dudu-night .content a {
  color: #396280;
}

.dudu-night img {
  opacity: 0.7;
}

.dudu-night .from-column {
  color: #2b82ac;
  background-image: url(http://static.daily.zhihu.com/img/Dark_News_Column_Entrance.png);
}
.dudu-night .from-column:active {
  background-image: url(http://static.daily.zhihu.com/img/Dark_News_Column_Entrance_Highlight.png);
}

//ç¦ç”¨å¤´éƒ¨ä¸‹é¢çš„åˆ†éš”çº¿
.dudu .headline {
  border-bottom: none;
}

.dudu-night .origin-source,
.dudu-night a.origin-source:link {
  background: #222324;
}

.dudu-night .origin-source.with-link .text {
  color: #797b80;
}
.dudu-night .origin-source.with-link:after {
  border-color: transparent transparent transparent #797b80;
}

.img_div {
    position: relative;
    margin-bottom: 15px;
    height: 150px;
    background-position: 0 -60px;
    background-size: cover;
}
.img_div img{
  width: 100%;
}
.img_div h3, .img_div span {
    position: absolute;
    color: #fff;
}
.img_div h3 {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    margin: 0;
    bottom: 0;
    padding: 8px 10px 0;
    font-size: 18px;
    width: 100%;
    background: linear-gradient(180deg,transparent,rgba(0,0,0,.7) 121%);
    height: 72px;
    text-shadow: 2px 2px 2px #000;
    text-align: left;
}
.img_div span {
    text-shadow: 1px 1px 1px #000;
    font-size: 10px;
    bottom: 5px;
    right: 10px;
}
.html_content {
    margin-top: -14px;
}`;

module.exports = CommonCss;
