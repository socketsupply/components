const profile = document.getElementById('profile-image-example-editable')

profile.addEventListener('changed', e => console.log(e.data))
profile.addEventListener('error', e => console.log(e.message))
