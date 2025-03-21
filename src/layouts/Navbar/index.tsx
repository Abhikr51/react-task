import React, { useContext } from 'react';
import { Avatar, Button, FlexItem, FlexLayout, NavigationItem, Panel, StackLayout, ToggleButton, ToggleButtonGroup } from "@salt-ds/core";
import styles from "./index.module.css";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AppRoutes from '../../app-routes';
import { DarkIcon, LightIcon, NotificationIcon } from '@salt-ds/icons';
import { AppContext } from '../../context/AppContext'; // Import AppContext

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { appThemeMode, setAppThemeMode } = useContext(AppContext);

  const toggleTheme = () => {
    setAppThemeMode(appThemeMode === 'light' ? 'dark' : 'light');
  };

  return (
    <Panel variant='tertiary' className={styles.navContainer} >
      <StackLayout>
      <FlexItem className={styles.pointer} onClick={() => navigate('/')}>
          <FlexLayout align='center' gap={2} separators>
            <FlexItem>
              <img className={styles.logo} src={'/logo512.png'} alt='React Logo' />
            </FlexItem>
            <FlexItem>
              <h2>React Tasks</h2>
            </FlexItem>
          </FlexLayout>
        </FlexItem>
      </StackLayout>
      <FlexLayout
        justify='space-between'
        align='center'
        id='navbar'
      >
        <FlexItem>
          <FlexLayout>
            {
              AppRoutes.map(({ title, Icon, path }) => (
                <FlexItem key={path}>
                  <NavigationItem
                    className={styles.navItems}
                    active={location.pathname === path}
                    render={<Link to={path} />}
                  >
                    <FlexLayout align='center' gap={2}>
                      <FlexItem>
                        <Icon />
                      </FlexItem>
                      <FlexItem>
                        {title}
                      </FlexItem>
                    </FlexLayout>
                  </NavigationItem>
                </FlexItem>
              ))
            }
          </FlexLayout>
        </FlexItem>
        <FlexItem >
          <FlexLayout align='center'>

            <FlexItem>
              <ToggleButtonGroup onChange={toggleTheme} value={appThemeMode}>
                <ToggleButton  value="light"> <LightIcon/> Light</ToggleButton>
                <ToggleButton value="dark"> <DarkIcon/> Dark</ToggleButton>
              </ToggleButtonGroup>
              {/* <Button onClick={toggleTheme}>Toggle Theme</Button> Add toggle button */}
            </FlexItem>
            {/* <FlexItem>
              <NotificationIcon size={1.5} />
            </FlexItem> */}
            <FlexItem>
              <Avatar
                className={styles.pointer}
                size={1.2}
                name='Abhijit Kumar'
                color="category-14"
                onClick={() => navigate('/profile')}
              />
            </FlexItem>
          </FlexLayout>
        </FlexItem>
      </FlexLayout>
    </Panel>
  )
}