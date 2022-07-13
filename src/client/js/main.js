import 'regenerator-runtime';
import "../scss/styles.scss";


document.addEventListener("contextmenu", e => {
    e.target.matches("img") && e.preventDefault()
});

