import React from "react";
import $ from "jquery";

var Layout = React.createClass({
    render: function () {
        var layout;
        if(this.props.user) {
            layout = <AuthedLayout
                files={this.props.files}
                getFiles={this.props.getFiles}
                deleteFile={this.props.deleteFile}
                filesCount={this.props.filesCount}/>
        } else {
            layout = <NotAuthedLayout/>;
        }
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
            <div className='container not-authed_layout'>
                <div className='ui text container'>
                    <h1 className='ui header'>
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
        this.props.getFiles({skip:0})
    },
    getInitialState: function () {
        return {deletedFileName: '', deletedFilePath: ''};
    },
    changeDeletedFileNameOrPath: function (name, path) {
      this.setState({deletedFileName: name, deletedFilePath: path});
    },
    render: function () {
        var content = this.props.files.map(function(result, number) {
            const contentType = result['content-type'];
            const type = contentType.substring(0, contentType.lastIndexOf('/'));
            switch (type) {
                case 'image': {
                    return(<Image changeDeleteFile={this.changeDeletedFileNameOrPath}
                                        key={number} name={result.filename} src={result.path}/>);
                }
                case 'video': {
                    return(<Video changeDeleteFile={this.changeDeletedFileNameOrPath}
                                        key={number} name={result.filename} src={result.path}/>);
                }
                default: {
                    return(<MediaObject changeDeleteFile={this.changeDeletedFileNameOrPath}
                                              key={number} name={result.filename} src={result.path}/>);
                }
            }
        }, this);

        return (
           <div>
               <div className='ui two column doubling stackable grid container'>
                   {content}
               </div>
               {content.length > 0 ? <Pagination filesCount={this.props.filesCount}
                                                 getFiles={this.props.getFiles}/> : false}
               <DeleteModal deleteFile={this.props.deleteFile}
                            deletedFile={this.state.deletedFileName} deletedFilePath={this.state.deletedFilePath}/>
           </div>
        )
    }
});

var Image = React.createClass({
   render: function () {
       return(
           <div className='column center aligned'>
               <img className='ui fluid image' src={this.props.src}/>
               <MediaInfo changeDeleteFile={this.props.changeDeleteFile} name={this.props.name} src={this.props.src} />
           </div>
       )
   }
});

var Video = React.createClass({
    render: function () {
        return(
            <div className='column center aligned'>
                <video className='ui fluid image'  preload='metadata' controls src={this.props.src}/>
                <MediaInfo changeDeleteFile={this.props.changeDeleteFile} name={this.props.name} src={this.props.src} />
            </div>
        )
    }
});

var MediaObject = React.createClass({
   render: function () {
       return(
       <div className='column center aligned'>
           <div className='ui'>
            <img className='file-image' src='/upload/rsz_file.png'/>
            <MediaInfo changeDeleteFile={this.props.changeDeleteFile} name={this.props.name} src={this.props.src}/>
           </div>
       </div>
       )
   }
});

var MediaInfo = React.createClass({
    render: function () {
        return (
            <div className='media-info'>
                <a href={this.props.src}>
                    {this.props.name}
                </a>
                <i className='remove link icon delete_file'
                   onClick={() => {
                       this.props.changeDeleteFile(this.props.name, this.props.src);
                        $('#deleteModal').modal('show')}}>
                </i>
            </div>
        )
    }
});

var Pagination = React.createClass({
    getInitialState: function () {
        return {currentPage: 1}
    },
    getNewFiles: function (pageNumber) {
        this.setState({currentPage:pageNumber + 1});
        this.props.getFiles({skip: pageNumber * 20});
        $('html, body').animate({ scrollTop: 0 }, 'slow');
    },
   render: function () {
       var pageCount = Math.floor(this.props.filesCount / 20) + 1;
       var arr = [];
       var that = this;
       for (var i = 0; i < pageCount; i++) {
           arr.push({page:i + 1, isActive: i + 1 === that.state.currentPage})
       }
       return(
           <div className='ui center aligned container'>
               <div className='ui pagination menu'>
                   {arr.map(function(result, index) {
                       return <a className={result.isActive? 'item active': 'item'}
                                 onClick={()=>that.getNewFiles(index)}
                                 key={index}> {result.page}</a>
                   })}
               </div>
           </div>
       )
   } 
});

var DeleteModal = React.createClass({
    render: function () {
        return (
            <div className='ui small modal' id='deleteModal'>
                <i className='close icon'/>
                <div className='header'>
                    Delete File
                </div>
                <div className='image content'>
                    <div className='image'>
                        <i className='file icon'/>
                    </div>

                    <div className='description'>
                        <p className='delete_fileName'>Delete {this.props.deletedFile} ?</p>
                    </div>
                </div>
                <div className='actions'>
                    <div className='two fluid ui inverted buttons'>
                        <button className='ui cancel button'>Cancel</button>
                        <div className='or'></div>
                        <button className='ui negative button' onClick={() => {
                            this.props.deleteFile({path: this.props.deletedFilePath})
                        }}>Delete
                        </button>
                    </div>
                </div>
            </div>
        )
    }
});

export default Layout