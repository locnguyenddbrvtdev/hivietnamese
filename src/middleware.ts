import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { fallbackLng, LangCode, supportedLngs } from './locales';

// --- helpers ---
function mapToSupported(code: string | undefined | null): LangCode | null {
  if (!code) return null;
  const c = code.toLowerCase();
  const base = c.split('-')[0];
  if (supportedLngs.includes(base as LangCode)) return base as LangCode;
  if (base === 'zh') return 'cn';
  if (base === 'ja') return 'jp';
  if (base === 'ko') return 'kr';
  return null;
}

function detectPreferred(req: NextRequest): LangCode {
  // 1) cookie ưu tiên
  const cookieLng = mapToSupported(req.cookies.get('lng')?.value);
  if (cookieLng) return cookieLng;

  // 2) accept-language
  const al = req.headers.get('accept-language') || '';
  const candidates = al.split(',').map((x) => x.trim().split(';')[0]);
  for (const cand of candidates) {
    const m = mapToSupported(cand);
    if (m) return m;
  }
  // 3) fallback
  return fallbackLng;
}

const LANG_REGEX = new RegExp(`^/(${supportedLngs.join('|')})(?=/|$)`, 'i');

// Toggle: cookie có override URL không?
const COOKIE_TAKES_PRECEDENCE = true;

// --- middleware ---
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log('MIDDLEWARE', pathname);
  // Bỏ qua asset, API, và file tĩnh (có đuôi)
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/sitemap.xml') ||
    pathname.startsWith('/manifest') ||
    pathname.match(/\.[a-zA-Z0-9]+$/)
  ) {
    return NextResponse.next();
  }

  const hasLang = LANG_REGEX.test(pathname);
  const cookieLng = mapToSupported(req.cookies.get('lng')?.value);

  // 1) Chưa có /:lang -> redirect theo cookie trước, rồi Accept-Language
  if (!hasLang) {
    const preferred = cookieLng ?? detectPreferred(req);
    const url = req.nextUrl.clone();
    url.pathname = `/${preferred}${pathname}`;
    return NextResponse.redirect(url, 308);
  }

  // 2) Đã có /:lang
  const currentLang = (pathname.split('/')[1] || fallbackLng).toLowerCase() as LangCode;

  // 2a) Nếu ưu tiên cookie & cookie khác URL -> redirect về cookie
  if (COOKIE_TAKES_PRECEDENCE && cookieLng && cookieLng !== currentLang) {
    const url = req.nextUrl.clone();
    url.pathname = `/${cookieLng}${pathname.replace(LANG_REGEX, '')}`;
    return NextResponse.redirect(url, 308);
  }

  // 2b) Đồng bộ cookie với URL nếu cần
  const res = NextResponse.next();
  if (!cookieLng || cookieLng !== currentLang) {
    res.cookies.set('lng', currentLang, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 năm
      sameSite: 'lax',
    });
  }
  return res; // ⚠️ Trả về res (không phải NextResponse.next()) để set-cookie có hiệu lực
}

// Chỉ bắt những route “page” (không bắt file/asset)
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
