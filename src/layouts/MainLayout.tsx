import { BellRing } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { FaLightbulb } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import styled from "styled-components";
import { FavoriteMenuLinkListType, MainUIStateType } from "@/types/MainLayout";
import SidebarMenues from "@/components/shared/SidebarMenues";
import FavoriteSidebar from "@/components/shared/FavoriteSidebar";
import ProfileSidebar from "@/components/shared/ProfileSidebar";
import MainLayoutPopovers from "../components/shared/MainLayoutPopovers";
import QuickLinks from "@/components/shared/QuickLinks";
import DownloadIndecator from "@/components/shared/DownloadIndecator";
import { BiSupport } from "react-icons/bi";
import HelpAndSupportModel from "@/components/shared/HelpAndSupportModel";
function MainLayout(props: { children: React.ReactNode }) {
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const [sheet2Open, setSheet2Open] = useState<boolean>(false);
  const [favoriteSheet, setFavoriteSheet] = useState<boolean>(false);
  const [logotAlert, setLogotAlert] = useState<boolean>(false);
  const [helpModel, setHelpModel] = useState<boolean>(false);
  const [notificationSheet, setNotificationSheet] = useState<boolean>(false);
  const [favoriteLinkList, setFavoriteLinkList] = useState<FavoriteMenuLinkListType[]>([]);
  const [selectedSession, setSelectedSession] = useState<string |any>("");
  const modalRef = useRef<HTMLDivElement>(null);
  const sidebaref = useRef<HTMLDivElement>(null);
  const favoriteref = useRef<HTMLDivElement>(null);

  const uiState: MainUIStateType = {
    sheetOpen,
    setSheetOpen,
    sheet2Open,
    setSheet2Open,
    favoriteSheet,
    setFavoriteSheet,
    logotAlert,
    setLogotAlert,
    modalRef,
    sidebaref,
    favoriteref,
    notificationSheet,
    setNotificationSheet,
    favoriteLinkList,
    setFavoriteLinkList,
    helpModel,
    setHelpModel,
  };

  useEffect(() => {
    // Retrieve loggedInUser from local storage
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setSelectedSession(user.session); // Set the session from the parsed object
    }
  }, []);

  const handleSessionChange = (value: string) => {
    setSelectedSession(value);
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      user.session = value; // Update the session in the user object
      localStorage.setItem("loggedInUser", JSON.stringify(user)); // Save back to local storage
    }
  };

  return (
    <Wrapper className="">
      <HelpAndSupportModel uiState={uiState}/>
      {/* alert disalogs start=============== */}
      <MainLayoutPopovers uiState={uiState} />
      {/* alert disalogs start=============== */}
      {/* sidebars=========================== */}
      <div className={`sheetone absolute  h-[100vh] z-10 top-0 w-full transition-all  ${sheetOpen || sheet2Open || favoriteSheet ? "bg-[#00000081]" : "left-[-100%]"}`}></div>
      <FavoriteSidebar uiState={uiState} />
      <SidebarMenues uiState={uiState} />
      <ProfileSidebar uiState={uiState} />
      {/* sidebars=========================== */}
      <div>
        <nav className="flex items-center justify-between h-[50px] px-[20px] fixed top-0 left-[50px] w-[calc(100vw-50px)]  bg-neutral-300">
          <div className="flex gap-[20px] items-center">
            <div className="text-slate-700 font-[600] logo">Spigen</div>
            <div className="date">
            <Select value={selectedSession} onValueChange={handleSessionChange}>
                <SelectTrigger className="w-[180px] bg-white border-0 text-slate-700">
                  <SelectValue placeholder="Session" />
                </SelectTrigger>
                <SelectContent className="bg-white ">
                  <SelectItem value="24-25" className="text-slate-700 focus:text-white focus:bg-cyan-600">
                    2024-2025
                  </SelectItem>
                  <SelectItem value="23-24" className="text-slate-700 focus:text-white focus:bg-cyan-600">
                    2023-2024
                  </SelectItem>
                  <SelectItem value="22-23" className="text-slate-700 focus:text-white focus:bg-cyan-600">
                    2022-2023
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-[20px]">
            <div className="toggle"></div>
            <div className="search">
              <QuickLinks />
            </div>
            <div className="download">
              <DownloadIndecator />
            </div>
            <div className="chat"></div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="relative flex items-center justify-center bg-white cursor-pointer notification max-w-max p-[5px] rounded-md" onClick={() => setNotificationSheet(true)}>
                    <BellRing className="h-[25px] w-[25px] text-slate-600" />
                    <Badge className="bg-yellow-600 hover:bg-yellow-600 h-[15px] w-[15px] rounded-full p-0 flex justify-center items-center absolute top-[-2px] right-[-2px]">0</Badge>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-cyan-700">
                  <p>Notifications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </nav>
      </div>
      <div className="mt-[50px] ">
        <div className="w-[60px] h-[100vh] bg-cyan-950 fixed left-0 top-0 pt-[20px] pb-[10px] flex items-center justify-between flex-col z-[50] border-r border-slate-600">
          <div className="flex flex-col items-center gap-[20px]">
            <div className="flex items-center justify-center">
              <Link to="/">
                <img src="/spigenlogo2.png" alt="" className="h-[35px] w-[35px] " />
              </Link>
            </div>
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <FaStar
                      className="h-[25px] w-[25px] text-white"
                      onClick={() => {
                        setFavoriteSheet(!favoriteSheet);
                        setSheet2Open(false);
                        setSheetOpen(false);
                      }}
                    />
                  </TooltipTrigger>
                  <TooltipContent side="right" className="bg-cyan-700">
                    <p>Favorite Pages</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="flex flex-col gap-[30px]">
            <div className="line"></div>
            <Button
              onClick={() => {
                setSheet2Open(false);
                setSheetOpen(!sheetOpen);
                setFavoriteSheet(false);
              }}
              className="btn rotate-[270deg] border-[3px] border-yellow-600 bg-transparent rounded-full max-w-max"
            >
              <span></span>
              All Modules
            </Button>
          </div>
          <div className="flex flex-col gap-[20px] items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <BiSupport className="h-[25px] w-[25px] text-white" />
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-cyan-700">
                  <p>Help & Support</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <FaLightbulb className="h-[25px] w-[25px] text-white" onClick={() => setHelpModel(true)} />
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-cyan-700">
                  <p>Explore All Features</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <FaCircleUser
                    className="h-[25px] w-[25px] text-white"
                    onClick={() => {
                      setSheet2Open(!sheet2Open);
                      setSheetOpen(false);
                      setFavoriteSheet(false);
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-cyan-700">
                  <p>Account</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <main className="ml-[60px]  bg-[#f1f1f1] h-full">{props.children}</main>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  .btn {
    overflow: hidden;
    position: relative;

    span {
      position: absolute;
      background-color: #d1d101a3;
      height: 100px;
      width: 10px;
      rotate: 30deg;
      left: -20px;
      transition: all 1.3s;
    }
    &:hover {
      span {
        left: 120px;
        transition: all 1.3s;
      }
    }
  }
`;
export default MainLayout;
