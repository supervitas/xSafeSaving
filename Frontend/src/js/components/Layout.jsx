import React from "react";
import $ from "jquery";

export const Layout = React.createClass({
	render() {
		let layout = <NotAuthedLayout/>;
		if (this.props.user) {
			layout = <AuthedLayout
				addTag={this.props.addTag}
				deleteTag={this.props.deleteTag}
                files={this.props.files}
                getFiles={this.props.getFiles}
                deleteFile={this.props.deleteFile}
                popularTags={this.props.popularTags}
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
		return {deletedFileName: '', deletedFilePath: '', tagFilePath: '', currentTags: [], tagFileName: ''};
	},
	changeDeletedFileNameOrPath (name, path) {
		this.setState({deletedFileName: name, deletedFilePath: path});
	},
	changeTagFile (path, currentTags, fileName) {
		this.setState({tagFilePath: path, currentTags: currentTags, tagFileName: fileName})
	},
	removeLocalTagsForFile(tag) {
		this.setState({currentTags: this.state.currentTags.filter((el) => {
			return el !== tag
		})});
	},
	addLocalTagForFile(tag) {
		if(this.state.currentTags.indexOf(tag) === -1) {
			this.state.currentTags.push(tag)
		}
	},
	loadFilesByTag(obj) {
		this.props.getFiles(obj)
	},
	getChildContext() {
		return {
			changeDeletedFileNameOrPath: this.changeDeletedFileNameOrPath,
			changeTagFile: this.changeTagFile,
			loadFilesByTag: this.loadFilesByTag
		};
	},
	render () {
		const content = this.props.files.map((result, number) => {
			const contentType = result['content-type'];
			const type = contentType.substring(0, contentType.lastIndexOf('/'));
			switch (type) {
				case 'image': {
					return (<Image key={number} name={result.filename} src={result.path} tags={result.tags}/>);
				}
				case 'video': {
					return (<Video key={number} name={result.filename}
                                   src={result.path} tags={result.tags}/>);
				}
				default: {
					return (<MediaObject key={number} name={result.filename} src={result.path} tags={result.tags}/>);
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
	            <TagModal filePath={this.state.tagFilePath} tagFileName={this.state.tagFileName}
	                      addTag={this.props.addTag}
	                      tagsArr={this.state.currentTags}
	                      changeLocalTagsArrParrent={this.removeLocalTagsForFile}
	                      addLocalTagForFile={this.addLocalTagForFile}
	                      popularTags={this.props.popularTags}
	                      deleteTag={this.props.deleteTag}/>
            </div>
		)
	}
});
AuthedLayout.childContextTypes = {
	changeDeletedFileNameOrPath: React.PropTypes.func,
	changeTagFile: React.PropTypes.func,
	loadFilesByTag: React.PropTypes.func
};

const Image = React.createClass({
	render () {
		return (
            <div className='column center aligned'>
                <img className='ui fluid image' src={this.props.src}/>
                <MediaInfo name={this.props.name} src={this.props.src} tags={this.props.tags}/>
            </div>
		)
	}
});

const Video = React.createClass({
	render () {
		return (
            <div className='column center aligned'>
                <video className='ui fluid image' preload='metadata' controls src={this.props.src}/>
                <MediaInfo name={this.props.name} src={this.props.src} tags={this.props.tags} />
            </div>
		)
	}
});

const MediaObject = React.createClass({
	render () {
		return (
            <div className='column center aligned'>
                <div className='ui'>
                    <img className='file-image' src='/upload/rsz_file.png'/>
                    <MediaInfo name={this.props.name} src={this.props.src} tags={this.props.tags}/>
                </div>
            </div>
		)
	}
});

const MediaInfo = React.createClass({
	render () {
		let tags;
		const tagsArr = [];
		if (this.props.tags && this.props.tags.length > 0) {
			this.props.tags.map((item) => {
				tagsArr.push(item);
			});
			tags = <Tags onTagClicked={this.context.loadFilesByTag} tags={this.props.tags}/>;
		}

		return (
            <div className='media-info'>
	            <a href={this.props.src}>
		            {this.props.name}
	            </a>
	            <i className='remove link icon delete_file'
	               onClick={() => {
		               this.context.changeDeletedFileNameOrPath(this.props.name, this.props.src);
		               $('#deleteModal').modal('show')
	               }}>
	            </i>

	            <div className='media-tags-container'>
		            {tags}
		            <div className="add-tag">
			            <button className="ui primary positive basic button small" onClick={() => {
				            this.context.changeTagFile(this.props.src, tagsArr, this.props.name);
				            $('#tagModal').modal({ onApprove() {
					            return false; // for not closing modal on tags
				            }}).modal('show')
			            }}>Manage Tags</button>
		            </div>
	            </div>
            </div>
		)
	}
});
MediaInfo.contextTypes = {
	changeDeletedFileNameOrPath: React.PropTypes.func,
	changeTagFile: React.PropTypes.func,
	loadFilesByTag: React.PropTypes.func
};

const Tags = React.createClass({
	render() {
		const tagsArr = [];
		this.props.tags.map((item, index) => {
			tagsArr.push(<Tag onTagClicked={this.props.onTagClicked} tag={item} key={index}/>);
		});
		return (
			<div className='tags'>
				Tags: {tagsArr}
			</div>
		)
	}
});

const Tag = React.createClass({
	render() {
		return <button onClick={() => this.props.onTagClicked({tag: this.props.tag, skip: 0})}
		               className="ui secondary basic tiny button">{this.props.tag}</button>
	}
});

const ModalTag = React.createClass({
	render() {
		return (
			<button onClick={() => this.props.deleteTag(this.props.tag)}
		               className="ui secondary basic negative button">{this.props.tag}</button>
		)
	}
});

const PopularTag = React.createClass({
	render() {
		return (
			<button onClick={() => this.props.addTag(this.props.tag)}
			        className="ui primary basic orange  button">{this.props.tag}</button>
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

                    <div className='description '>
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

const PopularTags = React.createClass({
	handleAddTag(tag){
		this.props.addLocalTag(tag);
		this.props.addTag({tag: tag, path: this.props.filePath})
	},
	render() {
		const tags = this.props.popularTags.map((tag, index) => {
			{return <PopularTag addTag={this.handleAddTag} tag={tag} key={index}/>}
		});
		return(
			<div className="popular_tags_text">
				Popular Tags: {tags}
			</div>
		)
	}
});

const TagModal = React.createClass({
	getInitialState() {
		return {tag: ''}
	},
	handleTagChange(e) {
		this.setState({tag: e.target.value.substr(0, 12)});
	},
	handleTagDelete(tag) {
		this.props.changeLocalTagsArrParrent(tag);
		this.props.deleteTag({tag: tag, path: this.props.filePath})
	},
	componentWillReceiveProps() {
		this.setState({tag: ''})
	},
	render () {
		let popularTags;
		if (this.props.popularTags.length > 0) {
			popularTags = <PopularTags
				filePath={this.props.filePath}
				addLocalTag={this.props.addLocalTagForFile}
				addTag={this.props.addTag} popularTags={this.props.popularTags}/>
		}
		return (
			<div className='ui small modal' id='tagModal'>
				<i className='close icon'/>
				<div className='header'>
					Manage Tags for {this.props.tagFileName}
				</div>

				<div className="description tags_modal_container">
					<div className="current_tags_text">
						Current Tags:
					</div>
					{this.props.tagsArr.map((item, index) => {
							return <ModalTag deleteTag={this.handleTagDelete} tag={item} key={index}/>
						})
					}
				</div>
				<div className='content new_tag_input_container'>
					{popularTags}
					<div className="ui focus input" >
						<input onChange={this.handleTagChange} value={this.state.tag} type="text" placeholder="New Tag"/>
					</div>
				</div>
				<div className='actions'>
					<div className='two fluid ui inverted buttons'>
						<button className='ui cancel button'>Cancel</button>
						<div className='or'/>
						<button className='ui positive primary button' onClick={() => {
							this.props.addLocalTagForFile(this.state.tag);
							this.props.addTag({path: this.props.filePath, tag: this.state.tag})
						}}>Add Tag</button>
					</div>
				</div>
			</div>
		)
	}
});


export default Layout