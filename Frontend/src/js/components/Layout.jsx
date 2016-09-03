import React from "react";
var Layout = React.createClass({
    render: function () {
        return(
            <div className="ui three column doubling stackable grid container">
                <Images src="https://pp.vk.me/c627822/v627822234/4d345/HgHKuwEr_ew.jpg"/>
            </div>
        )
    },
});

var Images = React.createClass({
   render: function () {
       return(
           <div className="column">
               <img className="ui fluid image" src={this.props.src}></img>
           </div>
       )
   }
});

export default Layout