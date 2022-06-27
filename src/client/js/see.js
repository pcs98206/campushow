const see = document.getElementById("see");

const handleload = () => {
    const { id } = see.dataset;
    fetch(`/api/${id}/view`,{
        method: "post"
    });
}
if(see){
    window.addEventListener('load', handleload)
}