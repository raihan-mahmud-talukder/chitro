import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios'

export const Review = () => {
    const [photo, setPhoto] = useState()
    const { photoid } = useParams()
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('currentUser'))

    useEffect(() => {
        const fetchData = async () => {
            if (!user) { navigate = '/login' }
            try {
                const data = (await axios.post('/api/photos/getphotobyid', { photoid })).data
                setPhoto(data)
            } catch (error) { console.log(error) }
        }
        fetchData()
    }, [])

    const confirmed = async () => {
        const review = { review, user }
        try {
            const result = await axios.post('/api/reviews/reviewphoto', review)
            alert('Review is submitted!')
            navigate('/photos')
        }
        catch (error) { console.log(error) }
    }

    return (
        <div className="review">
            <div className="photo">
                <h3>Review Details</h3>
                {photo && (
                    <>
                        <div className="info">
                            <img src={photo.img} alt={photo.name} />
                            <div className="details">
                                <span>{photo.name}</span><br />
                                <span><b>Name: </b>{user.name}</span><br />
                                <span><b>Email: </b>{user.email}</span><br />
                                <span><b>Mobile: </b>{user.mobile}</span><br />
                                <span><b>Admin: </b>{user.admin ? 'YES' : 'NO'}</span><br />
                                <p>{room.type}</p>
                                <button onClick={confirmed}>Confirm</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
