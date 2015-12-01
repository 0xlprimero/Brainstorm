var Peer = require('simple-peer')


peer = new Peer({
	initiator: location.hash === '#init',
	stream: true,
	trickle: false
})

peer.on('signal', function(data) {
	document.getElementById('myId') = JSON.stringify(data)
})