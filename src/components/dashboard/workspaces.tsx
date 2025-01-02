import React from 'react';
import { Workspace, WorkspacePage } from '../types/workspace-types';

interface WorkspacesProps {
  workspaces: Workspace[];
}

const Workspaces: React.FC<WorkspacesProps> = ({ workspaces }) => {
  return (
    <div>
      {workspaces.map((workspace) => (
        <div key={workspace.name}>
          <h2>{workspace.name} ({workspace.emoji})</h2>
          <ul>
            {workspace.pages.map((page) => (
              <li key={page.name}>
                <a href={page.url}>{page.name} ({page.emoji})</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Workspaces;