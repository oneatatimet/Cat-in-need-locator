const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser')
    window.location.replace('/login')
}

export default logout;