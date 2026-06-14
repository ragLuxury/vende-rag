import { UserIcon } from './home-icons';

interface ProfileHeaderProps {
  name: string;
}

export function ProfileHeader({ name }: ProfileHeaderProps) {
  return (
    <div className="flex items-center gap-4">
      <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
        <UserIcon className="size-8" />
      </span>
      <p className="font-editors text-3xl text-neutral-900">{name}</p>
    </div>
  );
}
