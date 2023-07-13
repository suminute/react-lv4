# Activerve

## 목차

- [1. 프로젝트 소개](#1-프로젝트-소개)
- [2. 기술스택](#2-기술스택)
- [3. API Table](#3-api-table)
- [4. 구현기능](#4-구현-기능)

## 1. 프로젝트 소개

Active + Verve : 활동적인, 적극적인 + 열정, 활력, 생기

활동적이고 열정적인 분위기를 조성하며, 소통과 함께 성장하는 운동 경험을 제공하는 커뮤니티!

## 2. 기술스택

<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"><img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"><img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white"><img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"><img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

## 3. API Table

| Number | Method | URL                                   | Description     | Request                                                                                        | Response                                                                                                                                                                                                     |
| ------ | ------ | ------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1      | `POST` | /api/login                            | 로그인          | {'id' : id, 'password' : password}                                                             | /token                                                                                                                                                                                                       |
| 2      | `POST` | /api/signup                           | 회원가입        | {'id' : id, 'pw' : pw}                                                                         |                                                                                                                                                                                                              |
| 3      | `POST` | /api/comment                          | 댓글 등록       | { post_id : 포스트id, comment: 댓글 내용, }                                                    |                                                                                                                                                                                                              |
| 4      | `POST` | /api/like                             | 좋아요          | ‘post_id’: 포스트id                                                                            |                                                                                                                                                                                                              |
| 5      | `POST` | /api/category                         | 카테고리 등록   | {category_name : category_name}                                                                |                                                                                                                                                                                                              |
| 6      | `POST` | /api/posting                          | 게시글 등록     | { post_title : ‘제목’, post_desc : ‘설명’, post_url : ‘url’, post_category : 카테고리의 id값 } |                                                                                                                                                                                                              |
| 7      | `GET`  | /api/posts                            | 게시글 리스트   | category_id : 카테고리의 id값                                                                  | {’posts: post_list} `'id': count,'author': userinfo['id'],'title': title_receive,'desc': desc_receive,'image': image,'category': int(category_receive),'reg_dt': datetime.now(),'link_url': url,'status': 0` |
| 8      | `GET`  | /api/categories                       | 카테고리 리스트 | \-                                                                                             | {’categories : category_list} category_list={`'id': count,'author': userinfo['id'],'img' : img_receive,'name': category_receive,'status': 0`}                                                                |
| 9      | `GET`  | /api/post?category_id=카테고리 아이디 | 게시글 1개      | post-id(쿼리스트링)                                                                            |                                                                                                                                                                                                              |

## 8. 구현 기능

### 1) 홈 화면 및 로그인 화면

### 2) 카테고리 화면 및 카테고리 등록 화면

### 3) 카테고리별 카드 리스트 화면 및 등록 화면
