const AddEditNotes = () => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <label className="input-label"></label>
        <input
          type="text"
          className="text-2xl text-slate=950 outline-none"
          placeholder="Go to Gym At 6"
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>

        <textarea
          type="text"
          className="text-slate-500 outline-none bg-slate p-2 rounded"
          placeholder="Content"
          rows={10}
        ></textarea>
      </div>
    </>
  );
};

export default AddEditNotes;
