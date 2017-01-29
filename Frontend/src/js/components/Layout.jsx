import React from "react";
import $ from "jquery";

export const Layout = React.createClass({
	render() {
		let layout = <NotAuthedLayout/>;
		if (this.props.user) {
			layout = <AuthedLayout
                files={this.props.files}
                getFiles={this.props.getFiles}
                deleteFile={this.props.deleteFile}
                filesCount={this.props.filesCount}/>
		}
		return (
            <div>
	            {layout}
            </div>
		)
	},
});

const NotAuthedLayout = React.createClass({
	render () {
		return (
            <div className='container not-authed_layout'>
                <div className='ui text container'>
                    <h1 className='ui header'>
                        xSafeSaving
                    </h1>
                    <h2>Save your files and access them anywhere, anytime.</h2>
                </div>
            </div>
		)
	}
});

const AuthedLayout = React.createClass({
	componentWillMount () {
		this.props.getFiles({skip: 0})
	},
	getInitialState () {
		return {deletedFileName: '', deletedFilePath: ''};
	},
	changeDeletedFileNameOrPath (name, path) {
		this.setState({deletedFileName: name, deletedFilePath: path});
	},

	render () {
		const content = this.props.files.map((result, number) => {
			const contentType = result['content-type'];
			const type = contentType.substring(0, contentType.lastIndexOf('/'));
			switch (type) {
				case 'image': {
					return (<Image changeDeleteFile={this.changeDeletedFileNameOrPath}
                                   key={number} name={result.filename} src={result.path}/>);
				}
				case 'video': {
					return (<Video changeDeleteFile={this.changeDeletedFileNameOrPath}
                                   key={number} name={result.filename} src={result.path}/>);
				}
				default: {
					return (<MediaObject changeDeleteFile={this.changeDeletedFileNameOrPath}
                                         key={number} name={result.filename} src={result.path}/>);
				}
			}
		});

		return (
            <div>
                <div className='ui two column doubling stackable grid container'>
					{content}
                </div>
				{content.length > 0 ? <Pagination filesCount={this.props.filesCount}
                                                  getFiles={this.props.getFiles}/> : false}
                <DeleteModal deleteFile={this.props.deleteFile}
                             deletedFile={this.state.deletedFileName} deletedFilePath={this.state.deletedFilePath}/>
	            <TagModal/>
            </div>
		)
	}
});

const Image = React.createClass({
	render: function () {
		return (
            <div className='column center aligned'>
                <img className='ui fluid image' src={this.props.src}/>
                <MediaInfo changeDeleteFile={this.props.changeDeleteFile} name={this.props.name} src={this.props.src}/>
            </div>
		)
	}
});

const Video = React.createClass({
	render: function () {
		return (
            <div className='column center aligned'>
                <video className='ui fluid image' preload='metadata' controls src={this.props.src}/>
                <MediaInfo changeDeleteFile={this.props.changeDeleteFile} name={this.props.name} src={this.props.src}/>
            </div>
		)
	}
});

const MediaObject = React.createClass({
	render: function () {
		return (
            <div className='column center aligned'>
                <div className='ui'>
                    <img className='file-image' src='/upload/rsz_file.png'/>
                    <MediaInfo changeDeleteFile={this.props.changeDeleteFile} name={this.props.name}
                               src={this.props.src}/>
                </div>
            </div>
		)
	}
});

const MediaInfo = React.createClass({
	render () {
		return (
            <div className='media-info'>
	            <a href={this.props.src}>
		            {this.props.name}
	            </a>
	            <i className='remove link icon delete_file'
	               onClick={() => {
		               this.props.changeDeleteFile(this.props.name, this.props.src);
		               $('#deleteModal').modal('show')
	               }}>
	            </i>

	            <div className='media-tags-container'>
		            <div className='tags'>
		                Tags: <button>123</button>
		            </div>
		            <div className="add-tag">
			            <button className="ui primary basic button small" onClick={() => {
				            this.props.changeDeleteFile(this.props.name);
				            $('#tagModal').modal('show')
			            }}>Add Tag</button>
		            </div>
	            </div>
            </div>
		)
	}
});

const Pagination = React.createClass({
	getInitialState () {
		return {currentPage: 1}
	},
	getNewFiles(pageNumber) {
		this.setState({currentPage: pageNumber + 1});
		this.props.getFiles({skip: pageNumber * 20});
		$('html, body').animate({scrollTop: 0}, 'slow');
	},
	render () {
		const pageCount = Math.floor(this.props.filesCount / 20) + 1;
		const arr = [];
		const that = this;
		for (let i = 0; i < pageCount; i++) {
			arr.push({page: i + 1, isActive: i + 1 === that.state.currentPage})
		}
		return (
            <div className='ui center aligned container'>
                <div className='ui pagination menu'>
					{arr.map((result, index) => {
						return <a className={result.isActive ? 'item active' : 'item'}
                                  onClick={() => that.getNewFiles(index)}
                                  key={index}> {result.page}</a>
					})}
                </div>
            </div>
		)
	}
});

const DeleteModal = React.createClass({
	render () {
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
                        }}>Delete</button>
                    </div>
                </div>
            </div>
		)
	}
});

const TagModal = React.createClass({
	render () {
		return (
			<div className='ui small modal' id='tagModal'>
				<i className='close icon'/>
				<div className='header'>
					Modify Tags
				</div>
				<div className='image content'>

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
						}}>Delete</button>
					</div>
				</div>
			</div>
		)
	}
});

export default Layout