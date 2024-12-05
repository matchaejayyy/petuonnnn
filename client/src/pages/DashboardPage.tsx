import Avatar from "../components/Avatar";
import SideBar from "../components/SideBar";
import WhiteContainer from "../components/WhiteContainer";
import Pets from "../components/dashboard/Pets";

import ToDoListComponent from "../components/ToDoListComponent";

const DashboardPage = () => {
  return (
    <>
      <WhiteContainer>
      <h1
            style={{ fontFamily: '"Crimson Pro", serif' }} className="text-[3rem] text-[#354F52] ftracking-normal mb-4  mt-7" > Dashboard
          </h1>
            <div>
              <div className="fixed left-[9.8rem] w-[35rem] h-[21.5rem] bg-white rounded-[1.5rem] top-[6rem] shadow-lg">
                <ToDoListComponent variant="compact"/>
              </div>
             <div style={{ fontFamily: '"Signika Negative", sans-serif' }}  className=" font-bold text-[#354F52] p-3 fixed bg-white w-[35rem] h-[14rem] top-[29rem] left-[9.8rem] rounded-[1.5rem] text-xl shadow-lg">Progress</div>
              <div style={{ fontFamily: '"Signika Negative", sans-serif' }}  className=" font-bold text-[#354F52]  fixed bg-white w-[45.5rem] h-[37rem] left-[47.5rem] rounded-[1.5rem] top-[6rem] text-xl shadow-lg">
                <Pets />
              </div>
            </div>
        <Avatar />
      </WhiteContainer>
      <SideBar />
    </>
  );
};

export default DashboardPage;
