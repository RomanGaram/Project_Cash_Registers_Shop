let goBackButton = document.querySelector('.go_back');
goBackButton.addEventListener('click', () => {
    history.go(-1);
})