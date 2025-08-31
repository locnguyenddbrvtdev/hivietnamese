'use client';

import * as React from 'react';
import type { Breakpoint } from '@mui/material/styles';
import type { FooterProps } from './footer';
import type { NavMainProps } from './nav/types';
import type { MainSectionProps, HeaderSectionProps, LayoutSectionProps } from '../core';

import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { usePathname } from 'src/routes/hooks';

import { Logo } from 'src/components/logo';

import { NavMobile } from './nav/mobile';
import { NavDesktop } from './nav/desktop';
import { Footer, HomeFooter } from './footer';
import { MenuButton } from '../components/menu-button';
import { navData as mainNavData } from '../nav-config-main';
import { SignInButton } from '../components/sign-in-button';
import { MainSection, LayoutSection, HeaderSection } from '../core';
import { LanguagePopover } from '../components/language-popover';
import { allLangs, LangCode, useTranslate } from 'src/locales';
import { AccountDrawer } from '../components/account-drawer';
import { _account } from '../nav-config-account';
import { useAuthContext } from 'src/auth/hooks';
import CircularProgress from '@mui/material/CircularProgress';

// ----------------------------------------------------------------------

type LayoutBaseProps = Pick<LayoutSectionProps, 'sx' | 'children' | 'cssVars'>;

export type MainLayoutProps = LayoutBaseProps & {
  layoutQuery?: Breakpoint;
  slotProps?: {
    header?: HeaderSectionProps;
    nav?: {
      data?: NavMainProps['data'];
    };
    main?: MainSectionProps;
    footer?: FooterProps;
    signInContent?: string;
    trailBtnContent?: string;
    currLang?: LangCode;
  };
};

export function MainLayout({
  sx,
  cssVars,
  children,
  slotProps,
  layoutQuery = 'md',
}: MainLayoutProps) {
  const pathname = usePathname();
  const navTrans = useTranslate('main-nav');
  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

  const isHomePage = pathname === '/';

  const navData = slotProps?.nav?.data ?? mainNavData(navTrans.t);

  const renderHeader = () => {
    const headerSlots: HeaderSectionProps['slots'] = {
      topArea: (
        <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
          This is an info Alert.
        </Alert>
      ),
      leftArea: (
        <>
          {/** @slot Nav mobile */}
          <MenuButton
            onClick={onOpen}
            sx={(theme) => ({
              mr: 1,
              ml: -1,
              [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
            })}
          />
          <NavMobile data={navData} open={open} onClose={onClose} />

          {/** @slot Logo */}
          <Logo />
        </>
      ),
      rightArea: (
        <>
          {/** @slot Nav desktop */}
          <NavDesktop
            data={navData}
            sx={(theme) => ({
              display: 'none',
              [theme.breakpoints.up(layoutQuery)]: { mr: 2.5, display: 'flex' },
            })}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 } }}>
            {/** @slot Settings button */}
            {/* <SettingsButton /> */}
            <LanguagePopover data={allLangs} currLangSsr={slotProps?.currLang} />
            <RightArea
              layoutQuery={layoutQuery}
              signBtnContent={slotProps?.signInContent}
              trailBtnContent={slotProps?.trailBtnContent}
            />
          </Box>
        </>
      ),
    };

    return (
      <HeaderSection
        layoutQuery={layoutQuery}
        {...slotProps?.header}
        slots={{ ...headerSlots, ...slotProps?.header?.slots }}
        slotProps={slotProps?.header?.slotProps}
        sx={slotProps?.header?.sx}
      />
    );
  };

  const renderFooter = () =>
    isHomePage ? (
      <HomeFooter sx={slotProps?.footer?.sx} />
    ) : (
      <Footer sx={slotProps?.footer?.sx} layoutQuery={layoutQuery} />
    );

  const renderMain = () => <MainSection {...slotProps?.main}>{children}</MainSection>;

  return (
    <LayoutSection
      /** **************************************
       * @Header
       *************************************** */
      headerSection={renderHeader()}
      /** **************************************
       * @Footer
       *************************************** */
      footerSection={renderFooter()}
      /** **************************************
       * @Styles
       *************************************** */
      cssVars={cssVars}
      sx={sx}
    >
      {renderMain()}
    </LayoutSection>
  );
}

interface IRightAreaProps {
  layoutQuery?: Breakpoint;
  signBtnContent?: string;
  trailBtnContent?: string;
}

function RightArea({ layoutQuery = 'md', signBtnContent, trailBtnContent }: IRightAreaProps) {
  const navTrans = useTranslate('main-nav');
  const { authenticated, loading, user } = useAuthContext();

  if (loading) return <CircularProgress size={36} />;

  if (!authenticated)
    return (
      <>
        {/** @slot Sign in button */}
        <SignInButton ssrContent={signBtnContent} />

        {/** @slot Purchase button */}
        <Button
          variant="contained"
          rel="noopener noreferrer"
          target="_blank"
          href={paths.comingSoon}
          sx={(theme) => ({
            display: 'none',
            [theme.breakpoints.up(layoutQuery)]: { display: 'inline-flex' },
          })}
        >
          {trailBtnContent || navTrans.t('trailLesson')}
        </Button>
      </>
    );

  return <AccountDrawer data={_account} />;
}
