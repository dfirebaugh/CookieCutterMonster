/**
 * Returns a handler which will open a new tab when activated.
 */


function getClickHandler() {
  return function(info, tab) {

    // The srcUrl property is only available for image elements.

var url = "https://schreiverj.github.io/CookieCutterMonster/cookie.html?image=" + info.srcUrl;

    // Create a new tabto the info page.

chrome.tabs.create({ url: url, });
  };
};



/**
 * Create a context menu which will only show up for images.
 */
chrome.contextMenus.create({
  "title" : "Convert to Cookie Cutter",
  "type" : "normal",
  "contexts" : ["image"],
  "onclick" : getClickHandler()
});