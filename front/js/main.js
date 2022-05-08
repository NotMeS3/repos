// 
$(function () {
    let dir = [];
    let wrapper = document.querySelector('.project__list-names')
    let nameFolder = document.querySelector('.modal-body__input-visible')
    let backDir;
    function getAll () {
        new Promise((resolve, reject) => {
            fetch(`http://127.0.0.1:5000/api/v1/files/all?q=/${dir.join('/')}`)

            .then(resp => {return resp.json()})
            .then(data => {
                console.log(data)
                for (let i = 0; i < data.attachments.folders.length; i++) {
                    wrapper.innerHTML += `<div class="project__item"><a class="project__item-link" href="#"><img class="project__item-img" src="images/folder.png" alt="#"><div class="project__item-name">${data.attachments.folders[i].name}</div></a></div>`
                }
                for (let i = 0; i < data.attachments.files.length; i++) {
                    let nameArray = data.attachments.files[i].name.split('.')
                    let nameType = nameArray[nameArray.length - 1];
                    if ((nameType == 'html') || (nameType == 'js') || (nameType == 'css') || (nameType == 'docx') || (nameType == 'doc')) {
                        if (nameType == 'doc') {
                            nameType = 'docx'
                        }
                    } else {
                        nameType = 'quest'
                    }
                    wrapper.innerHTML += `<div class="project__item"><a class="project__item-link" href="../../back/api-file-manager-master/_FILES_/${dir.join('/')}/${nameArray.join('.')}" download target=_blank><img class="project__item-img" src="images/${nameType}.png" alt="#"><div class="project__item-name">${data.attachments.files[i].name}</div></a></div>`
                    
                }
                let blocks = document.querySelectorAll('.project__item-name')
                for (let x = 0; x < blocks.length; x++) {
                    if (blocks[x].innerHTML.split('.').length < 2) {
                        blocks[x].addEventListener('click', directoryAll) 
                    }
                }
                if (dir.length >= 1) {
                    backDir = document.querySelector('.project__item-back')
                    backDir.addEventListener('click', function () {
                        dir.pop()
                        directoryAll()
                    })
                }
                console.log(dir)
            })
            .catch(err => {return console.log('Ой, что-то пошло не так,', err)})
        })
    }
    getAll()
    function directoryAll () {
        if (this.innerHTML !== undefined) {
            dir.push(this.innerHTML)
        }
        if (dir.length == 0) {
            wrapper.innerHTML = ''
        } else {
            wrapper.innerHTML = '<div class="project__item"><a class="project__item-back" href="#">...</a></div>'
        }

        getAll()
    }

    // function createFolder() {
    //     console.log(dir.join('/'))
    //     new Promise((resolve, reject) => {
    //         fetch('http://127.0.0.1:5000/api/v1/files/create/dir', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded'
    //             },
    //             body: {
    //                 "dir": JSON.stringify(`/${dir.join('/')}/${inputValue}`)
    //             }
    //         })
    //         .then(response =>{return console.log(response)})
    //     })
    // }
    // ============================ Modal Box ==========================================
    var modal = document.getElementById('myModal');
    var btn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    // ===================================================================================
    let loveInput = document.querySelector('.modal-body__form-input')
    nameFolder.addEventListener('change', () => {
        if (nameFolder.value !== undefined && nameFolder.value[0] !== " " && nameFolder.value !== null) {
            nameFolder.value.replace(/^\s+|\s+$|\s+(?=\s)/g, "")
            if (dir.length == 0) {
                loveInput.value = `/${nameFolder.value}`
            } else {
                loveInput.value = `/${dir.join('/')}/${nameFolder.value}`
            }
        } else {
            alert('Введите название папки!')
        }
        console.log(loveInput.value)
    }) 
});