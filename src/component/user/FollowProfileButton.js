import React, { Component } from  'react';

class FollowProfileButon extends Component {
    render() {
        return (
            <div className="d-inline-block">
                {
                    !this.props.following ? 
                    (
                        <button onClickclassName="btn btn-sucess btn-raised mr-5">
                        Follow</button>
                    ) : (

                        <button className="btn btn-warning btn-raised">
                    UnFollow</button>

                    )
                }
                
            </div>

        );
    }
}

export default FollowProfileButon;