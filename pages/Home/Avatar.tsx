interface AvatarProps {
  initials: string;
}

export const Avatar: React.FC<AvatarProps> = ({ initials }) => {
  return (
    <div className="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500">
      <span className="font-medium text-white">{initials.toUpperCase()}</span>
    </div>
  );
};
