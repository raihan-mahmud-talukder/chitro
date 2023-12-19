import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

export const Photos = () => {
    const [photos, setPhotos] = useState([])
    const [duplicate, setDuplicate] = useState([])
    const [filter, setFilter] = useState('all')
    document.title = 'PHOTOS'

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = (await axios.get('/api/photos/getallphotos')).data
                setPhotos(data)
                setDuplicate(data)
            } catch (error) { console.log(error) }
        }
        fetchData()
    }, [])

    const filtered = event => {
        setFilter(event)
        if (event !== 'all') {
            const temp = duplicate.filter(photo => photo.category === event)
            setPhotos(temp)
        } else {
            setPhotos(duplicate)
        }
    }

    return (
        <div className="photos">
            <span>Filter:</span>
            <select value={filter} onChange={event => filtered(event.target.value)}>
                <option value="all">All</option>
                <option value="nature">Nature</option>
                <option value="wild life">Wild Life</option>
                <option value="pet life">Pet Life </option>
                <option value="ice life">Ice Life</option>
                <option value="rural life">Rural Life</option>
                <option value="domestic life">Domestic Life</option>
                <option value="water life">Water Life</option>
            </select>
            <h4>{photos.length} photos are available</h4>
            {photos.map(photo => { return <Photo photo={photo} key={photo._id} /> })}
        </div>
    )
}
const Photo = ({ photo }) => {
    const [feedback, setFeedback] = useState()
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('currentUser'))
    if (user) {user.feedback = feedback}

    const privateRoute = () => {
        if (user) {
            navigate(`/feedback/${photo._id}`)
            localStorage.setItem('currentUser', JSON.stringify(user))
        } else {
            alert('login first!')
            navigate('/login')
        }
    }
    return (
        <div className="photo">
            <img src={photo.img} alt={photo.name} />
            <form onSubmit={privateRoute}>
                <h3>{photo.name}</h3>
                <span>Write a Feedback:</span>
                <textarea
                    placeholder="express your feelings"
                    required
                    maxLength={500}
                    value={feedback}
                    onChange={event => setFeedback(event.target.value)}
                /><br />
                <p>{photo.category}</p>
                <button type="submit">Submit Reveiw</button>
            </form>
        </div>
    )
}