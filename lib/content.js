import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

const ROOT = process.cwd();
const CONTENT = path.join(ROOT, 'content');
const IMAGES = path.join(ROOT, 'public', 'images');

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** 섹션 본문 Markdown → HTML. HTML 주석은 제거한다(원고 메모용). */
function bodyToHtml(body) {
  const cleaned = body.replace(/<!--[\s\S]*?-->/g, '').trim();
  return cleaned ? marked.parse(cleaned) : '';
}

/** 인라인 Markdown(**굵게** 등)만 허용하는 짧은 문자열 변환 */
export function inline(str = '') {
  return marked.parseInline(String(str));
}

export function getSite() {
  const raw = fs.readFileSync(path.join(CONTENT, 'site.md'), 'utf8');
  return matter(raw).data;
}

export function getSections() {
  const dir = path.join(CONTENT, 'sections');
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, f), 'utf8'));
      return { ...data, html: bodyToHtml(content), file: f };
    })
    .sort((a, b) => a.order - b.order);
}

/**
 * 출처 키 → 노출 문구. CONTENT_GUIDE.md §2 표를 그대로 읽어 단일 원천을 유지한다.
 * 행 형식: | `key` | 출처 문구 |
 */
export function getSources() {
  const raw = fs.readFileSync(path.join(ROOT, 'CONTENT_GUIDE.md'), 'utf8');
  const map = {};
  for (const line of raw.split('\n')) {
    const m = line.match(/^\|\s*`([a-z0-9-]+)`\s*\|\s*(.+?)\s*\|\s*$/);
    if (m) map[m[1]] = m[2];
  }
  return map;
}

/** public/images 안에 실제 파일이 있을 때만 이미지 URL을 돌려준다(없으면 자리표시자). */
export function imageUrl(file) {
  if (!file) return null;
  if (/^https?:\/\//.test(file)) return file;
  const p = path.join(IMAGES, file);
  return fs.existsSync(p) ? `${basePath}/images/${file}` : null;
}

/** public/images/manifest.json — 이미지 원본 크기. 프레임 비율과 다르면 여백(contain)을 넣는다. */
let _manifest;
export function imageSize(file) {
  if (!_manifest) {
    const p = path.join(IMAGES, 'manifest.json');
    _manifest = fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : {};
  }
  return _manifest[file] || null;
}
