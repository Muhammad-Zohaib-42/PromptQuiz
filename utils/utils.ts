import axios from "axios"

const {setUser} = useAuthContext()

export async function rotateTokens() {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/rotate-tokens`, {}, {
            withCredentials: true
        })

        if (response.data.success) {
            setUser(response.data.data.user)
        }
    } catch (error) {
        console.log(error.response.data.reason || error.message)
    }
}