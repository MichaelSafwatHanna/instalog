export const RowSkeleton: React.FC = () => {
  return (
    <div className="bg-white flex flex-row hover:bg-gray-50 w-3/2 p-4 animate-pulse">
      <div className="flex flex-row items-center basis-5/12">
        <div className="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 rounded-full bg-gray-200" />
        <div className="pl-3">
          <div className="h-2.5 bg-gray-200 rounded-full w-48" />
        </div>
      </div>
      <div className="py-4 px-6 basis-3/12">
        <div className="h-2.5 bg-gray-200 rounded-full w-48" />
      </div>
      <div className="py-4 px-6 basis-3/12">
        <div className="h-2.5 bg-gray-200 rounded-full w-48" />
      </div>
    </div>
  );
};

export default RowSkeleton;