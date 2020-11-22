import * as React from 'react';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import SettingsIcon from '@material-ui/icons/Settings';
import { useMediaQuery, Theme } from '@material-ui/core';
import { useTranslate, DashboardMenuItem, MenuItemLink } from 'react-admin';

import business from '../business';

import SubMenu from './SubMenu';
import { AppState } from '../types';

type MenuName = 'menuCatalog' | 'menuSimulator' | 'menuAssets';

interface Props {
    dense: boolean;
    logout: () => void;
    onMenuClick: () => void;
}

const catalogItems = ['Business', 'Category', 'Product', 'Logo', 'Theme'];
const assetsItems = ['Font', 'UploadedImage'];

const Menu: FC<Props> = ({ onMenuClick, dense, logout }) => {
    const [state, setState] = useState({
        menuCatalog: true,
        menuAssets: true,
        menuSimulator: true
    });
    const translate = useTranslate();
    const isXSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('xs')
    );
    const open = useSelector((state: AppState) => state.admin.ui.sidebarOpen);
    useSelector((state: AppState) => state.theme); // force rerender on theme change

    const handleToggle = (menu: MenuName) => {
        setState(state => ({ ...state, [menu]: !state[menu] }));
    };

    return (
        <div>
            {' '}
            <DashboardMenuItem onClick={onMenuClick} sidebarIsOpen={open} />
            <SubMenu
                handleToggle={() => handleToggle('menuCatalog')}
                isOpen={state.menuCatalog}
                sidebarIsOpen={open}
                name="pos.menu.catalog"
                icon={<business.icon />}
                dense={dense}
            >
                {catalogItems.map((menuItem) => (
                    <MenuItemLink
                        key={menuItem}
                        to={`/${menuItem}`}
                        primaryText={menuItem}
                        onClick={onMenuClick}
                        leftIcon={<business.icon />}
                        sidebarIsOpen={open}
                        dense={dense}
                    />
                ))}
            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle('menuAssets')}
                isOpen={state.menuAssets}
                sidebarIsOpen={open}
                name="Assets"
                icon={<business.icon />}
                dense={dense}
            >
                {assetsItems.map((menuItem) => (
                    <MenuItemLink
                        key={menuItem}
                        to={`/${menuItem}`}
                        primaryText={menuItem}
                        onClick={onMenuClick}
                        leftIcon={<business.icon />}
                        sidebarIsOpen={open}
                        dense={dense}
                    />
                ))}
            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle('menuSimulator')}
                isOpen={state.menuSimulator}
                sidebarIsOpen={open}
                name="Simulator"
                icon={<business.icon />}
                dense={dense}
            >
                    <MenuItemLink
                        to="/simulator"
                        primaryText="Simulator"
                        onClick={onMenuClick}
                        leftIcon={<business.icon />}
                        sidebarIsOpen={open}
                        dense={dense}
                    />
            </SubMenu>
            {isXSmall && (
                <MenuItemLink
                    to="/configuration"
                    primaryText={translate('pos.configuration')}
                    leftIcon={<SettingsIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            )}
            {isXSmall && logout}
        </div>
    );
};

export default Menu;
