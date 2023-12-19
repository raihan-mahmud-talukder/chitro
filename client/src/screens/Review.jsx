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
        const review = { photo, user }
        try {
            const result = await axios.post('/api/reviews/reviewphoto', review)
            alert('Review is submitted!')
            navigate('/photos')
            delete user.review
            localStorage.setItem('currentUser', JSON.stringify(user))
        }
        catch (error) { console.log(error) }
    }

    return (
        <div className="review">
            <h3>Review Details</h3>
            {photo && (
                <>
                    <div className="info">
                        <img src={photo.img} alt={photo.name} />
                        <div className="details">
                            <span>{photo.name}</span><br />
                            <span><b>Name: </b>{user.name}</span>
                            <span><b>Email: </b>{user.email}</span>
                            <span><b>Mobile: </b>{user.mobile}</span>
                            <span><b>Admin: </b>{user.admin ? 'YES' : 'NO'}</span>
                            <span>{photo.category}</span>
                            <span><b>Review: </b></span>
                            <p>{user.review}</p>
                            <button onClick={confirmed}>Confirm</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
