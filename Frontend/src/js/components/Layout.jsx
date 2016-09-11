import React from "react";
var Layout = React.createClass({
    render: function () {
        var layout;
        this.props.user ? layout = <AuthedLayout files={this.props.files} getFiles={this.props.getFiles}/> :  layout = <NotAuthedLayout/>;
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
                <div className="container not-authed_layout">
                <div className="ui text container">
                    <h1 className="ui header">
                        xSafeSaving
                    </h1>
                    <h2>Store your files and watch it anywhere, anytime.</h2>
                </div>
                </div>
        )
    }
});

var AuthedLayout = React.createClass({
    componentWillMount: function () {
        this.props.getFiles()
    },
   render: function () {
       var content = [];
       this.props.files.forEach(function(result, number) {
           var contentType = result['content-type'];
           var type = contentType.substring(0, contentType.lastIndexOf('/'));
           if (type === 'image') {
               content.push(<Image key={number} name={result.filename} src={result.path}/>)
           } else if (type === 'video') {
            content.push(<Video key={number} name={result.filename} src={result.path}/>)
           } else {
               content.push(<MediaObject key={number} name={result.filename} src={result.path}/>)
           }

       });

       return (
           <div className="ui two column doubling stackable grid container">
               {content}
           </div>
       )
   }
});


var Image = React.createClass({
   render: function () {
       return(
           <div className="column center aligned">
               <img className="ui fluid image" src={this.props.src}></img>
               <MediaInfo name={this.props.name} src={this.props.src} />
           </div>
       )
   }
});

var Video = React.createClass({
    render: function () {
        return(
            <div className="column center aligned">
                <video className="ui fluid image" controls src={this.props.src}></video>
                <MediaInfo name={this.props.name} src={this.props.src} />
            </div>
        )
    }
});

var MediaObject = React.createClass({
   render: function () {
       return(
       <div className="column center aligned">
           <div className="ui">
            <img className="file-image" src='/upload/rsz_file.png'></img>
            <MediaInfo name={this.props.name} src={this.props.src}/>
           </div>
       </div>
       )
   }
});

var MediaInfo = React.createClass({
    render: function () {
        return(
            <div className="media-info">
                <a href={this.props.src}>
                    {this.props.name}
                </a>
            </div>
        )
    }
});

export default Layout