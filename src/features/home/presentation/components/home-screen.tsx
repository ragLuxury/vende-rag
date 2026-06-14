import { BottomNav } from '@/src/shared/ui/bottom-nav';
import { DashboardCard, type DashboardCardProps } from './dashboard-card';
import { ProfileHeader } from './profile-header';

const CARDS: readonly DashboardCardProps[] = [
  {
    title: 'Mis Solicitudes',
    href: '/solicitudes',
    tone: 'bg-gradient-to-r from-[#2b211b] to-[#5a4636]',
  },
  {
    title: 'Mis Publicaciones',
    href: '/publicaciones',
    tone: 'bg-gradient-to-r from-[#1f211c] to-[#4a4d44]',
  },
  {
    title: 'Mis Ventas',
    href: '/mis-ventas',
    tone: 'bg-gradient-to-r from-[#5a4f43] to-[#8a7a66]',
  },
  {
    title: 'Mis Devoluciones',
    href: '/devoluciones',
    tone: 'bg-gradient-to-r from-[#15110f] to-[#3a3230]',
  },
];

interface HomeScreenProps {
  name: string;
}

export function HomeScreen({ name }: HomeScreenProps) {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-md flex-1 flex-col">
      <div className="flex-1 px-6 pt-8 pb-28">
        <ProfileHeader name={name} />

        <div className="mt-8 flex flex-col gap-5">
          {CARDS.map((card) => (
            <DashboardCard key={card.href} {...card} />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
