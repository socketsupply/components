const profile = document.getElementById('profile-image-example-editable')

profile.addEventListener('changed', e => console.log(e.detail))
profile.addEventListener('error', e => console.log(e.detail))
