// import {
//   Drawer,
//   DrawerContent,
//   DrawerTrigger
// } from "@/components/ui/drawer";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import ProfileDrawersAllies from 'src/pages/profile/ProfileDrawersAllies';
// import ProfileDrawersPoints from 'src/pages/profile/ProfileDrawersPoints';
// import DrawersBar from "../core/DrawersBar";

// const ProfileDrawers = ({ user, cards, followers, alliesCollection, selection }) => {
//   return (
//     <Drawer>
//       <DrawerTrigger>
//         {selection === 'points' &&
//           <div className='p-5'>
//             <div>포인트</div>
//             <div className='flex justify-center'>{cards.point}</div>
//           </div>
//         }
//         {selection === 'allies' &&
//           <div className='p-5'>
//             <div>
//               {followers ? '팔로워' : '팔로잉'}
//             </div>
//             <div className='flex justify-center'>
//               {alliesCollection.length}명
//             </div>
//           </div>
//         }
//       </DrawerTrigger>
//       <DrawerContent className="flex flex-col justify-center px-5 bg-light-2 dark:bg-dark-2 max-h-[60%]">
//         <ScrollArea className="overflow-y-scroll">
//           <DrawersBar />
//           <div className='p-5'>
//             <div>
//               {selection === 'points' &&
//                 <div className='flex justify-center'>{`${user.displayName}의 포인트 적립 영수증`}</div>
//               }
//               {selection === 'allies' &&
//                 <div className='flex justify-center'>{user.displayName}의 {followers ? '팔로워' : '팔로잉'}</div>
//               }
//             </div>
//             {selection === 'points' && <ProfileDrawersPoints user={user} cards={cards} />}
//             {/* {selection === 'allies' &&
//               <DrawerClose>
//                 <ProfileDrawersAllies followers={followers} alliesCollection={alliesCollection} />
//               </DrawerClose>
//             } */}
//           </div>
//           {selection === 'allies' &&
//             <ProfileDrawersAllies user={user} followers={followers} alliesCollection={alliesCollection} />
//           }
//         </ScrollArea>
//       </DrawerContent>
//     </Drawer>
//   );
// }

// export default ProfileDrawers
