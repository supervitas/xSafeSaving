import React from "react";
var Layout = React.createClass({
    render: function () {
        var layout;
        this.props.user ? layout = <AuthedLayout getFiles={this.props.getFiles}/> :  layout = <NotAuthedLayout/>;
        return(
            <div>
                {layout}
            </div>
        )
    },
});
var NotAuthedLayout = React.createClass({

    render: function () {
        return(
            <div>
                Not Authed
            </div>
        )
    }
});

var AuthedLayout = React.createClass({
    componentWillMount: function () {
        this.props.getFiles()
    },
   render: function () {
       return(
           <div className="ui three column doubling stackable grid container">
               Authed
           </div>
       )
   }
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