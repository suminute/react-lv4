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

| Number | Method  | URL              | Description | Request                                                                                                                                                                             | Response                                                                                                                                                                            |
| ------ | ------- | ---------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1      | `POST`  | /api/login       | 로그인      | {'id' : id, 'password' : password}                                                                                                                                                  |                                                                                                                                                                                     |
| 2      | `POST`  | /api/signup      | 회원가입    | {'id' : id, 'password' : password, 'userName':userName}                                                                                                                             |                                                                                                                                                                                     |
| 3      | `GET`   | /api/posts       | 게시물 조회 |                                                                                                                                                                                     | {'id' : id, 'body' : body, 'userName' : userName, 'userId' : userId, 'date' : date, 'currentTime' : currentTime, 'kcal' : kcal, 'exerciseHour' : exerciseHour, 'isDeleted' : false} |
| 4      | `POST`  | /api/posts       | 게시물 등록 | {'id' : id, 'body' : body, 'userName' : userName, 'userId' : userId, 'date' : date, 'currentTime' : currentTime, 'kcal' : kcal, 'exerciseHour' : exerciseHour, 'isDeleted' : false} |                                                                                                                                                                                     |
| 5      | `PATCH` | /api/posts/id    | 게시물 삭제 | {'isDeleted' : false}                                                                                                                                                               | 삭제 성공 메시지                                                                                                                                                                    |
| 6      | `PATCH` | /api/posts/id    | 게시물 수정 | {'body' : body, 'userName' : userName, 'kcal' : kcal, 'exerciseHour' : exerciseHour}                                                                                                | 수정 성공 메시지                                                                                                                                                                    |
| 7      | `GET`   | /api/comments    | 댓글 조회   |                                                                                                                                                                                     | {'id' : id, 'postId' : postId, 'userId' : userId, 'userName' : userName, 'body' : body, 'currentTime' : currentTime, 'isDeleted' : false}                                           |
| 8      | `POST`  | /api/comments    | 댓글 등록   | {'id' : id, 'postId' : postId, 'userId' : userId, 'userName' : userName, 'body' : body, 'currentTime' : currentTime, 'isDeleted' : false}                                           |                                                                                                                                                                                     |
| 9      | `PATCH` | /api/comments/id | 댓글 삭제   | {'isDeleted' : false}                                                                                                                                                               | 삭제 성공 메시지                                                                                                                                                                    |

## 4. 구현 기능

### 1) 홈 화면 및 로그인/회원가입 화면

- 홈 화면

![image](https://github.com/suminute/react-lv4/assets/92218638/f75f993a-d90b-4e28-8ef7-4064cf476c03)

- 로그인 화면

![image](https://github.com/suminute/react-lv4/assets/92218638/e0c2a900-8f64-4f1d-b536-82f546ba978c)

- 회원가입 화면

![image](https://github.com/suminute/react-lv4/assets/92218638/19c3e217-af60-41a5-8f6b-1cc0c3405b51)

### 2) 게시물 등록 화면

- 로그인 전

![image](https://github.com/suminute/react-lv4/assets/92218638/f4c94961-0cc8-43c0-b97a-dedbf51f8147)

- 로그인 후

![image](https://github.com/suminute/react-lv4/assets/92218638/99843651-7c34-4282-83f4-026f4f0b7b35)

### 3) 게시물 상세페이지 화면

![image](https://github.com/suminute/react-lv4/assets/92218638/8b7fc780-da58-455c-b5b0-b8b8319980e9)
