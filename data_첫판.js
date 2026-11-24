// 취향 갤러리 데이터 — 학생이 고치는 곳은 이 파일 하나입니다.
// 카드는 7장(4 · 5 · 6 · 7 · 9 · 10 · 11주). week 숫자는 바꾸지 않습니다(서브 페이지 파일 이름과 같습니다).
// author는 한글 이름, authorEn은 영문 이름입니다. 화면 왼쪽 위에 "영문이름 Archive"로 나옵니다.
// name은 한 단어, nameEn은 그 영문입니다(카드 아래 영문 라벨). object는 오브젝트 이름이고 objects 폴더의 hairline-이름.html 중 이름 부분을 쓰면 바뀝니다.
// color는 오브젝트의 선 색입니다. {"hi": "#2f6fd6", "edge": "#7a9ccf"}처럼 # 색 코드로 씁니다(hi 강조선 · edge 윤곽선 · mid 기본선 · lo 흐린선 · stroke 선 굵기 0.5~2.5). 비워 두면 기본 색입니다.
// 메모(note)에는 위의 내용 · 의도 · 기준에 없는 새 사실을 한 가지 적습니다(물건 이름, 곡 하나, 고르다 뺀 것 등). 같은 말을 다시 쓰면 글이 비어 보입니다.
// archive는 서브 페이지에 보관하는 그 주의 작업입니다. itemsLabel(모은 것의 이름) · items(모은 것: title 제목 · meta 곁글 · text 한 줄 · src 이미지) · open(열어 볼 페이지: label · href). 서브 페이지에는 items가 사진 한 장 + 제목 · 설명으로 넘어가는 화면으로 나옵니다. 이미지는 images 폴더에, 열어 볼 페이지는 작품 폴더에 복사해 두고 그 경로를 씁니다.
// embed(선택)는 열어 볼 페이지를 서브 페이지 화면 안에 그대로 넣는 값입니다: "embed": {"src": "작품/10주/레코드/index.html", "title": "10주 내 음악 페이지"}. 내 페이지가 화면 안에서 어색하면 embed를 지우고 open만 씁니다.
// 쉼표 · 따옴표 · 괄호가 하나라도 빠지면 화면이 비고 빨간 문구가 나옵니다. 그럴 땐 data_첫판.js와 비교하세요.
window.GALLERY = {
  "author": "양서윤",
  "authorEn": "YANGSEOYUN",
  "definition": "저는 차분한 색감 위에 섬세한 디테일을 더해,\n작지만 분명한 취향이 느껴지는 디자인을 만듭니다.",
  "cards": [
    {
      "week": 4,
      "name": "시선",
      "nameEn": "Gaze",
      "object": "terrain",
      "color": {},
      "what": "하늘·손·길 사진을 묶어 만든 아카이브 사이트",
      "why": "커서를 올리면 구름이 흘러갑니다. 내가 올려다본 하늘처럼, 시선이 닿는 곳이 움직입니다.",
      "line": "일상적인 장면도 바라보는 시선과 구도에 따라 새로운 분위기를 만들 수 있다.",
      "note": "",
      "archive": {
        "itemsLabel": "",
        "items": [],
        "open": []
      }
    },
    {
      "week": 5,
      "name": "사람",
      "nameEn": "Dear",
      "object": "gears",
      "color": {},
      "what": "엄마를 주제로 만든 아카이브 사이트 — 여행·소품·생일 세 장면",
      "why": "초 여러 개에 불꽃이 흔들립니다. 특별한 날을 가족과 함께 밝히는 사람입니다.",
      "line": "화면의 색을 정할 때 사진과 자연스럽게 어우러지는 색을 선택한다.",
      "note": "",
      "archive": {
        "itemsLabel": "",
        "items": [],
        "open": []
      }
    },
    {
      "week": 6,
      "name": "공간",
      "nameEn": "Space",
      "object": "lamp",
      "color": {},
      "what": "분홍·하늘·크림 색의 공간 세 곳을 담은 아카이브 사이트",
      "why": "커서를 밀면 커튼이 살랑 움직입니다. 머물고 싶은 자리처럼, 부드러운 천이 따라 움직입니다.",
      "line": "공간의 분위기는 색의 조화와 여백, 작은 시각적 요소들의 균형으로 완성된다.",
      "note": "",
      "archive": {
        "itemsLabel": "",
        "items": [],
        "open": []
      }
    },
    {
      "week": 7,
      "name": "취향",
      "nameEn": "Taste",
      "object": "drawers",
      "color": {},
      "what": "매일 고르는 물건 다섯 개를 담은 아카이브 사이트 — 첫 배포",
      "why": "커서를 올리면 인형이 흔들립니다. 각자 다른 사람이 내 취향을 알고 골라 준 물건들입니다.",
      "line": "보이지 않는 곳의 디테일까지 내 취향으로 고른 물건들.",
      "note": "",
      "archive": {
        "itemsLabel": "",
        "items": [],
        "open": []
      }
    },
    {
      "week": 9,
      "name": "문장",
      "nameEn": "Words",
      "object": "bookshelf",
      "color": {},
      "what": "감각적인 말 다섯 개를 타이포그래피 이미지로 만든 책 페이지",
      "why": "커서를 올리면 달이 차오릅니다. 한 달에 한 번, 꽉 차는 순간처럼 말도 꽉 찹니다.",
      "line": "글자의 형태와 크기, 간격을 세심하게 조율해 문장 자체가 하나의 시각적 이미지가 되도록 한다.",
      "note": "",
      "archive": {
        "itemsLabel": "",
        "items": [],
        "open": []
      }
    },
    {
      "week": 10,
      "name": "박자",
      "nameEn": "Rhythm",
      "object": "metronome",
      "color": {},
      "what": "선곡한 다섯 곡을 담은 레코드 페이지",
      "why": "커서를 올리면 레코드판이 돌아갑니다. 작업할 때 틀어 두는 내 박자입니다.",
      "line": "음악이 가진 리듬과 분위기를 색과 형태, 움직임으로 번역해 시각적으로 표현한다.",
      "note": "",
      "archive": {
        "itemsLabel": "",
        "items": [],
        "open": []
      }
    },
    {
      "week": 11,
      "name": "장면",
      "nameEn": "Scene",
      "object": "ribbon",
      "color": {},
      "what": "영화 다섯 편의 배색을 추출해 만든 색 카드와 극장 페이지",
      "why": "커서를 따라 별이 흩어집니다. 어두운 화면 속에서 작은 빛이 반짝이듯, 장면이 감정을 남깁니다.",
      "line": "어두운 무채색 바탕 위에 작은 포인트 컬러 하나가 감정을 환기한다.",
      "note": "",
      "archive": {
        "itemsLabel": "",
        "items": [],
        "open": []
      }
    }
  ]
};
