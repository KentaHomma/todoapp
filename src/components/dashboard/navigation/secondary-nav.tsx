'use client';

import React from 'react';
import NavItem from '@/components/common/nav-item';
import { 
  IconCalendar, 
  IconSettings, 
  IconTemplate, 
  IconTrash, 
  IconHelp 
} from '@tabler/icons-react';

const SecondaryNav: React.FC = () => {
  return (
    <nav className="secondary-nav">
      <NavItem 
        icon={<IconCalendar size={24} />} 
        title="カレンダー" 
        href="/calendar" 
      />
      <NavItem 
        icon={<IconSettings size={24} />} 
        title="設定" 
        href="/settings" 
      />
      <NavItem 
        icon={<IconTemplate size={24} />} 
        title="テンプレート" 
        href="/templates" 
      />
      <NavItem 
        icon={<IconTrash size={24} />} 
        title="ゴミ箱" 
        href="/trash" 
      />
      <NavItem 
        icon={<IconHelp size={24} />} 
        title="ヘルプ" 
        href="/help" 
      />
    </nav>
  );
};

export default SecondaryNav;