import { CallData } from "atom/videoCall";
import ChatBox from "components/chatBox/chatBox";
import SideBar from "components/sideBar/sideBar";
import VideoCall from "components/videoCall/videoCall";
import HomeLayout from "layout/homeLayout";
import type { NextPage } from "next";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

const Home: NextPage = () => {
  const callData = useRecoilValue(CallData);

  useEffect(() => {
    console.log(callData);
  }, [callData]);
  return (
    <HomeLayout>
      <>
        <SideBar />
        {callData.active ? <VideoCall /> : <ChatBox />}
      </>
    </HomeLayout>
  );
};

export default Home;
