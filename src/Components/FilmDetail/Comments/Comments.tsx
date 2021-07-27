import React, {ChangeEvent, useState} from 'react';
import Comment from "./Comment/Comment";
import backImg from "../../../assets/images/back.png"

type CommentType = {
    author: string
    date: string
    text: string
    id: number
}

interface CommentsProps {
    filmId: number
}

const Comments:React.FC<CommentsProps> = ({filmId}) => {

    let commentsJSON = localStorage.getItem(`film_comments_${filmId}`)

    let comments = [] as Array<CommentType>

    comments.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0)

    if (commentsJSON){
        comments = JSON.parse(localStorage.getItem(`film_comments_${filmId}`) as string) as Array<CommentType>
    }

    const [value, setValue] = useState('')

    const [commentsState, setCommentsState] = useState(comments)

    const onSubmit = (e:React.SyntheticEvent) => {
        e.preventDefault()
        let newComment = {
            id: comments[comments.length - 1] ? comments[comments.length - 1].id + 1 : 1,
            author: 'You',
            date: new Date(Date.now()).toString(),
            text: value
        }
        comments.push(newComment)
        localStorage.setItem(`film_comments_${filmId}`, JSON.stringify(comments))
        setCommentsState(prev => [...prev, newComment])
        setValue('')
    }
    const onChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value)
    }

    return (
        <div className="comments">
            <ul className="comments__list">
                {commentsState.sort((a, b) => a.id < b.id ? 1 : a.id > b.id ? -1 : 0).map(comment => {
                    return(
                        <Comment
                            key={comment.id}
                            author={comment.author}
                            date={comment.date}
                            text={comment.text}
                        />
                    )
                })}
            </ul>
            <form onSubmit={onSubmit} className="comments__form">
                <div className="form__field">
                                <textarea onChange={onChange} value={value} className="comment-area" name="comment-area" cols={30} rows={10}
                                          placeholder="Leave a comment"/>
                    <button style={{border: 'none'}} className="back-button">
                        <img src={backImg} alt=""/>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Comments;