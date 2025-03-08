const peer = new Peer(); 

const localVideo = document.getElementById("l-video");
const remoteVideo = document.getElementById("r-video");

navigator.mediaDevices
  .getUserMedia({ video: true, audio: true })
  .then((stream) => {
    localVideo.srcObject = stream;

    peer.on("call", (call) => {
      call.answer(stream);
      call.on("stream", (remoteStream) => {
        remoteVideo.srcObject = remoteStream;
      });
    });
  })
  .catch((err) => console.error("Error accessing media devices:", err));

peer.on("open", (id) => {
  document.getElementById("my-id").innerText = id;
});

function callPeer() {
  const peerId = document.getElementById("id").value;
  const call = peer.call(peerId, localVideo.srcObject);

  call.on("stream", (remoteStream) => {
    remoteVideo.srcObject = remoteStream;
  });
}
