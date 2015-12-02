
navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia

if(navigator.getUserMedia){
	navigator.getUserMedia({ video: true, audio: true}, function(stream) {
		var Peer = require('simple-peer')

		var peer = new Peer({
			initiator: location.pathname === '/init',
			trickle: false,
			stream: stream
		})

		peer.on('signal', function(data) {
			document.getElementById('myId').value = JSON.stringify(data)
		})

		document.getElementById('connect').addEventListener('click', function () {
			var peerId = JSON.parse(document.getElementById('peerId').value)
			peer.signal(peerId)
		})

		peer.on('stream', function(stream) {
			var video = document.createElement('video')
			document.body.appendChild(video)
			video.src = window.URL.createObjectURL(stream)
			video.play()
		})
	}, function(err) {
		console.error(err)
	})
}
else {
	console.log("WEBRTC IS NOT SUPPORTED !")
}

