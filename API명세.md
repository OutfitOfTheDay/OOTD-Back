API명세
=

메인
-
```
GET/feed?sortN=1
```

- Request
```
{
  
}
```
- Reponse
```
SUCCESS {
  weather: {
    status: number,
    temp: number
  },
  feed:[
    {
      _id: string,
      userId: string,
      profile: string,
      content: string,
      likeN: number,
      cmtN: number,
      pictures:[
        string
      ],
      date: string,
      weather: {
        status: number,
        temp: number
      }
    }
  ]
}
```   

날씨요청
-
```
GET/weather?country={String}
```
- Request
```
{
  
}
```
- Reponse
```
SUCCESS {
  weather: {
    status: number,
    temp: number
  }
}
```   


마이페이지보기
-
```
GET/mypage
```
- Request
```
{
 
}
```
- Reponse
```
SUCCESS {
  userName: string,
	profile: string,
	sex: string
} 
```

마이페이지수정
-
```
GET/mypage
```
- Request
```
{
  userName: string,
	profile: string,
	sex: string
}
```
- Reponse
```
SUCCESS {
  
} 
```

내 피드 보기
-
```
GET/mypage/myfeed
```

- Request
```

```
- Reponse
```
SUCCESS {
  feed:[
    {
      _id: string,
      userId: string,
      profile: string,
      likeN: number,
      cmtN: number,
      content: string,
      pictures:[
        string
      ],
      date: string,
      cmtId: [
        string
      ],
      weather: {
        status: number,
        temp: number
      }
    }
  ]
}
```

태그한 피드 보기
-
```
GET/mypage/tagfeed
```

- Request
```

```
- Reponse
```
SUCCESS {
  feed:[
    {
      _id: string,
      userId: string,
      profile: string,
      likeN: number,
      cmtN: number,
      content: string,
      pictures:[
        string
      ],
      date: string,
      cmtId: [
        string
      ],
      weather: {
        status: number,
        temp: number
      }
    }
  ]
}
```

글작성
-
```
POST/post
```
- Request
```
{
  pictures:[
    string
  ],
  date: string,
  content: string,
  weather: {
    status: number,
    temp: number
  }
}
```
- Reponse
```
SUCCESS {

} 
```

댓글 작성
-
```
POST/comment
```
- Request
```
{
  comment: string
  postId: string
}
```
- Reponse
```
SUCCESS {

} 
```