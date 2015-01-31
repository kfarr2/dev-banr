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

// JSON object to hold some banner messages
var text = '{ "message" : [' +
    '{ "text": "I dont always go to the DEV site, but when I do I make sure I didnt actually mean to go to the PROD site." },' +
    '{ "text": "Such DEV site. Very prototype. Not PROD site. Wow."},' +
    '{ "text": "We cant stop here! This is the DEV site!"},' +
    '{ "text": "Waitaminute. How did we end up on the DEV site??"},'
    '{ "text": "Youre on the DEV site, Harry!"}' +
    ']}';

// Called by HTML. Hides the entire banner for 300 seconds (5 mins).
function hideAll(){
    document.getElementById("banr-div").style.display = "none";
    document.cookie = "hidecookie=True; max-age=300; path=/;";
}

// This function does it all. It takes the html page, parses it into a variable,
// then injects the variable text into the page.
function banr(){
    // Setup
    var markup = document.documentElement.innerHTML;
    var output, banner = '';
    var tag = "<body>";
    var obj = JSON.parse(text);
    var num = Math.floor(Math.random() * obj.message.length);

    // Check the cookie and set the visibility
    if(document.cookie.indexOf("hidecookie=True") == -1){
        // Inject HTML from banr.html
        try {
            banner = '<div id="banr-div" style="background-color: #333; color: #ccc; height: 50px; max-height: 50px;">'+
                '<div class="col-md-11"><p style="text-align: center; font-size: 24px; margin: 7px;">' + obj.message[num].text + '</p></div>' +
                '<a class="col-md-1 text-right" onclick="hideAll();" style="color: #ddd; margin-top: 5px;">Hide</a>' +
                '</div>';

            output = markup.substr(0, markup.indexOf(tag) + tag.length) + banner + markup.substr(markup.indexOf(tag) + tag.length)
            document.body.innerHTML = output;
        } catch(e){ // XMLHttp is undefined or something
            alert("Something went wrong\n" + obj);
        }
    }
}

banr();
