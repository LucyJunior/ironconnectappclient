import React, { Component } from 'react';
import { singlePost, remove } from './apiPost';
import DefaultPost from '../../images/Ironhack.png';
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth';

class SinglePost extends Component {
    state = {
        post: '',
        redirectToHome: false,
        redirectToSignin: false
    };

    componentDidMount = () => {
        const postId = this.props.match.params.postId;

            

        singlePost(postId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    post: data,
                
                });
            }
        });
    };


    deletePost = () => {
        const postId = this.props.match.params.postId;
        const token = isAuthenticated().token;
        remove(postId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ redirectToHome: true });
            }
        });
    };

    deleteConfirmed = () => {
        let answer = window.confirm('Are you sure you want to delete your post?');
        if (answer) {
            this.deletePost();
        }
    };

    renderPost = post => {
        const posterId = post.postedBy ? `/user/${post.postedBy._id}` : '';
        const posterName = post.postedBy ? post.postedBy.name : ' Unknown';

        return (
            <div className="card-body text-center text-dark">
                <img
                    src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                    alt={post.title}
                    onError={i => (i.target.src = `${DefaultPost}`)}
                    className="img-thunbnail mb-3"
                    style={{
                        height: '300px',
                        width: '100%',
                        objectFit: 'cover'
                    }}
                />

                <p className="card-text text-center text-white">{post.body}</p>
                <br />
                <p className="font-italic mark text-center text-white">
                    Posted by <Link to={`${posterId}`}>{posterName} </Link>
                    on {new Date(post.created).toDateString()}
                </p>
                <div className="d-inline-block">
                    <Link to={`/`} className="btn btn-raised btn-muted btn-sm mr-5">
                        Back to posts
                    </Link>

                    <>
                        {isAuthenticated().user && isAuthenticated().user._id === post.postedBy._id && (
                            <div class="card mt-5">
                                <div className="">
                                    <button onClick={this.deleteConfirmed} className="btn btn-raised btn-muted">
                                        Delete Posts
                                    </button>
                                </div>
                            </div>
                        )}
                    </>

                </div>
            </div>
        );
    };

    render() {
        const { post, redirectToHome, redirectToSignin } = this.state;

        if (redirectToHome ) {
            return <Redirect to={`/`} />;
        } else if (redirectToSignin) {
            return <Redirect to={`/signin`} />;
        }

        return (
            <div className="container">
                <h2 className="display-2 mt-5 mb-5 text-center text-white">{post.title}</h2>

                {!post? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    this.renderPost(post)
                )}

              
            </div>
        );
    }
}

export default SinglePost;



