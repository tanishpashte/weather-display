document.addEventListener('DOMContentLoaded', () => {
    let outsideBox = document.getElementById("outside-box");
    let insideCircle = document.getElementById("inside-circle");
    let toggleButton = document.getElementById("dark-light-toggle")
    let toggleIcon = document.getElementById("toggle-icon");
    


    toggleButton.addEventListener('click', () => {
        toggleDisplay();
    })


    

    function toggleDisplay(){
        insideCircle.classList.toggle("translate-x-8")

        setTimeout(() => {
            outsideBox.classList.toggle("fa-sun")
            toggleIcon.classList.toggle("fa-moon")
            outsideBox.classList.toggle("bg-slate-200")
            outsideBox.classList.toggle("bg-zinc-900")
            outsideBox.classList.toggle("border")
        }, 280)
        
    }

    function displayDate(){

    }
})