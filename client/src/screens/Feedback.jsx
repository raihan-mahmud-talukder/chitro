import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios'

export const Feedback = () => {
    const [photo, setPhoto] = useState()
    const { photoid } = useParams()
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('currentUser'))
    document.title = 'FEEDBACK'

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
        const feedback = { photo, user }
        try {
            const result = await axios.post('/api/feedbacks/feedbackphoto', feedback)
            alert('Feedback is submitted!')
            navigate('/photos')
            delete user.feedback
            localStorage.setItem('currentUser', JSON.stringify(user))
        }
        catch (error) { console.log(error) }
    }

    return (
        <div className="feedback">
            <h3>Feedback Details</h3>
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
                            <span><b>Feedback: </b></span>
                            <p>{user.feedback}</p>
                            <button onClick={confirmed}>Confirm</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
// Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim dicta est hic corrupti doloremque, molestiae molestias voluptas reiciendis ut pariatur quia sed assumenda nobis quam laudantium nostrum! Aliquam, a ullam?