var Peer = require('simple-peer')

var peer = new Peer({
	initiator: location.pathname === '/init',
	trickle: false
})

peer.on('signal', function(data) {
	document.getElementById('myId').value = JSON.stringify(data)
})

document.getElementById('connect').addEventListener('click', function () {
	var peerId = JSON.parse(document.getElementById('peerId').value)
	peer.signal(peerId)
})
