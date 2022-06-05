import axios from 'axios'
import React from 'react'

class VideoDownload extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            video_urls: '',
            audio_format: '',
            freshInterval: null,
            playlist: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getPlaylist = this.getPlaylist.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleChange(event) {
        const value = event.target.value
        this.setState({
            ...this.state,
            [event.target.name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault()

        const formData = new FormData()
        formData.append('video_urls', this.state.video_urls.split(','))
        formData.append('audio_format', this.state.audio_format)

        const headers = { 'Content-Type': 'application/json' }
   
        // Post Request
        axios.post('http://127.0.0.1:8000/api/fastapi/tasks/video/youtube_dl', formData, headers)
        .then((res) => {
            if (res.status == 200) {
                alert('Commit success!')
            }
        })
        .catch((err) => alert(err))
    }

    getPlaylist() {
        axios.get('http://127.0.0.1:8000/api/fastapi/tasks/playlist')
        .then((res) => {
            if (res.status == 200) {
                this.setState({
                    ...this.state,
                    playlist: res.data
                })
                console.log(this.state.playlist)
            }
        })
    }

    handleClick(filename) {
        const headers = { 'Content-Type': 'application/octet-stream' }
   
        // Post Request
        axios.get('http://127.0.0.1:8000/api/fastapi/tasks/playlist/download', {
                params: { filename: filename }
            }, headers)
        .then((res) => {
            // create blob link to download
            const url = window.URL.createObjectURL(
                new Blob([res.data], { type: res.headers['content-type'], encoding: 'UTF-8' })
            )
            
            const filename = res.headers['content-disposition'].split('"')[1]
            console.log(filename)

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

    componentDidMount() {
        this.state.freshInterval = setInterval(() => {
            this.getPlaylist()
        }, 10000)
    }

    componentWillUnmount() {
        clearInterval(this.state.freshInterval)
    }

    render() {
        return (
            <div style={{padding: "20px", fontFamily: "Arial", align: "center"}}>
                <form onSubmit={this.handleSubmit}>
                    <h2>Youtube Video</h2>

                    <label>Video Ids:</label>
                    <input type="text" name="video_urls" required placeholder='video id or url' onChange={this.handleChange} />

                    <label>Audio Format:</label>
                    <select name="audio_format" value={this.state.audio_format} onChange={this.handleChange}>
                        <option value="">Select</option>
                        <option value="mp3">mp3</option>
                        <option value="m4a">m4a</option>
                        <option value="wav">wav</option>
                    </select>

                    <button type="submit">Submit</button>
                </form>
                <div>
                    <h2>PlayList</h2>
                    <ol>
                        {this.state.playlist.map((item, i) => {
                            return <li key={i}><a href="javascript:void(0);" onClick={() => this.handleClick(item.filename)}>{item.filename}</a> &emsp; {item.filesize}</li>
                        })}
                    </ol>
                </div>
            </div>
            
        )
    }
}

export default VideoDownload