import React from 'react';
import {Link} from 'react-router';
import {unixTimeToString} from '../util';
import {likeComment, unlikeComment} from '../server';

export default class Comment extends React.Component {

    constructor(props){
      super(props);
      this.state = props.data;
    }

    handleLikeClick(e){
      e.preventDefault();

      if(e.button === 0){
        var cb = (updatedLikeCounter) => {
          this.setState(
            {likeCounter: updatedLikeCounter}
          );
        }
        if(this.didUserLike()){
          unlikeComment(this.props.feedItemId, this.props.commentIndex, 4, cb);
        }
        else{
          likeComment(this.props.feedItemId, this.props.commentIndex, 4, cb);
        }
      }
    }

didUserLike() {
    var likeCounter = this.state.likeCounter;
    var liked = false;
    // Look for a likeCounter entry with userId 4 -- which is the
    // current user.
    for (var i = 0; i < likeCounter.length; i++) {
        if (likeCounter[i]._id === 4) {
            liked = true;
            break;
        }
    }
    return liked;
}

    render() {
        return (
            <div>
                <div className="media-left media-top">
                    PIC
                </div>
                <div className="media-body">
                  <Link to={"/profile/" + this.props.author._id}>
  {this.props.author.fullName}
</Link>
                     {this.props.children}
                    <br/>
                    <a href="#" onClick={(e)=>this.handleLikeClick(e)}>Like {this.state.likeCounter.length}</a>
                    ·
                    <a href="#">Reply</a>
                    · {unixTimeToString(this.props.postDate)}
                </div>
            </div>
        )
    }
}
