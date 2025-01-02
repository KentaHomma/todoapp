import React from 'react';
import NavItem from '@/components/common/nav-item';
import { IconHome, IconSearch, IconBrain, IconInbox, IconChecklist } from '@tabler/icons-react';
import SecondaryNav from './secondary-nav';

const MainNav: React.FC = () => {
  return (
    <aside className="main-nav">
      <div className="nav-logo">
        <h2>TODO App</h2>
      </div>
      <nav className="nav-items primary-nav">
        <NavItem icon={<IconHome size={24} />} title="ホーム" href="/" />
        <NavItem icon={<IconSearch size={24} />} title="検索" href="/search" />
        <NavItem icon={<IconBrain size={24} />} title="AI質問" href="/ai" />
        <NavItem icon={<IconInbox size={24} />} title="受信トレイ" href="/inbox" />
        <NavItem icon={<IconChecklist size={24} />} title="TODOリスト" href="/todos" />
      </nav>
      <div className="nav-divider"></div>
      <SecondaryNav />
    </aside>
  );
};

export default MainNav;