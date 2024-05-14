import { Button, chakra, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import { ActiveUser } from "atom/chat";
import Socket from "atom/socket";
import User from "atom/user";
import React, { useEffect, useRef, useState } from "react";
import {
  FiMic,
  FiMicOff,
  FiPhoneCall,
  FiVideo,
  FiVideoOff,
} from "react-icons/fi";
import { useRecoilValue } from "recoil";

//Other imports
import Peer from "simple-peer";
// // import useTimer from "../hooks/useTimer";
// import { formatTime } from "../utils/formatTime";

interface Props {}

const VideoCall = (props: Props) => {
  const socket = useRecoilValue(Socket);
  const activeUser = useRecoilValue(ActiveUser);
  const user = useRecoilValue(User);

  const [me, setMe] = useState("");
  const [stream, setStream] = useState<MediaStream>();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const [callerName, setCallerName] = useState("");
  const [otherUser, setOtherUser] = useState("");
  const [msgRcv, setMsgRcv] = useState("");
  const [sendMsg, setSendMsg] = useState("");
  const [chat, setChat] = useState([]);

  const myVideo = useRef<HTMLVideoElement>();
  const userVideo = useRef<HTMLVideoElement>();
  const connectionRef = useRef<Peer.Instance>(); //Reference to the temporary connection.

  const [isMute, setIsMute] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [myVdoStatus, setMyVdoStatus] = useState(true);
  const [userVdoStatus, setUserVdoStatus] = useState();
  const [myMicStatus, setMyMicStatus] = useState(true);
  const [userMicStatus, setUserMicStatus] = useState();
  const [inviteModal, setInviteModal] = useState(true);
  const [inviteBtnText, setInviteBtnText] = useState("Send invite");
  const [messengerOpen, setMessengerOpen] = useState(false);
  const [meetCodeText, setMeetCodeText] = useState(
    "Get your meeting ID to share"
  );
  // const { timer, handleStart, handleReset } = useTimer(0);

  //The following code establishes a socket connection of the user with the server once the page meetpage loads.
  useEffect(() => {
    if (socket) {
      // Connects to the backend server locally
      // socket = io.connect('http://localhost:5000')
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setStream(stream);
          myVideo.current.srcObject = stream;
        });

      socket.on("me", (id) => {
        // handleStart(); //Starts the meeting timer
        setMe(id); //Grabs the socket id for the user to share.
        console.log(id);
      });

      socket.on("callUser", (data) => {
        setReceivingCall(true);
        setCaller(data.from);
        setCallerName(data.name);
        setCallerSignal(data.signal);
      });

      //Keeps track of the user's video and audio status
      socket.on("updateUserMedia", ({ type, currentMediaStatus }) => {
        if (currentMediaStatus !== null || currentMediaStatus !== []) {
          switch (type) {
            case "video":
              setUserVdoStatus(currentMediaStatus);
              break;
            case "mic":
              setUserMicStatus(currentMediaStatus);
              break;
            default:
              setUserMicStatus(currentMediaStatus[0]);
              setUserVdoStatus(currentMediaStatus[1]);
              break;
          }
        }
      });
    }
  }, []);

  const callUser = (id) => {
    setOtherUser(id);
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: user?.userId || user?._id || "",
        name: user.name,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
      socket.emit("updateMyMedia", {
        type: "both",
        currentMediaStatus: [myMicStatus, myVdoStatus],
      });
    });
    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    setOtherUser(caller);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", {
        signal: data,
        to: caller,
        type: "both",
        myMediaStatus: [myMicStatus, myVdoStatus],
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const updateVideo = () => {
    setMyVdoStatus((currentStatus) => {
      socket.emit("updateMyMedia", {
        type: "video",
        currentMediaStatus: !currentStatus,
      });
      stream.getVideoTracks()[0].enabled = !currentStatus;
      return !currentStatus; //Helps to toggle video
    });
  };

  const updateMic = () => {
    setMyMicStatus((currentStatus) => {
      socket.emit("updateMyMedia", {
        type: "mic",
        currentMediaStatus: !currentStatus,
      });
      stream.getAudioTracks()[0].enabled = !currentStatus;
      return !currentStatus; //Helps to toggle audio
    });
  };

  //Chatting functionality which sets the chat array everytime on sending a new message.

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  //The following set of functions handle state changes of various components present on the meetpage.
  function handleInviteModalClose() {
    setInviteModal(!inviteModal);
    setInviteBtnText("Send invite");
    setMeetCodeText("Get your meeting ID to share");
  }

  function handleInviteBtnClick() {
    setInviteBtnText("Invite sent");
  }

  function handleMessengerOpen() {
    setMessengerOpen(!messengerOpen);
  }

  function handleMeetCodeChange() {
    setMeetCodeText("Meeting code copied to clipboard");
  }

  function handleIsMute() {
    setIsMute(!isMute);
    updateMic();
  }

  function handleIsVideoOff() {
    setIsVideoOff(!isVideoOff);
    updateVideo();
  }

  // const accessVideoAudio = () => {
  //   navigator.mediaDevices.getUserMedia({
  //     audio: true,
  //     video: true,
  //   });
  // };
  useEffect(() => {
    callUser(activeUser.userId);
  }, []);

  return (
    <Flex
      flex={1}
      h="full"
      pl={"1rem"}
      flexDir="column"
      align="center"
      justify={"center"}
      pos="relative"
    >
      {/* Video Tag in Grid */}
      <Flex w="full" justify={"space-around"}>
        {/* My Video */}
        <Flex h="16rem" w="20rem" border="1px solid">
          {stream && (
            <video
              autoPlay
              muted
              playsInline
              ref={myVideo}
              src=""
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                opacity: myVdoStatus ? "1" : "0",
                transform: "scaleX(-1)",
              }}
            />
          )}
        </Flex>
        {/* Other User Video */}
        <Flex h="16rem" w="20rem" border="1px solid">
          {callAccepted && !callEnded && (
            <video
              autoPlay
              muted
              playsInline
              ref={userVideo}
              src=""
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                opacity: myVdoStatus ? "1" : "0",
              }}
            />
          )}
        </Flex>
      </Flex>

      {/* {receivingCall && !callAccepted ? (
        <Flex pos="absolute" flexDir={"column"} top={10} zIndex="200">
          <Text as="h1">{callerName || "Someone"} is calling...</Text>
          <Button>Let In</Button>
        </Flex>
      ) : (
        <></>
      )} */}

      {/* Video Controllers */}
      <Flex
        w="full"
        mt="2rem"
        justify={"center"}
        px="1rem"
        h="3rem"
        border="1px solid"
      >
        <HStack spacing={"10"}>
          <Icon
            as={isVideoOff ? FiVideoOff : FiVideo}
            onClick={handleIsVideoOff}
            fontSize="1.5rem"
            color={"black"}
            fill="lightgrey"
          ></Icon>
          <Icon as={FiPhoneCall} fontSize="1.5rem" color={"black"}></Icon>
          <Icon
            as={isMute ? FiMicOff : FiMic}
            onClick={handleIsMute}
            fontSize="1.5rem"
            color={"black"}
            fill="lightgrey"
          ></Icon>
        </HStack>
        {/* Video Icon */}
        {/* Audio */}
        {/* Call */}
      </Flex>
    </Flex>
  );
};

export default VideoCall;
