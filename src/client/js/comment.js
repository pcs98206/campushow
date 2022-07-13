const inputContainer = document.querySelector(".see_comments-add");
const see = document.querySelector(".see");
const input = document.getElementById("comment_input");
const commentContainer = document.querySelector(".see_comments-container");
const detBtns = document.querySelectorAll(".comment_delBtn");

const deleteComment = (event) => {
    const div = event.target.parentElement;
    commentContainer.removeChild(div);

};

const addComment = (text, newCommentId) => {
    const div = document.createElement("div");
    div.className = "comment_container";
    const span = document.createElement("span");
    const btn = document.createElement("button");
    span.innerText=text;
    btn.innerText="❌";
    div.dataset.id = newCommentId;
    commentContainer.prepend(div);
    div.appendChild(span);
    div.appendChild(btn);
    btn.addEventListener('click', deleteComment);
};

const handleDelete = async(event) => {
    const comment = event.target.parentElement;
    const commentId = comment.dataset.id;
    const response = await fetch(`/api/comment/${commentId}/delete`,{
        method: 'delete'
    });
    if(response.status===200){
        deleteComment(event);
    }
};

const handleSubmit = async(event) => {
    event.preventDefault();
    const text = input.value;
    const fileId = see.dataset.id;
    if(text === ""){
        return;
    };
    const response = await fetch(`/api/${fileId}/comment`, {
        method: 'post',
        body: JSON.stringify({text}),
        headers: {
            "Content-Type" : "application/json"
        }
    });
    if(response.status === 201){
        const json = await response.json();
        const {newCommentId} = json;
        addComment(text, newCommentId);
    }
    input.value="";
}

if(inputContainer){
    inputContainer.addEventListener("submit", handleSubmit);
};

detBtns.forEach(deleteBtn => deleteBtn.addEventListener("click", handleDelete));