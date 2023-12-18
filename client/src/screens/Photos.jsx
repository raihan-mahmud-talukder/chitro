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
                console.log(photos)
            } catch (error) { console.log(error) }
        }
        fetchData()
    }, [])

    const filtered = event => {
        setFilter(event)
        if (event !== 'all') {
            if (event === 'ac') {
                const temp = duplicate.filter(room => room.ac)
                setPhotos(temp)
            } else if (event === 'dining') {
                const temp = duplicate.filter(room => room.dining)
                setPhotos(temp)
            } else if (event === 'washroom') {
                const temp = duplicate.filter(room => room.washroom)
                setPhotos(temp)
            } else {
                const temp = duplicate.filter(room => room.type === event)
                setPhotos(temp)
            }
        } else { setPhotos(duplicate) }
    }

    const available = duplicate.filter(room => room.availability)

    return (
        <div className="rooms">
            <span>Filter:</span>
            <select value={filter} onChange={event => filtered(event.target.value)}>
                <option value="all">All</option>
                <option value="economy">Economy</option>
                <option value="family">Family</option>
                <option value="premium">Premium</option>
                <option value="luxury">Luxury</option>
                <option value="corporate">Corporate</option>
                <option value="ac">A/C</option>
                <option value="washroom">Washroom</option>
                <option value="dining">Dining</option>
            </select>
            <h4>{available.length} of {photos.length} rooms are available</h4>
            {photos.map(photo => { return <Photo photo={photo} key={photo._id} /> })}
        </div>
    )
}
const Photo = ({ photo }) => {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('currentUser'))

    const privateRoute = () => {
        if (user) {
            navigate(`/book/${photo._id}`)
        } else {
            alert('login first!')
            navigate('/login')
        }
    }
    return (
        <div className="photo">
            <img src={photo.img} alt={photo.name} />
            <form className="info" onSubmit={privateRoute}>
                <h3>{photo.name}</h3>
                <span>Write a Review:</span>
                <textarea /><br />
                <p>{photo.category}</p>
                <button type="submit">Submit Reveiw</button>
            </form>
        </div>
    )
}
