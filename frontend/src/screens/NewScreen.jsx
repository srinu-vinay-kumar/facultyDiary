import AddEditNotes from "../components/New/AddEditNotes";
import NoteCard from "../components/New/NoteCard";
import { MdAdd } from "react-icons/md";
const NewScreen = () => {
  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <NoteCard
            title="meeting"
            date="3rd April, 2024"
            content="hii"
            tags="#meeting"
            isPinned={true}
          />
        </div>
      </div>

      <button
        className="w-16 h-16 flex iems-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {}}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <AddEditNotes />
    </>
  );
};

export default NewScreen;
