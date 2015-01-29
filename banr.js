/*
 *  DEV-BANR
 *  Written by Konstantin Farrell
 *
 *  Used for displaying a banner
 *  reminding the user that they
 *  are on a dev site.
 *
 *  Address all complaints to Sean
 *
 */

// This function does it all. It takes
// the html page, parses it into a variable,
// then injects the variable text into the
// page.

function banr(){
    // Setup
    var markup = document.documentElement.innerHTML;
    var output, banner = '';
    var tag = "<body>";
    var here = getCurrentPath();

    var xmlhttp = new XMLHttpRequest();
    // Inject HTML from banr.html
    try {
        xmlhttp.open("get", here + "banr.html", false);
        xmlhttp.send(null);
        banner = "<link href='" + here + "banr.css' rel='stylesheet' />";
        banner += xmlhttp.responseText;
        output = markup.substr(0, markup.indexOf(tag) + tag.length) + banner + markup.substr(markup.indexOf(tag) + tag.length)
        document.body.innerHTML = output;
    } catch(e){ // XMLHttp is undefined or something
        alert("Something went wrong\n" + document.documentElement.innerHTML);
    }

    // Pretty up the page
    hideBanners();
}

// Get our current path on the server for relative urls.
function getCurrentPath(){
    var scripts = document.getElementsByTagName("script");
    var src = scripts[scripts.length-1].src.substr(document.URL.length)
    src = src.substr(0, src.indexOf("banr.js"));
    return src;
}

// Run through the table setting all display
// styles to none, set the selected element's
// display style to block, and then check the
// cookie to determine to either hide everything,
// or keep it visible.
function hideBanners(){
    var docs = document.getElementById("banner-table");
    var num = Math.floor(Math.random() * docs.rows.length);

    if(document.cookie.indexOf("hidecookie=True") != -1){
        document.getElementById("banner-div").style.display = "none";
    } else {
        for(var i = 0; i < docs.rows.length; i++){
            docs.rows[i].style.display="none";
        }
        docs.rows[num].style.display = "block";
    }

}

// Called by HTML. Hides the entire banner for 300 seconds (5 mins).
function hideAll(){
    document.getElementById("banner-div").style.display = "none";
    document.cookie = "hidecookie=True; max-age=300; path=/;";
}

// All we actually run.
banr();
