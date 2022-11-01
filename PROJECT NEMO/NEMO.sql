CREATE DATABASE nemodb;
drop database nemodb;

USE nemodb;

CREATE TABLE MEMBER (
                  MEMBER_NUM INT AUTO_INCREMENT PRIMARY KEY COMMENT '회원 번호',
                        MEMBER_NICKNAME VARCHAR(20) UNIQUE COMMENT '닉네임',
                        MEMBER_NAME VARCHAR(20) COMMENT '회원 이름',
                        MEMBER_ID VARCHAR(20) UNIQUE COMMENT '회원 아이디',
                        MEMBER_PW VARCHAR(300) COMMENT '회원 비밀번호',
                        MEMBER_DATE DATETIME COMMENT '멤버 TIME',
                        MEMBER_USER VARCHAR(20) COMMENT '권한 A:관리자 U:사용자',
                        MEMBER_PHONE VARCHAR(13) COMMENT '회원 휴대폰 번호',
                        MEMBER_CODE VARCHAR(50) COMMENT '이메일 인증 코드',
                        MEMBER_EMAIL VARCHAR(20) UNIQUE COMMENT '회원 이메일',
                        MEMBER_ADDRESS VARCHAR(50) COMMENT '회원 주소',
						MEMBER_WARNING INT COMMENT '신고 누적 횟수',
                        MEMBER_CLEAN VARCHAR(50) COMMENT '신고 누적 횟수'
                        );

drop table item;

CREATE TABLE ITEM (
               ITEM_NUM INT AUTO_INCREMENT PRIMARY KEY COMMENT '상품 번호',
                    ITEM_MAINCATEGORY VARCHAR(50) COMMENT '상품 대분류명',
                    ITEM_SUBCATEGORY VARCHAR(50) COMMENT '상품 소분류명',
                    ITEM_NAME VARCHAR(50) COMMENT '상품명',
                    ITEM_PRICE INT COMMENT '상품 가격',
                    ITEM_DEPOSIT INT COMMENT '보증금',
                    ITEM_DATE DATETIME COMMENT '상품 등록일',
                    ITEM_READCOUNT INT DEFAULT 0 COMMENT '조회수(DEFAULT 0)',
                    ITEM_DETAIL TEXT COMMENT '상품 설명',
                    ITEM_WRITER VARCHAR(50) COMMENT '작성자',
                    ITEM_WEATHER VARCHAR(10) COMMENT '계절(봄,여름,가을,겨울)',
                    ITEM_IMAGE VARCHAR(300) COMMENT '이미지',
                    ITEM_IMAGEPATH VARCHAR(300) COMMENT '이미지 저장 파일 경로',
                    ITEM_TOPSIZE VARCHAR(50) COMMENT '상의사이즈',
                    ITEM_BOTTOMSIZE VARCHAR(50) COMMENT '하의사이즈',
                    ITEM_ETCSIZE VARCHAR(50) COMMENT '그 외 사이즈',
                    ITEM_HEIGHT VARCHAR(50) COMMENT '키(150~190)',
                    ITEM_RENTALPERIOD DATETIME COMMENT '대여가능기간' 
);

ALTER TABLE ITEM ADD FOREIGN KEY(ITEM_WRITER) REFERENCES MEMBER(MEMBER_ID);

CREATE TABLE REVIEW (
                        REVIEW_NUM INT PRIMARY KEY AUTO_INCREMENT COMMENT '리뷰 번호',
                        REVIEW_WRITER VARCHAR(50) COMMENT '작성자',
                        REVIEW_ID VARCHAR(50) COMMENT '대여해준사람 아이디',
                        REVIEW_IMAGE VARCHAR(300) COMMENT '후기 작성 이미지 업로드',
                        REVIEW_PRODUCTIDX INT COMMENT '상품 번호(상품테이블)',
                        REVIEW_CONTENTS TEXT COMMENT '내용',
                        REVIEW_SATISFACTION INT COMMENT '만족도'
);

-- 내가 작성한 상품에 대한 후기리스트 (item table + review table join)
select i.ITEM_IMAGE, i.ITEM_NAME, r.REVIEW_WRITER, r.REVIEW_IMAGE, r.REVIEW_CONTENTS, r.REVIEW_SATISFACTION
from review r 
left join item i 
on r.review_num = i.item_num 
where r.REVIEW_WRITER = 'minmin'
group by i.item_name
order by r.review_num desc;

-- 상품 가져오는 쿼리 하나 (객체) / 후기 가져오는 쿼리 하나 (배열)

-- 내가 작성한 리뷰 목록 
       
        
SELECT R.REVIEW_NUM, R.REVIEW_PRODUCTIDX, R.REVIEW_WRITER, R.REVIEW_SATISFACTION, R.REVIEW_IMAGE, R.REVIEW_CONTENTS, I.ITEM_PRICE
FROM REVIEW R
LEFT JOIN ITEM I
ON R.REVIEW_NUM = I.ITEM_NUM
WHERE R. REVIEW_WRITER = 'minmin';
-- WHERE REVIEW_WRITER = ${MEMBER_NICKNAME};

ALTER TABLE REVIEW ADD FOREIGN KEY(REVIEW_PRODUCTIDX) REFERENCES ITEM(ITEM_NUM);
ALTER TABLE REVIEW ADD FOREIGN KEY(REVIEW_WRITER) REFERENCES MEMBER(MEMBER_NICKNAME);
ALTER TABLE REVIEW ADD FOREIGN KEY(REVIEW_ID) REFERENCES ITEM(ITEM_WRITER);
select * from member;
SELECT * FROM ITEM;
SELECT * FROM review;

ALTER TABLE review
  ADD CONSTRAINT
  FOREIGN KEY (REVIEW_PRODUCTIDX)
  REFERENCES item(item_num);

CREATE TABLE BOOKING (
                  BOOKING_NUM INT PRIMARY KEY AUTO_INCREMENT COMMENT '예약 번호',
                        BOOKING_ITEMNUM INT COMMENT '상품 번호(싱품테이블)',
                        BOOKING_MEMBERNUM INT COMMENT '빌린 사람 번호(멤버테이블)',
                        BOOKING_BOOKINGSTATE VARCHAR(50) COMMENT '대여 상태',
                        BOOKING_DEPOSITSTATE VARCHAR(50) COMMENT '보증금 상태',
                        BOOKING_STARTDATE DATETIME COMMENT '대여 시작일',
                        BOOKING_ENDDATE DATETIME COMMENT '대여 종료일'
);

CREATE TABLE ADMIN (
               ADMIN_NUM INT PRIMARY KEY AUTO_INCREMENT COMMENT '신고 번호',
                    ADMIN_SINGOJA VARCHAR(50) COMMENT '신고자',
                    ADMIN_PISINGOJA VARCHAR(50) COMMENT '피신고자',
                    ADMIN_IMAGE VARCHAR(300) COMMENT '이미지',
                    ADMIN_TITLE VARCHAR(50) COMMENT '신고 제목',
                    ADMIN_CONTENTS VARCHAR(50) COMMENT '신고 내용',
                    ADMIN_REPORTSTATE VARCHAR(50) COMMENT '신고 상태'
);

CREATE TABLE CHATTING (
                  CHATTING_NUM INT PRIMARY KEY AUTO_INCREMENT COMMENT '채팅 번호',
                        CHATTING_ROOMID VARCHAR(50) COMMENT '채팅방 아이디',
                        CHATTING_FROMID VARCHAR(20) COMMENT '보내는 사람',
                        CHATTING_TOID VARCHAR(20) COMMENT '받는 사람',
                        CHATTING_MESSAGE VARCHAR(300) COMMENT '채팅 내용' 
);

SELECT * FROM REVIEW;
SELECT * FROM ITEM;
DROP TABLE REVIEW;

        