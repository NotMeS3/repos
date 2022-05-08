const fs = require('fs')
const path = require('path')

class FilesController_v1 {
    getAll(req, res){
        const dir = req.query.q

        if (dir) {
            fs.access(`./_FILES_/${dir}`, (err) => {
                if (err && err.code === 'ENOENT'){
                    res.status(400).json({
                        "status": 400,
                        "message": "The transmitted path does not exist"
                    })
                } else {
                    let files = {
                        files: [],
                        folders: []
                    }

                    fs.readdirSync(`./_FILES_/${dir}`, { withFileTypes: true })
                        .map(el => {
                            el.isDirectory() ? files.folders.push(el) : files.files.push(el)
                        })

                    // Send answer

                    res.status(200).json({
                        "status": 200,
                        "attachments": files,
                        "directory": dir
                    })
                }
            })
        } else {
            res.status(400).json({
                "status": 400,
                "message": "Invalid request"
            })
        }
    }

    createDir(req, res){
        const { dir } = req.body;

        if (dir){
            fs.access(`./_FILES_/${dir}`, (err) => {
                if (err && err.code === 'ENOENT'){
                    fs.mkdirSync(`./_FILES_/${dir}`, { recursive: true })
                    res.status(201).json({
                        "status": 201,
                        "message": "Directory created",
                        "directory": dir
                    })
                } else {
                    res.status(409).json({
                        "status": 409,
                        "message": "The directory already exists"
                    })
                }
            })
        } else {
            res.status(400).json({
                "status": 400,
                "message": "Invalid request"
            })
        }
    }


    async uploader(req, res){
        const file = req.files.file
        const dir = req.body.dir

        if (file && dir){
            // Make to checking dir
            fs.access(`./_FILES_/${dir}`, function(err) {
                if (err && err.code === 'ENOENT') {
                    fs.mkdirSync(`./_FILES_/${dir}`, { recursive: true })
                }

                file.mv(path.resolve(`./_FILES_/${dir}/${file.name}`))

                res.status(200).json({
                    "status": 200,
                    "message": "File uploaded",
                    "filename": file.name
                })
            })


        }  else {
            res.status(400).json({
                "status": 400,
                "message": "Invalid request"
            })
        }
    }

    remover(req, res){
        const {item} = req.body
        if (item){
            if (fs.existsSync(path.resolve(`./_FILES_/${item}`)) && item!=="/"){
                if (fs.lstatSync(path.resolve(`./_FILES_/${item}`)).isDirectory()){
                    fs.rmSync(`./_FILES_/${item}`, { recursive: true, force: true })
                } else {
                    fs.unlinkSync(`./_FILES_/${item}`);
                }
                res.status(200).json({
                    "status": 200,
                    "message": "The object has been deleted"
                })
            } else {
                res.status(404).json({
                    "status": 404,
                    "message": "The object does not exist"
                })
            }
        } else {
            res.status(400).json({
                "status": 400,
                "message": "Invalid request"
            })
        }
    }
}

module.exports = new FilesController_v1()