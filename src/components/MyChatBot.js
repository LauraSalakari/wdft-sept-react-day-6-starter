import React, { Component } from 'react'

export default class MyChatBot extends Component {

    componentDidMount(){
        (function(d, m){
            var kommunicateSettings = 
                {"appId":"af570cfab44c552dfd2bf007a9b48762","popupWidget":true,"automaticChatOpenOnNavigation":true};
            var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
            window.kommunicate = m; m._globals = kommunicateSettings;
        })(document, window.kommunicate || {});
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
