import React from 'react';

interface CommentProps {
    author: string,
    date: string,
    text: string
}

const Comment: React.FC<CommentProps> = ({author, date, text}) => {
    return (
        <li className="comments__item">
            <div className="comments__item-head">
                <span className="comments__author">{author} | </span>
                <span className="comments__date">{date}</span>
            </div>
            <div className="comments__item-text">
                {text}
            </div>
        </li>
    );
};

export default Comment;