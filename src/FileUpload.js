import axios from 'axios'
import React, {Component} from 'react'

class FileUpload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedFile: null,
        }
        this.onFileChange = this.onFileChange.bind(this)
        this.onFileUpload = this.onFileUpload.bind(this)
    }

    onFileChange(event) {
        this.setState({ selectedFile: event.target.files[0] })
    }

    onFileUpload() {
        const formData = new FormData()
        formData.append('upfile', this.state.selectedFile)
        formData.append('name', this.state.selectedFile.name)

        const headers = { 'Content-Type': 'application/octet-stream' }
   
        // Post Request
        axios.post('http://127.0.0.1:8000/api/fastapi/tasks/subtitle/csv_to_text', formData, headers)
        .then((res) => {
          // create blob link to download
          const url = window.URL.createObjectURL(
            new Blob([res.data], { type: res.headers['content-type'], encoding: 'UTF-8' })
          )
          
          const filename = res.headers['content-disposition'].split('"')[1]
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', filename)

          // append to html link element page
          document.body.appendChild(link)

          // start download
          link.click()

          // clean up and remove the link
          link.remove()
        })
        .catch((err) => alert(err))
    }

    render() {
        const upStyle = {
          padding: "20px",
          fontFamily: "Arial",
          align: "center"
        }
        return (
            <div style={upStyle}>
                <h2>Subtitle Converter</h2>

                <p>Upload <i>.csv</i> Output <i>.txt</i> Paste to <a href="https://readlang.com/upload">ReadLang</a></p>
                <input type="file" onChange={this.onFileChange} />
                <button onClick={this.onFileUpload}>Submit!</button>
            </div>
        )
    }
}

export default FileUpload