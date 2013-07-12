/* Browser Detect taken from Quirks Mode
 * http://www.quirksmode.org/js/detect.html
 */
var BrowserDetect = {
        init: function () {
                this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
                this.version = this.searchVersion(navigator.userAgent)
                        || this.searchVersion(navigator.appVersion)
                        || "an unknown version";
                this.OS = this.searchString(this.dataOS) || "an unknown OS";
        },
        searchString: function (data) {
                for (var i=0;i<data.length;i++) {
                        var dataString = data[i].string;
                        var dataProp = data[i].prop;
                        this.versionSearchString = data[i].versionSearch || data[i].identity;
                        if (dataString) {
                                if (dataString.indexOf(data[i].subString) != -1)
                                        return data[i].identity;
                        }
                        else if (dataProp)
                                return data[i].identity;
                }
        },
        searchVersion: function (dataString) {
                var index = dataString.indexOf(this.versionSearchString);
                if (index == -1) return;
                return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
        },
        dataBrowser: [
                {
                        string: navigator.userAgent,
                        subString: "Chrome",
                        identity: "Chrome"
                },
                {       string: navigator.userAgent,
                        subString: "OmniWeb",
                        versionSearch: "OmniWeb/",
                        identity: "OmniWeb"
                },
                {
                        string: navigator.vendor,
                        subString: "Apple",
                        identity: "Safari",
                        versionSearch: "Version"
                },
                {
                        prop: window.opera,
                        identity: "Opera",
                        versionSearch: "Version"
                },
                {
                        string: navigator.vendor,
                        subString: "iCab",
                        identity: "iCab"
                },
                {
                        string: navigator.vendor,
                        subString: "KDE",
                        identity: "Konqueror"
                },
                { 
                        string: navigator.userAgent,
                        subString: "Firefox",
                        identity: "Firefox"
                },
                {
                        string: navigator.vendor,
                        subString: "Camino",
                        identity: "Camino"
                },
                {               // for newer Netscapes (6+)
                        string: navigator.userAgent,
                        subString: "Netscape",
                        identity: "Netscape"
                },
                {
                        string: navigator.userAgent,
                        subString: "MSIE",
                        identity: "Explorer",
                        versionSearch: "MSIE"
                },
                {
                        string: navigator.userAgent,
                        subString: "Gecko",
                        identity: "Mozilla",
                        versionSearch: "rv"
                },
                {               // for older Netscapes (4-)
                        string: navigator.userAgent,
                        subString: "Mozilla",
                        identity: "Netscape",
                        versionSearch: "Mozilla"
                }
        ],
        dataOS : [
                {
                        string: navigator.platform,
                        subString: "Win",
                        identity: "Windows"
                },
                {
                        string: navigator.platform,
                        subString: "Mac",
                        identity: "Mac"
                },
                {
                           string: navigator.userAgent,
                           subString: "iPhone",
                           identity: "iPhone/iPod"
            },
                {
                        string: navigator.platform,
                        subString: "Linux",
                        identity: "Linux"
                }
        ]

};
BrowserDetect.init();

//This is the list of supported browsers and the most recent version
    //Refer to browsehappy.com for the most recent browsers
var oldBrowser_list = {
        "Chrome" : 28
        , "Firefox" : 22
        , "Safari-Mac" : 6
        , "Safari-Windows" : 5
        , "Opera" : 15
        , "Explorer" : 10
}

var olderVersionLimit = 2;
var safariVersionLimit = 1;

/* This function checks the user's browser version against what our code supports
 * @return true if the browser is NOT supported
 */
var oldBrowser_checkMyBrowser;
oldBrowser_checkMyBrowser = function(){

	var myBrowser = BrowserDetect.browser; //The user's browser

	//We need to check safari first because safari has different version for windows and mac
	if(myBrowser=="Safari"
	&& BrowserDetect.version < oldBrowser_list[myBrowser + '-' + BrowserDetect.OS] - safariVersionLimit){
		return true;
	}//if
	//If the user's browser is on the supported browser list and the browser's version is within the limit of the most recent version
	else if (oldBrowser_list[myBrowser]
	&& BrowserDetect.version < oldBrowser_list[myBrowser] - olderVersionLimit){
		return true;
	}//else if
	//The user is using an unsupported browser
	else{
		return false;
    }//else

}//oldBrowser_checkMyBrowser

/* Front End
 */
$(function() {
	//If the browser is not supported, create a modal that informs the user
	if ( oldBrowser_checkMyBrowser() ){

		$('body').prepend('<div id="dialog-modal">Your browser version is old. You should update it.</div>');
		$( "#dialog-modal" ).dialog({
			  autoOpen    : true
			, dialogClass : 'wp-dialog'
			, height      : 140
			// , maxHeight   : 600
			// , maxWidth    : 600
			// , minHeight   : 200
			// , minWidth    : 200
			, modal       : true
			, title       : "Browser Warning"
			// , width       : 500
			// , zIndex      : 1001
		});
		// console.log("DEBUG: should be open. is: " + $( "#dialog-modal-two" ).dialog( "isOpen" ));
	}//if oldBrowser
});