import React, { useRef, useState } from 'react';

import { Box, Paper, Button, MenuList, MenuItem } from '@mui/material';

type SubMenu = {
  label: string;
  value: string;
};

type MenuGroup = {
  key: string;
  label: string;
  submenus: SubMenu[];
};

type Props = {
  menuGroups: MenuGroup[];
  onSelectSubmenu: (submenu: SubMenu) => void;
};

export const TopLevelMenuBar: React.FC<Props> = ({ menuGroups, onSelectSubmenu }) => {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseLeave = (e: React.MouseEvent) => {
    const related = e.relatedTarget as Node;
    if (containerRef.current && !containerRef.current.contains(related)) {
      setHoveredKey(null);
    }
  };

  return (
    <Box
      ref={containerRef}
      display="flex"
      gap={2}
      position="relative"
      onMouseLeave={handleMouseLeave}
    >
      {menuGroups.map((group) => (
        <Box key={group.key} position="relative">
          <Button
            variant="text"
            sx={{ color: 'text.primary', fontWeight: 'bold' }}
            onMouseEnter={() => setHoveredKey(group.key)}
          >
            {group.label}
          </Button>

          {hoveredKey === group.key && (
            <Box
              sx={{
                position: 'absolute',
                top: '100%',
                left: 0,
              }}
            >
              <Paper elevation={3}>
                <MenuList>
                  {group.submenus.map((submenu) => (
                    <MenuItem
                      key={submenu.value}
                      onClick={() => {
                        onSelectSubmenu(submenu);
                        setHoveredKey(null);
                      }}
                    >
                      {submenu.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </Paper>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};
