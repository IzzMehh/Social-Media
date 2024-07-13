function randomId() {
    return Math.floor(Math.random() * 10000)
}

// Using this random Id hook to generate a single id for all image which will be added to the end of each url
// by this browser will store the image in chache data and won't re-render images while browsing to diff pages.
// It will only updated when the user update its own profile image or when website get's reload.


export default randomId