# -*- coding: utf-8 -*-
"""
EPUB 미리보기 생성 스크립트
EPUB 파일에서 첫 챕터를 추출하여 HTML 미리보기 생성
"""
import os
import json
import zipfile
from pathlib import Path
from bs4 import BeautifulSoup
import html

# 경로 설정
SCRIPT_DIR = Path(__file__).parent
PREVIEWS_DIR = SCRIPT_DIR / "previews"
BOOKS_JSON = SCRIPT_DIR / "data" / "books.json"
MYJOB_DIR = Path(r"C:\Users\User\Desktop\myjob")

# EPUB 파일 매핑 (book-id -> EPUB 경로)
EPUB_MAPPING = {
    # 여행 시리즈
    "travel-10-02": MYJOB_DIR / "publication/output/Asia_Travel_Guide_by_a_110-Country_Traveler.epub",
    "travel-11-01": MYJOB_DIR / "publication/books/11-01-방글라데시/output/book.epub",
    "travel-12-01": MYJOB_DIR / "publication/books/12-01-스리랑카/output/book.epub",
    "travel-13-01": MYJOB_DIR / "publication/books/13-01-중국/output/패키지_여행만_다니던_남자,_중국_오지를_가다.epub",
    "travel-14-01": MYJOB_DIR / "publication/books/14-01-인도네시아/output/book.epub",
    "travel-21-01": MYJOB_DIR / "publication/books/21-01-발틱3국/output/발틱_3국_여행.epub",
    "travel-31-01": MYJOB_DIR / "publication/books/31-01-사우디/output/book.epub",
    "travel-42-01": MYJOB_DIR / "publication/books/42-01-북아프리카/output/북아프리카_반전여행.epub",

    # 소설 시리즈
    "fiction-02": MYJOB_DIR / "writing_novel/ux_agent_3/phase3_manuscript/불완전한육체들_ebook/professional/2권_불완전한육체들.epub",
    "fiction-03": MYJOB_DIR / "writing_novel/ux_agent_3/phase3_manuscript/불완전한육체들_ebook/professional/3권_불완전한육체들.epub",

    # K-Drama Korean 시리즈
    "kdrama-01": MYJOB_DIR / "kdrama/google_play_upload/kdrama-01-romance-complete-en.epub",
    "kdrama-02": MYJOB_DIR / "kdrama/google_play_upload/kdrama-02-office-complete-en.epub",
    "kdrama-03": MYJOB_DIR / "kdrama/google_play_upload/kdrama-03-thriller-complete-en.epub",
    "kdrama-04": MYJOB_DIR / "kdrama/google_play_upload/kdrama-04-family-complete-en.epub",
    "kdrama-05": MYJOB_DIR / "kdrama/google_play_upload/kdrama-05-medical-complete-en.epub",
    "kdrama-06": MYJOB_DIR / "kdrama/google_play_upload/kdrama-06-legal-complete-en.epub",
    "kdrama-07": MYJOB_DIR / "kdrama/google_play_upload/kdrama-07-historical-complete-en.epub",
    "kdrama-08": MYJOB_DIR / "kdrama/google_play_upload/kdrama-08-comedy-complete-en.epub",
    "kdrama-09": MYJOB_DIR / "kdrama/google_play_upload/kdrama-09-fantasy-complete-en.epub",
    "kdrama-10": MYJOB_DIR / "kdrama/google_play_upload/kdrama-10-school-complete-en.epub",

    # K-Life Korean 시리즈
    "klife-01": MYJOB_DIR / "kdrama/google_play_upload/_klife/klife-01-food-complete-en.epub",
    "klife-02": MYJOB_DIR / "kdrama/google_play_upload/_klife/klife-02-drinking-complete-en.epub",
    "klife-03": MYJOB_DIR / "kdrama/google_play_upload/_klife/klife-03-holidays-complete-en.epub",
    "klife-04": MYJOB_DIR / "kdrama/google_play_upload/_klife/klife-04-wedding-complete-en.epub",
    "klife-05": MYJOB_DIR / "kdrama/google_play_upload/_klife/klife-05-funeral-complete-en.epub",
    "klife-06": MYJOB_DIR / "kdrama/google_play_upload/_klife/klife-06-military-complete-en.epub",
    "klife-07": MYJOB_DIR / "kdrama/google_play_upload/_klife/klife-07-beauty-complete-en.epub",
    "klife-08": MYJOB_DIR / "kdrama/google_play_upload/_klife/klife-08-fashion-complete-en.epub",
    "klife-09": MYJOB_DIR / "kdrama/google_play_upload/_klife/klife-09-apartment-complete-en.epub",
    "klife-10": MYJOB_DIR / "kdrama/google_play_upload/_klife/klife-10-hagwon-complete-en.epub",
}


def extract_first_chapter(epub_path):
    """EPUB에서 첫 챕터 추출"""
    try:
        with zipfile.ZipFile(epub_path, 'r') as epub:
            # content.opf 찾기
            opf_path = None
            for name in epub.namelist():
                if name.endswith('.opf') or 'content.opf' in name:
                    opf_path = name
                    break

            if not opf_path:
                print(f"  Warning: content.opf not found in {epub_path.name}")
                return None

            # OPF 파싱하여 spine 정보 가져오기
            opf_content = epub.read(opf_path).decode('utf-8')
            opf_soup = BeautifulSoup(opf_content, 'xml')

            # manifest에서 아이템 찾기
            manifest_items = {}
            for item in opf_soup.find_all('item'):
                item_id = item.get('id')
                href = item.get('href')
                if item_id and href:
                    manifest_items[item_id] = href

            # spine에서 첫 번째 아이템 찾기
            spine = opf_soup.find('spine')
            if not spine:
                print(f"  Warning: spine not found in {epub_path.name}")
                return None

            itemrefs = spine.find_all('itemref')
            if not itemrefs:
                print(f"  Warning: no itemrefs in spine in {epub_path.name}")
                return None

            # 첫 번째 챕터 찾기 (cover가 아닌 것)
            first_chapter_path = None
            for itemref in itemrefs[:5]:  # 처음 5개 중에서
                idref = itemref.get('idref')
                if idref in manifest_items:
                    href = manifest_items[idref]
                    # cover나 titlepage 제외
                    if 'cover' not in href.lower() and 'title' not in href.lower():
                        # OPF 경로 기준으로 상대경로 계산
                        opf_dir = os.path.dirname(opf_path)
                        first_chapter_path = os.path.join(opf_dir, href).replace('\\', '/')
                        break

            if not first_chapter_path:
                print(f"  Warning: could not find first chapter in {epub_path.name}")
                return None

            # 챕터 내용 읽기
            try:
                chapter_content = epub.read(first_chapter_path).decode('utf-8')
                return chapter_content
            except KeyError:
                print(f"  Warning: chapter file not found: {first_chapter_path}")
                return None

    except Exception as e:
        print(f"  Error extracting from {epub_path.name}: {e}")
        return None


def clean_html_content(html_content):
    """HTML 내용 정리 및 미리보기용으로 변환"""
    soup = BeautifulSoup(html_content, 'html.parser')

    # body 내용만 추출
    body = soup.find('body')
    if not body:
        # body가 없으면 전체 사용
        content = str(soup)
    else:
        content = str(body)

    # 이미지 제거 (미리보기에서는 텍스트만)
    soup_clean = BeautifulSoup(content, 'html.parser')
    for img in soup_clean.find_all('img'):
        img.decompose()

    return str(soup_clean)


def create_preview_html(book_id, book_info, chapter_content):
    """미리보기 HTML 생성"""
    title = book_info.get('title_ko', book_info.get('title_en', 'Preview'))
    author = book_info.get('author', 'Unknown')

    # 챕터 내용 정리
    cleaned_content = clean_html_content(chapter_content)

    html_template = f"""<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{html.escape(title)} - Preview</title>
    <style>
        body {{
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            line-height: 1.8;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }}
        .preview-container {{
            background-color: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }}
        .preview-header {{
            border-bottom: 2px solid #333;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }}
        .preview-title {{
            font-size: 28px;
            font-weight: bold;
            margin: 0 0 10px 0;
            color: #333;
        }}
        .preview-author {{
            font-size: 16px;
            color: #666;
            margin: 0;
        }}
        .preview-content {{
            font-size: 16px;
            color: #333;
        }}
        .preview-content h1 {{
            font-size: 24px;
            margin-top: 30px;
            margin-bottom: 15px;
        }}
        .preview-content h2 {{
            font-size: 20px;
            margin-top: 25px;
            margin-bottom: 12px;
        }}
        .preview-content p {{
            margin-bottom: 15px;
            text-align: justify;
        }}
        .preview-footer {{
            margin-top: 50px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            text-align: center;
            color: #999;
            font-size: 14px;
        }}
        .copyright {{
            margin-top: 10px;
        }}
    </style>
</head>
<body>
    <div class="preview-container">
        <div class="preview-header">
            <h1 class="preview-title">{html.escape(title)}</h1>
            <p class="preview-author">저자: {html.escape(author)}</p>
        </div>

        <div class="preview-content">
            {cleaned_content}
        </div>

        <div class="preview-footer">
            <p>이 미리보기는 책의 일부입니다.</p>
            <p class="copyright">© Spectrum Workshop. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
"""
    return html_template


def main():
    """메인 함수"""
    print("EPUB 미리보기 생성 시작...")

    # books.json 읽기
    with open(BOOKS_JSON, 'r', encoding='utf-8') as f:
        data = json.load(f)

    books = {book['id']: book for book in data['books']}

    # previews 디렉토리 확인
    PREVIEWS_DIR.mkdir(exist_ok=True)

    # 미리보기 생성 통계
    success_count = 0
    skip_count = 0
    error_count = 0
    updated_book_ids = []

    # 각 EPUB 처리
    for book_id, epub_path in EPUB_MAPPING.items():
        print(f"\n처리 중: {book_id}")

        # 이미 미리보기가 있는지 확인
        preview_file = PREVIEWS_DIR / f"{book_id}.html"
        if preview_file.exists():
            print(f"  이미 존재함: {preview_file.name}")
            skip_count += 1
            # books.json에서 preview_available 확인
            if book_id in books and not books[book_id].get('preview_available', False):
                books[book_id]['preview_available'] = True
                updated_book_ids.append(book_id)
            continue

        # EPUB 파일 존재 확인
        if not epub_path.exists():
            print(f"  오류: EPUB 파일을 찾을 수 없음: {epub_path}")
            error_count += 1
            continue

        # 책 정보 확인
        if book_id not in books:
            print(f"  경고: books.json에 {book_id} 정보 없음")
            error_count += 1
            continue

        book_info = books[book_id]

        # 첫 챕터 추출
        print(f"  EPUB 읽는 중: {epub_path.name}")
        chapter_content = extract_first_chapter(epub_path)

        if not chapter_content:
            print(f"  오류: 챕터를 추출할 수 없음")
            error_count += 1
            continue

        # HTML 생성
        preview_html = create_preview_html(book_id, book_info, chapter_content)

        # 파일 저장
        with open(preview_file, 'w', encoding='utf-8') as f:
            f.write(preview_html)

        print(f"  생성 완료: {preview_file.name}")
        success_count += 1

        # books.json 업데이트
        books[book_id]['preview_available'] = True
        updated_book_ids.append(book_id)

    # books.json 업데이트
    if updated_book_ids:
        print(f"\nbooks.json 업데이트 중... ({len(updated_book_ids)}개 항목)")
        data['books'] = list(books.values())
        with open(BOOKS_JSON, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print("books.json 업데이트 완료")

    # 결과 출력
    print("\n" + "="*60)
    print("미리보기 생성 완료")
    print(f"  성공: {success_count}개")
    print(f"  건너뜀: {skip_count}개")
    print(f"  오류: {error_count}개")
    print(f"  books.json 업데이트: {len(updated_book_ids)}개")
    print("="*60)


if __name__ == "__main__":
    main()
