import { ChevronRight, Star } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { IoGrid } from "react-icons/io5";
import { FaUserPen } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PiListStarBold } from "react-icons/pi";
import { FaCartShopping } from "react-icons/fa6";
import { MdWarehouse } from "react-icons/md";
import { SiNginxproxymanager } from "react-icons/si";
import { MdOutlineDriveFileMoveRtl } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { TbReportSearch } from "react-icons/tb";
import { FaQuestionCircle } from "react-icons/fa";
import { PiGridNineFill } from "react-icons/pi";
import { Separator } from "@/components/ui/separator";
import { FaClipboardList } from "react-icons/fa6";
import React from "react";
import { Props } from "@/types/MainLayout";
import { CgArrowTopRight } from "react-icons/cg";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const SidebarMenues: React.FC<Props> = ({ uiState }) => {
  const { sheetOpen, setSheetOpen, modalRef } = uiState;
  return (
    <div ref={modalRef} className={`absolute  h-[100vh] w-[300px] z-[30] top-0 bg-cyan-950 transition-all duration-500 ${sheetOpen ? "left-[60px]" : "left-[-300px]"}`}>
      <FaArrowLeftLong onClick={() => setSheetOpen(false)} className="text-[20px] cursor-pointer absolute top-[10px] right-[10px] text-white" />
      <ul className="flex flex-col text-white p-[5px] mt-[50px] ">
        <li>
          <NavLink to={"/"} className={"flex gap-[10px] items-center py-[10px] hover:bg-cyan-800 p-[10px] rounded-md "}>
            <MdHome className="h-[20px] w-[20px]" />
            Dashboard
          </NavLink>
        </li>
        <li className="group">
          <div className={"flex justify-between items-center py-[10px] hover:bg-cyan-800 p-[10px] group-hover:bg-cyan-800 rounded-md cursor-pointer"}>
            <span className="flex gap-[10px] items-center cursor-pointer">
              <IoGrid className="h-[20px] w-[20px]" />
              Material Management
            </span>
            <ChevronRight />
          </div>
          <div className=" top-[20px] bottom-[20px] z-[-9] bg-cyan-950 shadow absolute border-l border-slate-600 rounded-md  right-[0] w-[0]  opacity-0 overflow-hidden  transition-all duration-500 group-hover:w-[400px] group-hover:opacity-100 group-hover:right-[-400px]">
            <div className="min-w-[400px]">
              <div className="p-[10px]">
                <span className="flex gap-[10px] items-center cursor-pointer text-[18px] opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <IoGrid className="h-[20px] w-[20px]" />
                  Material Management
                </span>
                <p className="font-[350] text-[13px] mt-[10px]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus, inventore!</p>
                <a href="#" className="font-[350] text-[13px] mt-[10px] text-blue-200">
                  Explore material management
                </a>
              </div>
              <Separator className="bg-slate-200 text-slate-200" />
              <ul className="p-[10px] overflow-y-auto h-[500px] scrollbar-thin scrollbar-thumb-cyan-800 scrollbar-track-gray-300 flex flex-col gap-[10px]">
                <li className="group hover:[&>.submenu]">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1" className="border-0">
                      <AccordionTrigger className="hover:no-underline hover:bg-cyan-800 p-[10px] rounded-md cursor-pointer ">
                        <span className="flex gap-[10px] items-center">
                          <PiListStarBold className="h-[20px] w-[20px]" />
                          Master
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className=" p-[10px] mt-[10px] border-l-2 border-yellow-600 bg-cyan-900 rounded">
                        <ul className="flex flex-col gap-[10px]">
                          <li>
                            <Accordion type="single" collapsible>
                              <AccordionItem value="inner-item-1" className="border-0">
                                <AccordionTrigger className="hover:no-underline hover:bg-cyan-800 p-[10px] rounded-md cursor-pointer ">Components</AccordionTrigger>
                                <AccordionContent className="p-[0] border-l-2 rounded border-yellow-600  bg-cyan-800">
                                  <ul className="mt-[10px] p-[10px] flex flex-col gap-[10px]">
                                    <li className="flex items-center w-full gap-[3px]">
                                      <Link to={"/not-permission"} className="w-full hover:no-underline hover:bg-cyan-700 p-[10px] rounded-md cursor-pointer flex items-center gap-[10px]">
                                        Material
                                        <CgArrowTopRight className="h-[20px] w-[20px] font-[600]" />
                                      </Link>
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger>
                                            <div className="p-[10px] hover:bg-white hover:text-cyan-600 transition-all cursor-pointer rounded-md">
                                              <Star className="h-[16px] w-[16px]" />
                                            </div>
                                          </TooltipTrigger>
                                          <TooltipContent side="right" className="bg-yellow-800">
                                            <p>Add to Favorite</p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    </li>
                                    <li className="flex items-center w-full gap-[3px]">
                                      <Link to={"/not-permission"} className="w-full hover:no-underline hover:bg-cyan-700 p-[10px] rounded-md cursor-pointer flex items-center gap-[10px]">
                                        Service <CgArrowTopRight className="h-[20px] w-[20px] font-[600]" />
                                      </Link>
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger>
                                            <div className="p-[10px] hover:bg-white hover:text-cyan-600 transition-all cursor-pointer rounded-md">
                                              <Star className="h-[16px] w-[16px]" />
                                            </div>
                                          </TooltipTrigger>
                                          <TooltipContent side="right" className="bg-yellow-800">
                                            <p>Add to Favorite</p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    </li>
                                  </ul>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </li>
                          <li className="w-full ">
                            <Link to={"/not-permission"} className="w-full hover:no-underline hover:bg-cyan-800 p-[10px] rounded-md cursor-pointer flex items-center justify-between">
                              Component Map <Star className="h-[20px] w-[20px]" />
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link onClick={() => setSheetOpen(false)} to={"/master/product/fg"} className="w-full hover:no-underline hover:bg-cyan-800 p-[10px] rounded-md cursor-pointer flex items-center justify-between">
                              Products <Star className="h-[20px] w-[20px]" />
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link to={"/not-permission"} className="w-full hover:no-underline hover:bg-cyan-800 p-[10px] rounded-md cursor-pointer flex items-center justify-between">
                              HSN map <Star className="h-[20px] w-[20px]" />
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link to={"/not-permission"} className="w-full hover:no-underline hover:bg-cyan-800 p-[10px] rounded-md cursor-pointer flex items-center justify-between">
                              Groups <Star className="h-[20px] w-[20px]" />
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link to={"/not-permission"} className="w-full hover:no-underline hover:bg-cyan-800 p-[10px] rounded-md cursor-pointer flex items-center justify-between">
                              Locations <Star className="h-[20px] w-[20px]" />
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link to={"/master/billing-address"} className="w-full hover:no-underline hover:bg-cyan-800 p-[10px] rounded-md cursor-pointer flex items-center justify-between">
                              Billing address <Star className="h-[20px] w-[20px]" />
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link to={"/master/shipping-address"} className="w-full hover:no-underline hover:bg-cyan-800 p-[10px] rounded-md cursor-pointer flex items-center justify-between">
                              Shipping address <Star className="h-[20px] w-[20px]" />
                            </Link>
                          </li>
                          <li>
                            <Accordion type="single" collapsible>
                              <AccordionItem value="inner-item-1" className="border-0">
                                <AccordionTrigger className="hover:no-underline hover:bg-cyan-800 p-[10px] rounded-md cursor-pointer ">Bill Of Material</AccordionTrigger>
                                <AccordionContent className="p-[0] border-l-2 border-yellow-600 bg-cyan-800 rounded">
                                  <ul className="mt-[10px] p-[10px] flex flex-col gap-[10px]">
                                    <li className="w-full ">
                                      <Link to={"/not-permission"} className="w-full hover:no-underline hover:bg-cyan-700 p-[10px] rounded-md cursor-pointer flex items-center justify-between">
                                        Material <Star className="h-[20px] w-[20px]" />
                                      </Link>
                                    </li>
                                    <li className="w-full">
                                      <Link to={"/not-permission"} className="w-full hover:no-underline hover:bg-cyan-700 p-[10px] rounded-md cursor-pointer flex items-center justify-between">
                                        Service <Star className="h-[20px] w-[20px]" />
                                      </Link>
                                    </li>
                                  </ul>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </li>
                          <li>
                            <Accordion type="single" collapsible>
                              <AccordionItem value="inner-item-1" className="border-0">
                                <AccordionTrigger className="hover:no-underline hover:bg-cyan-800 p-[10px] rounded-md cursor-pointer ">Vender / Suppliar</AccordionTrigger>
                                <AccordionContent className="p-[0]   border-l-2 border-yellow-600 bg-cyan-800 rounded">
                                  <ul className="mt-[10px] p-[10px] flex flex-col gap-[10px]">
                                    <li className="w-full ">
                                      <Link to={"/not-permission"} className="w-full hover:no-underline hover:bg-cyan-700 p-[10px] rounded-md cursor-pointer flex items-center justify-between">
                                        Material <Star className="h-[20px] w-[20px]" />
                                      </Link>
                                    </li>
                                    <li className="w-full">
                                      <Link to={"/not-permission"} className="w-full hover:no-underline hover:bg-cyan-700 p-[10px] rounded-md cursor-pointer flex items-center justify-between">
                                        Service <Star className="h-[20px] w-[20px]" />
                                      </Link>
                                    </li>
                                  </ul>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </li>
                          <li className="w-full">
                            <Link to={"/master/customer"} className="w-full hover:no-underline hover:bg-cyan-800 p-[10px] rounded-md cursor-pointer flex items-center justify-between">
                             Client / Customer<Star className="h-[20px] w-[20px]" />
                            </Link>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </li>
                <li className="group hover:[&>.submenu]">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1" className="border-0">
                      <AccordionTrigger className="hover:no-underline hover:bg-cyan-800 p-[10px] rounded-md cursor-pointer ">
                        <span className="flex gap-[10px] items-center">
                          <FaCartShopping className="h-[20px] w-[20px]" />
                          Procurement
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className=" p-[10px] mt-[10px] border-l-2 border-yellow-600 bg-cyan-800 rounded">
                        <ul className="flex flex-col ">
                          <li className="w-full ">
                            <Link onClick={() => setSheetOpen(false)} to={"/create-po"} className="w-full hover:no-underline hover:bg-cyan-700 p-[10px] rounded-md cursor-pointer flex items-center justify-between">
                              Create PO <Star className="h-[20px] w-[20px]" />
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link to={"/not-permission"} className="w-full hover:no-underline hover:bg-cyan-700 p-[10px] rounded-md cursor-pointer flex items-center justify-between">
                              Manage PO <Star className="h-[20px] w-[20px]" />
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link to={"/not-permission"} className="w-full hover:no-underline hover:bg-cyan-700 p-[10px] rounded-md cursor-pointer flex items-center justify-between">
                              Completed PO <Star className="h-[20px] w-[20px]" />
                            </Link>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </li>
                <li className="group hover:[&>.submenu]">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1" className="border-0">
                      <AccordionTrigger className="hover:no-underline hover:bg-cyan-800 p-[10px] rounded-md cursor-pointer ">
                        <span className="flex gap-[10px] items-center">
                          <FaClipboardList className="h-[20px] w-[20px]" />
                          Sales Order
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className=" p-[10px] mt-[10px] border-l-2 border-yellow-600 bg-cyan-800 rounded">
                        <ul className="flex flex-col ">
                          <li className="w-full ">
                            <Link onClick={() => setSheetOpen(false)} to={"/create-po"} className="w-full hover:no-underline hover:bg-cyan-700 p-[10px] rounded-md cursor-pointer flex items-center justify-between">
                              Create
                              <Star className="h-[20px] w-[20px]" />
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link to={"/not-permission"} className="w-full hover:no-underline hover:bg-cyan-700 p-[10px] rounded-md cursor-pointer flex items-center justify-between">
                              Register
                              <Star className="h-[20px] w-[20px]" />
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link to={"/not-permission"} className="w-full hover:no-underline hover:bg-cyan-700 p-[10px] rounded-md cursor-pointer flex items-center justify-between">
                              Shipment <Star className="h-[20px] w-[20px]" />
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link to={"/not-permission"} className="w-full hover:no-underline hover:bg-cyan-700 p-[10px] rounded-md cursor-pointer flex items-center justify-between">
                              Invoice <Star className="h-[20px] w-[20px]" />
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link to={"/not-permission"} className="w-full hover:no-underline hover:bg-cyan-700 p-[10px] rounded-md cursor-pointer flex items-center justify-between">
                              Allocated Invoices <Star className="h-[20px] w-[20px]" />
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link to={"/not-permission"} className="w-full hover:no-underline hover:bg-cyan-700 p-[10px] rounded-md cursor-pointer flex items-center justify-between">
                              E Transaction Invoices <Star className="h-[20px] w-[20px]" />
                            </Link>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </li>
                <li className="group hover:[&>.submenu]">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1" className="border-0">
                      <AccordionTrigger className="hover:no-underline hover:bg-cyan-800 p-[10px] rounded-md cursor-pointer ">
                        <span className="flex gap-[10px] items-center">
                          <MdWarehouse className="h-[20px] w-[20px]" />
                          Warehouse
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className=" p-[10px] mt-[10px] border-l-2 border-yellow-600 bg-cyan-800 rounded">
                        <ul className="flex flex-col ">
                          <li className="w-full ">
                            <Link to={"/not-permission"} className="w-full hover:no-underline hover:bg-cyan-700 p-[10px] rounded-md cursor-pointer flex items-center justify-between">
                              MR Approval <Star className="h-[20px] w-[20px]" />
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link to={"/not-permission"} className="w-full hover:no-underline hover:bg-cyan-700 p-[10px] rounded-md cursor-pointer flex items-center justify-between">
                              Inward <Star className="h-[20px] w-[20px]" />
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link to={"/not-permission"} className="w-full hover:no-underline hover:bg-cyan-700 p-[10px] rounded-md cursor-pointer flex items-center justify-between">
                              Transfer <Star className="h-[20px] w-[20px]" />
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link to={"/not-permission"} className="w-full hover:no-underline hover:bg-cyan-700 p-[10px] rounded-md cursor-pointer flex items-center justify-between">
                              Pic Slip <Star className="h-[20px] w-[20px]" />
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link to={"/not-permission"} className="w-full hover:no-underline hover:bg-cyan-700 p-[10px] rounded-md cursor-pointer flex items-center justify-between">
                              Batch Allocation <Star className="h-[20px] w-[20px]" />
                            </Link>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </li>
                <li className="group hover:[&>.submenu]">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1" className="border-0">
                      <AccordionTrigger className="hover:no-underline hover:bg-cyan-800 p-[10px] rounded-md cursor-pointer ">
                        <span className="flex gap-[10px] items-center">
                          <SiNginxproxymanager className="h-[20px] w-[20px]" />
                          FG(s) Inwarding
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className=" p-[10px] mt-[10px] border-l-2 border-yellow-600 bg-cyan-800 rounded">
                        <ul className="flex flex-col ">
                          <li className="w-full ">
                            <Link to={"/not-permission"} className="w-full hover:no-underline hover:bg-cyan-700 p-[10px] rounded-md cursor-pointer flex items-center justify-between">
                              Pending FG(s) <Star className="h-[20px] w-[20px]" />
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link to={"/not-permission"} className="w-full hover:no-underline hover:bg-cyan-700 p-[10px] rounded-md cursor-pointer flex items-center justify-between">
                              Complete FG(s) <Star className="h-[20px] w-[20px]" />
                            </Link>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </li>
                <li className="group hover:[&>.submenu]">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1" className="border-0">
                      <AccordionTrigger className="hover:no-underline hover:bg-cyan-800 p-[10px] rounded-md cursor-pointer ">
                        <span className="flex gap-[10px] items-center">
                          <MdOutlineDriveFileMoveRtl className="h-[20px] w-[20px]" />
                          FG(s) OUT
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className=" p-[10px] mt-[10px] border-l-2 border-yellow-600 bg-cyan-800 rounded">
                        <ul className="flex flex-col ">
                          <li className="w-full ">
                            <Link to={"/not-permission"} className="w-full hover:no-underline hover:bg-cyan-700 p-[10px] rounded-md cursor-pointer flex items-center justify-between">
                              Create FG(s) OUT <Star className="h-[20px] w-[20px]" />
                            </Link>
                          </li>
                          <li className="w-full">
                            <Link to={"/not-permission"} className="w-full hover:no-underline hover:bg-cyan-700 p-[10px] rounded-md cursor-pointer flex items-center justify-between">
                              View FG(s) OUT <Star className="h-[20px] w-[20px]" />
                            </Link>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </li>
                <li className="group hover:[&>.submenu]">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1" className="border-0">
                      <AccordionTrigger className="hover:no-underline hover:bg-cyan-800 p-[10px] rounded-md cursor-pointer ">
                        <span className="flex gap-[10px] items-center">
                          <AiFillProduct className="h-[20px] w-[20px]" />
                          Production
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className=" p-[10px] mt-[10px] border-l-2 border-yellow-600 bg-cyan-800 rounded">
                        <ul className="flex flex-col ">
                          <li className="w-full ">
                            <Link to={"/not-permission"} className="w-full hover:no-underline hover:bg-cyan-700 p-[10px] rounded-md cursor-pointer flex items-center justify-between">
                              PPC
                              <Star className="h-[20px] w-[20px]" />
                            </Link>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </li>
                <li className="group hover:[&>.submenu]">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1" className="border-0">
                      <AccordionTrigger className="hover:no-underline hover:bg-cyan-800 p-[10px] rounded-md cursor-pointer ">
                        <span className="flex gap-[10px] items-center">
                          <TbReportSearch className="h-[20px] w-[20px]" />
                          Report (s)
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className=" p-[10px] mt-[10px] border-l-2 border-yellow-600 bg-cyan-800 rounded">
                        <ul className="flex flex-col ">
                          <li className="w-full ">
                            <Link to={"/not-permission"} className="w-full hover:no-underline hover:bg-cyan-700 p-[10px] rounded-md cursor-pointer flex items-center justify-between">
                              Inventory report
                              <Star className="h-[20px] w-[20px]" />
                            </Link>
                          </li>
                          <li className="w-full ">
                            <Link to={"/not-permission"} className="w-full hover:no-underline hover:bg-cyan-700 p-[10px] rounded-md cursor-pointer flex items-center justify-between">
                              Printing
                              <Star className="h-[20px] w-[20px]" />
                            </Link>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </li>
                <li className="group hover:[&>.submenu]">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1" className="border-0">
                      <AccordionTrigger className="hover:no-underline hover:bg-cyan-800 p-[10px] rounded-md cursor-pointer ">
                        <span className="flex gap-[10px] items-center">
                          <FaQuestionCircle className="h-[20px] w-[20px]" />
                          Query (s)
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className=" p-[10px] mt-[10px] border-l-2 border-yellow-600 bg-cyan-800 rounded">
                        <ul className="flex flex-col ">
                          <li className="w-full ">
                            <Link to={"/not-permission"} className="w-full hover:no-underline hover:bg-cyan-700 p-[10px] rounded-md cursor-pointer flex items-center justify-between">
                              Q1-Q2
                              <Star className="h-[20px] w-[20px]" />
                            </Link>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </li>
                <li className="group hover:[&>.submenu]">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1" className="border-0">
                      <AccordionTrigger className="hover:no-underline hover:bg-cyan-800 p-[10px] rounded-md cursor-pointer ">
                        <span className="flex gap-[10px] items-center">
                          <PiGridNineFill className="h-[20px] w-[20px]" />
                          Physical Stock
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className=" p-[10px] mt-[10px] border-l-2 border-yellow-600 bg-cyan-800 rounded">
                        <ul className="flex flex-col ">
                          <li className="w-full ">
                            <Link to={"/not-permission"} className="w-full hover:no-underline hover:bg-cyan-700 p-[10px] rounded-md cursor-pointer flex items-center justify-between">
                              Create Physical Stock
                              <Star className="h-[20px] w-[20px]" />
                            </Link>
                          </li>
                          <li className="w-full ">
                            <Link to={"/not-permission"} className="w-full hover:no-underline hover:bg-cyan-700 p-[10px] rounded-md cursor-pointer flex items-center justify-between">
                              View Physical Stock
                              <Star className="h-[20px] w-[20px]" />
                            </Link>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li className="group">
          <div className={" flex justify-between items-center py-[10px] hover:bg-cyan-800 group-hover:bg-cyan-800 p-[10px] rounded-md cursor-pointer"}>
            <span className="flex gap-[10px] items-center cursor-pointer">
              <FaUserPen className="h-[20px] w-[20px]" />
              Customer Management
            </span>{" "}
            <ChevronRight />
          </div>
          <div className=" top-[20px] bottom-[20px] z-[-9] bg-cyan-950 shadow absolute border-l border-slate-600 rounded-md  right-[0] w-[0]  opacity-0 overflow-hidden  transition-all duration-500 group-hover:w-[400px] group-hover:opacity-100 group-hover:right-[-400px]">
            <div className="min-w-[400px]">
              <div className="p-[10px]">
                <span className="flex gap-[10px] items-center cursor-pointer text-[18px] opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <FaUserPen className="h-[20px] w-[20px]" />
                  Customer Management
                </span>
                <p className="font-[350] text-[13px] mt-[10px]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus, inventore!</p>
                <a href="#" className="font-[350] text-[13px] mt-[10px] text-blue-200">
                  Explore Customer management
                </a>
              </div>
              <hr className="my-[10px]" />
              <ul className="p-[10px] overflow-y-auto h-[500px] scrollbar-thin scrollbar-thumb-cyan-800 scrollbar-track-gray-300">
                <li className="w-full ">
                  <Link to={"/not-permission"} className="w-full hover:no-underline hover:bg-cyan-800 p-[10px] rounded-md cursor-pointer flex items-center justify-between">
                    Customer Enquiry
                    <Star className="h-[20px] w-[20px]" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SidebarMenues;
