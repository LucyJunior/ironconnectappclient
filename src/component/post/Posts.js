
import React, { Component } from "react";
import { list } from "./apiPost";
import DefaultPost from '../../images/Ironhack.png';
import { Link } from "react-router-dom";




class Posts extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            page: 1
        };
    }

    loadPosts = page => {
        list(page).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data });
            }
        });
    };

    componentDidMount() {
        this.loadPosts(this.state.page);
    }



    renderPosts = posts => {
        return (
            <div className="row mb-5">
                {posts.map((post, i) => {
                    const posterId = post.postedBy
                        ? `/user/${post.postedBy._id}`
                        : "";
                    const posterName = post.postedBy
                        ? post.postedBy.name
                        : " Unknown";

                    return (
                        <div className="card-body card-cascade wider col-md-3 mb-5 mt-2 ml-5 " key={i}>
                            <div className="card-body view view-cascade overlay">
                                <img 
                                    src={`${
                                        process.env.REACT_APP_API_URL
                                    }/post/photo/${post._id}`}
                                    alt={post.title}
                                    onError={i =>
                                        (i.target.src = `${DefaultPost}`)
                                    }
                                    className="card-img-top  mb-3"
                                    style={{ height: "200px", width: "100%" }}
                                />
                                <h5 className="card-title"><strong>{post.title}</strong></h5>
                                <p className="card-text">
                                    {post.body.substring(0, 100)}
                                </p>
                                <br />
                                <p className="card-footer text-white text-center mt-4 font-italic mark btn-info bg-info rounded">
                                    Posted by{" "}
                                    <Link to={`${posterId}`}>
                                        {posterName}{" "}
                                    </Link>
                                    on {new Date(post.created).toDateString()}
                                </p>
                                <Link
                                    to={`/post/${post._id}`}
                                    className="btn btn-raised btn-info btn-sm rounded"
                                >
                                    Read more
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    //because is it an erray we need to check for the length in line 100
    render() {
        const { posts, page } = this.state;
        return (
            <div className="container mb-5 text-center text-white ">
                <h2 className="mt-5 mb-5 bg-info">
                    {!posts.length ? "There's no posts yet!" : "Recent Posts"}
                </h2>

                {this.renderPosts(posts)}

                
            </div>
        );
    }
}

export default Posts;